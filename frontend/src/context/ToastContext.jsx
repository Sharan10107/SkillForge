import { createContext, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ToastContext = createContext(null);

// Thin wrapper around react-hot-toast so components import one
// SkillForge-flavored hook instead of the library directly — makes it
// easy to swap styling or libraries later without touching call sites.
export function ToastProvider({ children }) {
  const api = {
    success: (msg) => toast.success(msg),
    error: (msg) => toast.error(msg),
    info: (msg) => toast(msg),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--surface)',
            color: 'var(--ink)',
            border: '1px solid var(--border)',
            fontFamily: '"IBM Plex Sans", sans-serif',
          },
        }}
      />
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
