import { useState, useEffect } from 'react'
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval,
  isSameMonth, isSameDay, isBefore, startOfDay, addMonths, subMonths,
  getDay, isToday,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../utils/cn'

interface DatePickerProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date | null
  onSelect: (date: Date) => void
}

export function DatePicker({ isOpen, onClose, selectedDate, onSelect }: DatePickerProps) {
  const [viewDate, setViewDate] = useState(selectedDate || new Date())
  const today = startOfDay(new Date())
  const { t } = useLanguage()

  useEffect(() => {
    if (isOpen && selectedDate) setViewDate(selectedDate)
  }, [isOpen, selectedDate])

  const monthStart = startOfMonth(viewDate)
  const monthEnd = endOfMonth(viewDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startDay = getDay(monthStart)

  const handleSelect = (day: Date) => {
    if (isBefore(day, today)) return
    onSelect(day)
    onClose()
  }

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('search.dateTitle')} size="sm">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setViewDate(subMonths(viewDate, 1))}
            className="p-2 rounded-lg hover:bg-white/10 text-gray-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold text-gray-100">{format(viewDate, 'MMMM yyyy')}</span>
          <button
            onClick={() => setViewDate(addMonths(viewDate, 1))}
            className="p-2 rounded-lg hover:bg-white/10 text-gray-300 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((d) => (
            <div key={d} className="text-center text-xs font-medium text-gray-400 py-2">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {days.map((day) => {
            const isPast = isBefore(day, today)
            const isSelected = selectedDate && isSameDay(day, selectedDate)
            const isCurrentMonth = isSameMonth(day, viewDate)

            return (
              <button
                key={day.toISOString()}
                onClick={() => handleSelect(day)}
                disabled={isPast}
                className={cn(
                  'w-full aspect-square flex items-center justify-center text-sm rounded-lg transition-all',
                  isPast && 'text-gray-600 cursor-not-allowed',
                  !isPast && !isSelected && 'hover:bg-irctc-blue-light/30 text-gray-200',
                  isSelected && 'bg-irctc-blue text-white font-semibold',
                  isToday(day) && !isSelected && 'ring-2 ring-irctc-blue/30 font-semibold text-gray-100',
                  !isCurrentMonth && 'text-gray-600',
                )}
              >
                {format(day, 'd')}
              </button>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}
