import { render, screen, fireEvent } from '@testing-library/react'
import { DeleteConfirmModal } from '../../../components/admin/DeleteConfirmModal'

describe('DeleteConfirmModal', () => {
  const defaultProps = {
    isOpen: true,
    title: 'Delete Driver',
    message: 'Are you sure you want to delete this item?',
    itemName: 'Lewis Hamilton',
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders modal content when isOpen is true', () => {
    render(<DeleteConfirmModal {...defaultProps} />)

    expect(screen.getByText('Delete Driver')).toBeInTheDocument()
    expect(
      screen.getByText('Are you sure you want to delete this item?')
    ).toBeInTheDocument()
    expect(screen.getByText('"Lewis Hamilton"')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })

  test('does not render modal when isOpen is false', () => {
    render(<DeleteConfirmModal {...defaultProps} isOpen={false} />)

    expect(screen.queryByText('Delete Driver')).not.toBeInTheDocument()
    expect(
      screen.queryByText('Are you sure you want to delete this item?')
    ).not.toBeInTheDocument()
  })

  test('calls onCancel when cancel button is clicked', () => {
    render(<DeleteConfirmModal {...defaultProps} />)

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1)
  })

  test('calls onConfirm when delete button is clicked', () => {
    render(<DeleteConfirmModal {...defaultProps} />)

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1)
  })

  test('calls onCancel when backdrop is clicked', () => {
    const { container } = render(<DeleteConfirmModal {...defaultProps} />)

    const backdrop = container.querySelector('.absolute.inset-0')
    expect(backdrop).toBeInTheDocument()

    if (backdrop) {
      fireEvent.click(backdrop)
    }

    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1)
  })

  test('shows deleting state correctly', () => {
    render(<DeleteConfirmModal {...defaultProps} isDeleting={true} />)

    expect(
      screen.getByRole('button', { name: 'Deleting...' })
    ).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Deleting...' })).toBeDisabled()
  })

  test('does not show item name when itemName is not provided', () => {
    render(<DeleteConfirmModal {...defaultProps} itemName={undefined} />)

    expect(screen.queryByText('"Lewis Hamilton"')).not.toBeInTheDocument()
  })

  test('shows Delete button text when not deleting', () => {
    render(<DeleteConfirmModal {...defaultProps} isDeleting={false} />)

    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })
})