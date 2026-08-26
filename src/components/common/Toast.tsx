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
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp flex items-center gap-3 px-5 py-3.5 bg-slate-900/95 text-white rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur-md">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
          isSuccess
            ? 'bg-bermuda text-slate-900'
            : isError
            ? 'bg-red-500 text-white'
            : 'bg-accent-cyan text-slate-900'
        }`}
      >
        <i
          className={`fas ${
            isSuccess ? 'fa-check' : isError ? 'fa-exclamation' : 'fa-info'
          }`}
        ></i>
      </div>
      <p className="text-sm font-medium text-slate-100 pr-2">{toast.text}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Close notification"
        className="text-slate-400 hover:text-white transition-colors text-xs p-1"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};
