import { render, screen, waitFor } from '@testing-library/react'
import { ProtectedRoute } from '../../../components/admin/ProtectedRoute'
import { useAuth } from '../../../lib/hooks/useAuth'
import { useRouter } from 'next/navigation'

jest.mock('../../../lib/hooks/useAuth')
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('ProtectedRoute', () => {
  const pushMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    })
  })

  test('shows loading spinner when auth is loading', () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
    })

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  test('renders children when user is authenticated', () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    })

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
    expect(pushMock).not.toHaveBeenCalled()
  })

  test('returns null when user is not authenticated', () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    })

    const { container } = render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    expect(container).toBeEmptyDOMElement()
  })

  test('redirects to login when user is not authenticated and not loading', async () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    })

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/login')
    })
  })

  test('does not redirect when user is authenticated', async () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    })

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    await waitFor(() => {
      expect(pushMock).not.toHaveBeenCalled()
    })
  })

  test('does not redirect while loading', async () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
    })

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    await waitFor(() => {
      expect(pushMock).not.toHaveBeenCalled()
    })
  })
})