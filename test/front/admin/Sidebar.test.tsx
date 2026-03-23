import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Sidebar } from '../../../components/admin/Sidebar'
import { useAuth } from '../../../lib/hooks/useAuth'
import { usePathname, useRouter } from 'next/navigation'

jest.mock('../../../lib/hooks/useAuth')
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}))
jest.mock('next/link', () => {
  return ({ children, href, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  )
})

describe('Sidebar', () => {
  const pushMock = jest.fn()
  const logoutMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    ;(useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    })

    ;(usePathname as jest.Mock).mockReturnValue('/admin')

    ;(useAuth as jest.Mock).mockReturnValue({
      user: {
        full_name: 'Shivam',
        email: 'shivam@example.com',
      },
      logout: logoutMock,
    })
  })

  test('renders sidebar title', () => {
    render(<Sidebar />)
    expect(screen.getByText('F1 Admin')).toBeInTheDocument()
  })

  test('renders user full name and email', () => {
    render(<Sidebar />)
    expect(screen.getByText('Shivam')).toBeInTheDocument()
    expect(screen.getByText('shivam@example.com')).toBeInTheDocument()
  })

  test('renders all navigation links', () => {
    render(<Sidebar />)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Seasons')).toBeInTheDocument()
    expect(screen.getByText('Teams')).toBeInTheDocument()
    expect(screen.getByText('Drivers')).toBeInTheDocument()
    expect(screen.getByText('All Drivers')).toBeInTheDocument()
    expect(screen.getByText('History')).toBeInTheDocument()
  })

  test('highlights active route', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/admin/teams')

    render(<Sidebar />)

    const activeLink = screen.getByText('Teams').closest('a')
    expect(activeLink).toHaveClass('bg-f1-red')
    expect(activeLink).toHaveClass('text-white')
  })

  test('shows fallback Admin when full_name and email are missing', () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      user: {},
      logout: logoutMock,
    })

    render(<Sidebar />)

    expect(screen.getByText('Admin')).toBeInTheDocument()
  })

  test('calls logout and redirects to login', async () => {
    logoutMock.mockResolvedValue(undefined)

    render(<Sidebar />)

    fireEvent.click(screen.getByRole('button', { name: 'Logout' }))

    await waitFor(() => {
      expect(logoutMock).toHaveBeenCalledTimes(1)
      expect(pushMock).toHaveBeenCalledWith('/login')
    })
  })

  test('shows logging out state while logout is in progress', async () => {
    logoutMock.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 50))
    )

    render(<Sidebar />)

    fireEvent.click(screen.getByRole('button', { name: 'Logout' }))

    expect(
      screen.getByRole('button', { name: 'Logging out...' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Logging out...' })
    ).toBeDisabled()

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/login')
    })
  })

  test('handles logout failure and resets button state', async () => {
    logoutMock.mockRejectedValue(new Error('Logout failed'))

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    render(<Sidebar />)

    fireEvent.click(screen.getByRole('button', { name: 'Logout' }))

    await waitFor(() => {
      expect(logoutMock).toHaveBeenCalledTimes(1)
      expect(consoleSpy).toHaveBeenCalled()
    })

    expect(pushMock).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument()

    consoleSpy.mockRestore()
  })
})