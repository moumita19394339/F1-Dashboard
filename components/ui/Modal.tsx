"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-modal">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex h-full items-center justify-center p-4">
        <div
          className={cn(
            "relative w-full rounded-xl bg-white shadow-2xl animate-scale-in border border-neutral-200",
            sizeClasses[size],
          )}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5 bg-gradient-to-r from-neutral-50 to-white">
              {title && (
                <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-5">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="flex items-center justify-end gap-3 border-t border-neutral-200 px-6 py-4 bg-gradient-to-r from-white to-neutral-50">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const variantIcons = {
    danger: (
      <div className="rounded-full bg-error-100 p-2 text-error-600">⚠</div>
    ),
    warning: (
      <div className="rounded-full bg-warning-100 p-2 text-warning-600">⚠</div>
    ),
    info: <div className="rounded-full bg-info-100 p-2 text-info-600">ℹ</div>,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-4">
        {variantIcons[variant]}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
          <p className="mt-2 text-sm text-neutral-600">{description}</p>
        </div>
      </div>
    </Modal>
  );
}
