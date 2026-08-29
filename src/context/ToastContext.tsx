import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface ToastDispatchContextType {
  showToast: (message: string, type?: Toast['type']) => void
  removeToast: (id: string) => void
}

const ToastStateContext = createContext<Toast[]>([])
const ToastDispatchContext = createContext<ToastDispatchContextType | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts((prev) => [...prev, { id, message, type }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3500)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const dispatch = useMemo(() => ({ showToast, removeToast }), [showToast, removeToast])

  return (
    <ToastDispatchContext.Provider value={dispatch}>
      <ToastStateContext.Provider value={toasts}>
        {children}
      </ToastStateContext.Provider>
    </ToastDispatchContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastDispatchContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export function useToasts() {
  return useContext(ToastStateContext)
}
