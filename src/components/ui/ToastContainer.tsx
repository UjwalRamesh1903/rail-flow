import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { useToast } from '../../context/useToast'
import { cn } from '../../utils/cn'

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg animate-slide-down min-w-[280px] max-w-[400px]',
            toast.type === 'success' && 'bg-green-50 border border-green-200 text-green-800',
            toast.type === 'error' && 'bg-red-50 border border-red-200 text-red-800',
            toast.type === 'info' && 'bg-blue-50 border border-blue-200 text-blue-800',
          )}
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 shrink-0" />}
          {toast.type === 'error' && <XCircle className="w-5 h-5 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 shrink-0" />}
          <span className="text-sm font-medium flex-1">{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="shrink-0 hover:opacity-70">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
