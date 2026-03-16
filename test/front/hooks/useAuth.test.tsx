import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../../../lib/hooks/useAuth'
import { apiClient } from '../../../lib/api'
import { useCurrentUser, useLogin, useLogout } from '../../../lib/hooks/useF1Data'

jest.mock('../../../lib/api', () => ({
  apiClient: {
    isAuthenticated: jest.fn(),
    clearToken: jest.fn(),
  },
}))

jest.mock('../../../lib/hooks/useF1Data', () => ({
  useCurrentUser: jest.fn(),
  useLogin: jest.fn(),
  useLogout: jest.fn(),
}))

function TestComponent() {
  const { isAuthenticated, isLoading, user, error, login, logout } = useAuth()

  return (
    <div>
      <div>authenticated: {String(isAuthenticated)}</div>
      <div>loading: {String(isLoading)}</div>
      <div>user: {user ? user.full_name || user.email : 'null'}</div>
      <div>error: {error || 'null'}</div>
      <button
        onClick={() => {
          login('test@example.com', 'password123').catch(() => {})
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          logout().catch(() => {})
        }}
      >
        Logout
      </button>
    </div>
  )
}

describe('useAuth / AuthProvider', () => {
  const loginMutateAsyncMock = jest.fn()
  const logoutMutateAsyncMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    ;(apiClient.isAuthenticated as jest.Mock).mockReturnValue(true)

    ;(useCurrentUser as jest.Mock).mockReturnValue({
      data: { full_name: 'Shivam', email: 'shivam@example.com' },
      isLoading: false,
      error: null,
    })

    ;(useLogin as jest.Mock).mockReturnValue({
      mutateAsync: loginMutateAsyncMock,
    })

    ;(useLogout as jest.Mock).mockReturnValue({
      mutateAsync: logoutMutateAsyncMock,
    })
  })

  test('provides authenticated user state correctly', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByText('authenticated: true')).toBeInTheDocument()
    expect(screen.getByText('loading: false')).toBeInTheDocument()
    expect(screen.getByText('user: Shivam')).toBeInTheDocument()
    expect(screen.getByText('error: null')).toBeInTheDocument()
  })

  test('returns unauthenticated when no token exists', () => {
    ;(apiClient.isAuthenticated as jest.Mock).mockReturnValue(false)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByText('authenticated: false')).toBeInTheDocument()
  })

  test('returns unauthenticated when userError exists', () => {
    ;(useCurrentUser as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Unauthorized'),
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByText('authenticated: false')).toBeInTheDocument()
    expect(screen.getByText('user: null')).toBeInTheDocument()
  })

  test('shows loading state from useCurrentUser', () => {
    ;(useCurrentUser as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByText('loading: true')).toBeInTheDocument()
  })

  test('login calls login mutation successfully', async () => {
    loginMutateAsyncMock.mockResolvedValue(undefined)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    fireEvent.click(screen.getByText('Login'))

    await waitFor(() => {
      expect(loginMutateAsyncMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })

    expect(screen.getByText('error: null')).toBeInTheDocument()
  })

  test('login sets error when mutation fails', async () => {
    loginMutateAsyncMock.mockRejectedValue(new Error('Invalid credentials'))

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    fireEvent.click(screen.getByText('Login'))

    await waitFor(() => {
      expect(loginMutateAsyncMock).toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(screen.getByText('error: Invalid credentials')).toBeInTheDocument()
    })
  })

  test('logout calls logout mutation successfully', async () => {
    logoutMutateAsyncMock.mockResolvedValue(undefined)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    fireEvent.click(screen.getByText('Logout'))

    await waitFor(() => {
      expect(logoutMutateAsyncMock).toHaveBeenCalledTimes(1)
    })

    expect(apiClient.clearToken).not.toHaveBeenCalled()
  })

  test('logout clears token when logout mutation fails', async () => {
    logoutMutateAsyncMock.mockRejectedValue(new Error('Logout failed'))

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    fireEvent.click(screen.getByText('Logout'))

    await waitFor(() => {
      expect(logoutMutateAsyncMock).toHaveBeenCalledTimes(1)
      expect(apiClient.clearToken).toHaveBeenCalledTimes(1)
    })
  })

  test('useAuth throws error when used outside AuthProvider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<TestComponent />)).toThrow(
      'useAuth must be used within an AuthProvider'
    )

    consoleSpy.mockRestore()
  })
})