/**
 * Delete Confirmation Modal Component
 *
 * A reusable modal for confirming delete actions.
 */

'use client'

import { AlertTriangle } from 'lucide-react'

interface DeleteConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  itemName?: string
  onConfirm: () => void
  onCancel: () => void
  isDeleting?: boolean
}

export function DeleteConfirmModal({
  isOpen,
  title,
  message,
  itemName,
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-f1-dark border border-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-start gap-4 p-6 border-b border-gray-800">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-sm text-gray-400 mt-1">{message}</p>
            {itemName && (
              <p className="text-lg font-semibold text-white mt-3">
                "{itemName}"
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-800">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="
              px-4 py-2 text-sm font-medium text-gray-300
              border border-gray-700 rounded-lg
              hover:bg-gray-800 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="
              px-4 py-2 text-sm font-medium text-white
              bg-red-600 rounded-lg
              hover:bg-red-700 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
