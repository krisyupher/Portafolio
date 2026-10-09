import React from 'react';
import { ToastMessage } from '../../types';

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';

  return (
    <div
      className="fixed bottom-6 right-6 z-50 animate-slideUp flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-2xl"
      style={{
        background: isSuccess
          ? 'rgba(0, 196, 151, 0.95)'
          : isError
            ? 'rgba(239, 68, 68, 0.95)'
            : 'rgba(3, 67, 120, 0.95)',
        borderColor: isSuccess
          ? 'rgba(0, 196, 151, 0.3)'
          : isError
            ? 'rgba(239, 68, 68, 0.3)'
            : 'rgba(3, 67, 120, 0.3)',
        color: isSuccess || isError ? 'var(--color-ink)' : 'white',
      }}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
        style={{
          background: isSuccess ? 'var(--color-ink)' : 'white',
          color: isSuccess
            ? 'var(--color-accent)'
            : isError
              ? 'var(--color-ink)'
              : 'var(--color-brand)',
        }}
      >
        <i className={`fas ${isSuccess ? 'fa-check' : isError ? 'fa-exclamation' : 'fa-info'}`}></i>
      </div>
      <p className="text-sm font-medium pr-2">{toast.text}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Close notification"
        className="text-sm font-bold p-1 transition-opacity hover:opacity-70"
        style={{ color: isSuccess || isError ? 'var(--color-ink)' : 'white' }}
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};
