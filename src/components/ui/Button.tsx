import { cn } from '../../utils/cn'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-irctc-blue/30 disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary' && 'bg-irctc-blue text-white hover:bg-irctc-blue-dark active:scale-[0.98]',
        variant === 'secondary' && 'bg-irctc-blue-light/40 text-irctc-blue hover:bg-irctc-blue-light/60',
        variant === 'outline' && 'border-2 border-irctc-blue text-irctc-blue hover:bg-irctc-blue-light/30',
        variant === 'ghost' && 'text-gray-400 hover:bg-white/10 hover:text-gray-200',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-5 py-2.5 text-sm',
        size === 'lg' && 'px-6 py-3 text-base',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
