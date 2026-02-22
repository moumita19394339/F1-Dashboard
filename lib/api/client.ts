/**
 * API Client with Axios and JWT handling
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import type { ApiError } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'
const TOKEN_COOKIE_NAME = 'auth_token'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    // Debug logging
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log('[API] Initializing with URL:', API_URL)
    }

    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      paramsSerializer: {
        serialize: (params) => {
          // Manually serialize params to handle arrays properly for FastAPI
          const searchParams = new URLSearchParams()
          Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              // For arrays, add each value separately with the same key
              value.forEach((item) => {
                searchParams.append(key, String(item))
              })
            } else if (value !== undefined && value !== null) {
              searchParams.append(key, String(value))
            }
          })
          return searchParams.toString()
        }
      }
    })

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get(TOKEN_COOKIE_NAME)
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error: AxiosError) => Promise.reject(error)
    )

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<Record<string, unknown>>) => {
        // Debug logging
        if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
          console.error('[API] Error:', error.message, error.response?.data)
        }

        let errorMessage = 'An error occurred'

        // Try to extract error message from response
        if (error.response?.data) {
          const data = error.response.data as { detail?: string; message?: string }
          errorMessage = data.detail || data.message || error.message || errorMessage
        } else if (error.message) {
          errorMessage = error.message
        }

        // Network error handling
        if (error.code === 'ERR_NETWORK' || !error.response) {
          errorMessage = 'Network error: Unable to connect to the server. Please check if the backend is running.'
        }

        const apiError: ApiError = {
          message: errorMessage,
          status: error.response?.status,
        }

        // Handle 401 Unauthorized - redirect to login
        if (error.response?.status === 401 && typeof window !== 'undefined') {
          Cookies.remove(TOKEN_COOKIE_NAME)
          // Don't redirect if already on login page
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login'
          }
        }

        return Promise.reject(apiError)
      }
    )
  }

  /**
   * Set authentication token
   */
  setToken(token: string): void {
    Cookies.set(TOKEN_COOKIE_NAME, token, {
      expires: 1, // 1 day
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
  }

  /**
   * Get authentication token
   */
  getToken(): string | undefined {
    return Cookies.get(TOKEN_COOKIE_NAME)
  }

  /**
   * Clear authentication token
   */
  clearToken(): void {
    Cookies.remove(TOKEN_COOKIE_NAME)
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  /**
   * GET request
   */
  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response = await this.client.get<T>(url, { params })
    return response.data
  }

  /**
   * POST request
   */
  async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.post<T>(url, data)
    return response.data
  }

  /**
   * PUT request
   */
  async put<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.put<T>(url, data)
    return response.data
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url)
    return response.data
  }

  /**
   * POST form data (for login)
   * Converts FormData to URL-encoded string for OAuth2 compatibility
   */
  async postForm<T>(url: string, data: FormData | Record<string, string>): Promise<T> {
    // Convert FormData or object to URL-encoded string
    const params = new URLSearchParams()
    if (data instanceof FormData) {
      Array.from(data.entries()).forEach(([key, value]) => {
        params.append(key, value.toString())
      })
    } else {
      for (const [key, value] of Object.entries(data)) {
        params.append(key, value)
      }
    }

    // Debug logging
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log('[API] POST Form:', url, params.toString())
    }

    const response = await this.client.post<T>(url, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  }
}

// Export singleton instance
export const apiClient = new ApiClient()
