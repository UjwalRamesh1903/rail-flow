import { format } from 'date-fns'

export function formatJourneyDate(date: Date): string {
  return format(date, 'dd MMM, yyyy')
}

export function formatDayName(date: Date): string {
  return format(date, 'EEEE')
}

export function formatDisplayDate(date: string): string {
  return format(new Date(date), 'dd MMM yyyy')
}

export function generatePNR(): string {
  const digits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
  return digits
}
