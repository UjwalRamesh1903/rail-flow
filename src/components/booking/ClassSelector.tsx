import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { travelClasses } from '../../data/classes'
import { cn } from '../../utils/cn'

interface ClassSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function ClassSelector({ value, onChange }: ClassSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const selected = travelClasses.find((c) => c.code === value) || travelClasses[0]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-left w-full group"
      >
        <span className="font-semibold text-gray-900 text-sm group-hover:text-irctc-blue transition-colors">
          {selected.name}
        </span>
        <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', isOpen && 'rotate-180')} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 animate-slide-down">
          {travelClasses.map((cls) => (
            <button
              key={cls.code}
              onClick={() => { onChange(cls.code); setIsOpen(false) }}
              className={cn(
                'w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-irctc-blue-light/50 transition-colors',
                value === cls.code && 'bg-irctc-blue-light text-irctc-blue font-medium'
              )}
            >
              {cls.name}
              {value === cls.code && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
