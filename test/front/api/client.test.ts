const requestUseMock = jest.fn()
const responseUseMock = jest.fn()

const getMock = jest.fn()
const postMock = jest.fn()
const putMock = jest.fn()
const deleteMock = jest.fn()

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: jest.fn(() => ({
      interceptors: {
        request: { use: requestUseMock },
        response: { use: responseUseMock },
      },
      get: getMock,
      post: postMock,
      put: putMock,
      delete: deleteMock,
    })),
  },
}))

jest.mock('js-cookie', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  },
}))

describe('apiClient', () => {
  let apiClient: any
  let axiosMock: any
  let CookiesMock: any
  let requestSuccessHandler: any
  let requestErrorHandler: any
  let responseSuccessHandler: any
  let responseErrorHandler: any

  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()

    axiosMock = require('axios').default
    CookiesMock = require('js-cookie').default
    apiClient = require('../../../lib/api/client').apiClient

    requestSuccessHandler = requestUseMock.mock.calls[0][0]
    requestErrorHandler = requestUseMock.mock.calls[0][1]
    responseSuccessHandler = responseUseMock.mock.calls[0][0]
    responseErrorHandler = responseUseMock.mock.calls[0][1]
  })

  test('creates axios client with default config', () => {
    expect(axiosMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: expect.any(String),
        headers: {
          'Content-Type': 'application/json',
        },
        paramsSerializer: expect.any(Object),
      })
    )
  })

  test('serializes query params correctly including arrays', () => {
    const configArg = axiosMock.create.mock.calls[0][0]
    const serializer = configArg.paramsSerializer.serialize

    const result = serializer({
      season: 2024,
      driver_ids: [1, 2, 3],
      team: 'Ferrari',
      empty: undefined,
      none: null,
    })

    expect(result).toBe('season=2024&driver_ids=1&driver_ids=2&driver_ids=3&team=Ferrari')
  })

  test('request interceptor adds authorization header when token exists', () => {
    CookiesMock.get.mockReturnValue('abc123')

    const config = {
      headers: {},
    }

    const result = requestSuccessHandler(config)

    expect(CookiesMock.get).toHaveBeenCalledWith('auth_token')
    expect(result.headers.Authorization).toBe('Bearer abc123')
  })

  test('request interceptor does not add authorization header when token is missing', () => {
    CookiesMock.get.mockReturnValue(undefined)

    const config = {
      headers: {},
    }

    const result = requestSuccessHandler(config)

    expect(result.headers.Authorization).toBeUndefined()

  })
  //edge case scenario testing. 
  test('request interceptor returns config unchanged when headers are missing', () => {
    CookiesMock.get.mockReturnValue('abc123')

    const config = {}

    const result = requestSuccessHandler(config)

    expect(result).toEqual({})
  })

  test('request error interceptor rejects the error', async () => {
    const error = new Error('Request failed')

    await expect(requestErrorHandler(error)).rejects.toThrow('Request failed')
  })

  test('response success interceptor returns response unchanged', () => {
    const response = { data: { ok: true } }

    expect(responseSuccessHandler(response)).toEqual(response)
  })

  test('response error interceptor uses detail message from response', async () => {
    const error = {
      response: {
        status: 400,
        data: {
          detail: 'Detailed error message',
        },
      },
      message: 'Fallback message',
    }

    await expect(responseErrorHandler(error)).rejects.toEqual({
      message: 'Detailed error message',
      status: 400,
    })
  })

  test('response error interceptor uses message field from response', async () => {
    const error = {
      response: {
        status: 400,
        data: {
          message: 'Message from API',
        },
      },
      message: 'Fallback message',
    }

    await expect(responseErrorHandler(error)).rejects.toEqual({
      message: 'Message from API',
      status: 400,
    })
  })

  test('response error interceptor falls back to error.message when response data is empty object', async () => {
    const error = {
      response: {
        status: 500,
        data: {},
      },
      message: 'Server exploded',
    }

    await expect(responseErrorHandler(error)).rejects.toEqual({
      message: 'Server exploded',
      status: 500,
    })
  })

  test('response error interceptor uses error.message when response has no data', async () => {
    const error = {
      response: {
        status: 500,
      },
      message: 'Plain fallback error',
      code: 'CUSTOM_ERROR',
    }

    await expect(responseErrorHandler(error)).rejects.toEqual({
      message: 'Plain fallback error',
      status: 500,
    })
  })

  test('response error interceptor handles network errors', async () => {
    const error = {
      code: 'ERR_NETWORK',
      response: undefined,
      message: 'Network Error',
    }

    await expect(responseErrorHandler(error)).rejects.toEqual({
      message:
        'Network error: Unable to connect to the server. Please check if the backend is running.',
      status: undefined,
    })
  })

  test('response error interceptor handles missing response as network error', async () => {
    const error = {
      response: undefined,
      message: 'Something failed',
    }

    await expect(responseErrorHandler(error)).rejects.toEqual({
      message:
        'Network error: Unable to connect to the server. Please check if the backend is running.',
      status: undefined,
    })
  })

  test('401 error removes token when unauthorized', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    window.history.pushState({}, '', '/admin')

    const error = {
      response: {
        status: 401,
        data: {
          detail: 'Unauthorized',
        },
      },
      message: 'Unauthorized',
    }

    await expect(responseErrorHandler(error)).rejects.toEqual({
      message: 'Unauthorized',
      status: 401,
    })

    expect(CookiesMock.remove).toHaveBeenCalledWith('auth_token')

    consoleErrorSpy.mockRestore()
  })

  test('401 error removes token when already on login page', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    window.history.pushState({}, '', '/login')

    const error = {
      response: {
        status: 401,
        data: {
          detail: 'Unauthorized',
        },
      },
      message: 'Unauthorized',
    }

    await expect(responseErrorHandler(error)).rejects.toEqual({
      message: 'Unauthorized',
      status: 401,
    })

    expect(CookiesMock.remove).toHaveBeenCalledWith('auth_token')

    consoleErrorSpy.mockRestore()
  })

  test('setToken stores auth token in cookies', () => {
    apiClient.setToken('abc123')

    expect(CookiesMock.set).toHaveBeenCalledWith(
      'auth_token',
      'abc123',
      expect.objectContaining({
        expires: 1,
        sameSite: 'strict',
      })
    )
  })

  test('getToken returns token from cookies', () => {
    CookiesMock.get.mockReturnValue('my-token')

    const token = apiClient.getToken()

    expect(CookiesMock.get).toHaveBeenCalledWith('auth_token')
    expect(token).toBe('my-token')
  })

  test('clearToken removes token cookie', () => {
    apiClient.clearToken()

    expect(CookiesMock.remove).toHaveBeenCalledWith('auth_token')
  })

  test('isAuthenticated returns true when token exists', () => {
    CookiesMock.get.mockReturnValue('token123')

    expect(apiClient.isAuthenticated()).toBe(true)
  })

  test('isAuthenticated returns false when token does not exist', () => {
    CookiesMock.get.mockReturnValue(undefined)

    expect(apiClient.isAuthenticated()).toBe(false)
  })

  test('get returns response data', async () => {
    getMock.mockResolvedValue({ data: { name: 'Lewis' } })

    const result = await apiClient.get('/drivers')

    expect(getMock).toHaveBeenCalledWith('/drivers', { params: undefined })
    expect(result).toEqual({ name: 'Lewis' })
  })

  test('post returns response data', async () => {
    postMock.mockResolvedValue({ data: { success: true } })

    const result = await apiClient.post('/drivers', { name: 'Max' })

    expect(postMock).toHaveBeenCalledWith('/drivers', { name: 'Max' })
    expect(result).toEqual({ success: true })
  })

  test('put returns response data', async () => {
    putMock.mockResolvedValue({ data: { updated: true } })

    const result = await apiClient.put('/drivers/1', { name: 'Charles' })

    expect(putMock).toHaveBeenCalledWith('/drivers/1', { name: 'Charles' })
    expect(result).toEqual({ updated: true })
  })

  test('delete returns response data', async () => {
    deleteMock.mockResolvedValue({ data: { deleted: true } })

    const result = await apiClient.delete('/drivers/1')

    expect(deleteMock).toHaveBeenCalledWith('/drivers/1')
    expect(result).toEqual({ deleted: true })
  })

  test('postForm sends form-urlencoded data from plain object', async () => {
    postMock.mockResolvedValue({ data: { ok: true } })

    const result = await apiClient.postForm('/login', {
      username: 'admin',
      password: 'secret',
    })

    expect(postMock).toHaveBeenCalledWith(
      '/login',
      'username=admin&password=secret',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    expect(result).toEqual({ ok: true })
  })

  test('postForm sends form-urlencoded data from FormData', async () => {
    postMock.mockResolvedValue({ data: { ok: true } })

    const formData = new FormData()
    formData.append('username', 'admin')
    formData.append('password', 'secret')

    const result = await apiClient.postForm('/login', formData)

    expect(postMock).toHaveBeenCalledWith(
      '/login',
      'username=admin&password=secret',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    expect(result).toEqual({ ok: true })
  })

  test('logs initialization message in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    jest.resetModules()
    require('../../../lib/api/client')

    expect(consoleLogSpy).toHaveBeenCalledWith(
      '[API] Initializing with URL:',
      expect.any(String)
    )

    consoleLogSpy.mockRestore()
    process.env.NODE_ENV = originalEnv
  })

  test('logs response error in development mode', async () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    jest.resetModules()
    require('../../../lib/api/client')

    const latestResponseErrorHandler =
      responseUseMock.mock.calls[responseUseMock.mock.calls.length - 1][1]

    const error = {
      response: {
        status: 400,
        data: {
          detail: 'Detailed error message',
        },
      },
      message: 'Fallback message',
    }

    await expect(latestResponseErrorHandler(error)).rejects.toEqual({
      message: 'Detailed error message',
      status: 400,
    })

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '[API] Error:',
      'Fallback message',
      { detail: 'Detailed error message' }
    )

    consoleErrorSpy.mockRestore()
    process.env.NODE_ENV = originalEnv
  })

  test('postForm logs debug message in development mode', async () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    postMock.mockResolvedValue({ data: { ok: true } })

    jest.resetModules()
    const devApiClient = require('../../../lib/api/client').apiClient

    await devApiClient.postForm('/login', {
      username: 'admin',
      password: 'secret',
    })

    expect(consoleLogSpy).toHaveBeenCalledWith(
      '[API] POST Form:',
      '/login',
      'username=admin&password=secret'
    )

    consoleLogSpy.mockRestore()
    process.env.NODE_ENV = originalEnv
  })

  test('registers request and response interceptors', () => {
    expect(requestUseMock).toHaveBeenCalledTimes(1)
    expect(responseUseMock).toHaveBeenCalledTimes(1)
  })
})