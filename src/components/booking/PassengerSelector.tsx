import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Minus, Plus } from 'lucide-react'
import { cn } from '../../utils/cn'

interface PassengerSelectorProps {
  adults: number
  childrenCount: number
  onChange: (adults: number, childrenCount: number) => void
}

export function PassengerSelector({ adults, childrenCount, onChange }: PassengerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const total = adults + childrenCount
  const label = total === 1 ? '1 Passenger' : `${total} Passengers`

  const updateAdults = (delta: number) => {
    const newAdults = adults + delta
    if (newAdults < 1) return
    if (newAdults + childrenCount < 1) return
    if (newAdults + childrenCount > 6) return
    onChange(newAdults, childrenCount)
  }

  const updateChildren = (delta: number) => {
    const newChildren = childrenCount + delta
    if (newChildren < 0) return
    if (adults + newChildren < 1) return
    if (adults + newChildren > 6) return
    onChange(adults, newChildren)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-left w-full group"
      >
        <span className="font-semibold text-gray-900 text-sm group-hover:text-irctc-blue transition-colors">
          {label}
        </span>
        <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', isOpen && 'rotate-180')} />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-[60] animate-slide-down">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-medium text-sm text-gray-900">Adults</div>
              <div className="text-xs text-gray-500">12+ years</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateAdults(-1)}
                disabled={adults <= 1}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center font-semibold">{adults}</span>
              <button
                onClick={() => updateAdults(1)}
                disabled={total >= 6}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm text-gray-900">Children</div>
              <div className="text-xs text-gray-500">5-11 years</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateChildren(-1)}
                disabled={childrenCount <= 0}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center font-semibold">{childrenCount}</span>
              <button
                onClick={() => updateChildren(1)}
                disabled={total >= 6}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full mt-4 py-2 bg-irctc-blue text-white text-sm font-semibold rounded-lg hover:bg-irctc-blue-dark transition-colors"
          >
            Done
          </button>
        </div>
      )}
    </div>
  )
}
