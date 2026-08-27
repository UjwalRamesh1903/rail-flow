import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { mockBookings } from '../data/bookings'
import { tdrReasons } from '../data/tdr-reasons'
import { useBooking } from '../context/BookingContext'
import { useToast } from '../context/ToastContext'
import { formatDisplayDate } from '../utils/formatDate'
import { Button } from '../components/ui/Button'

export function FileTDRPage() {
  const { lastBooking } = useBooking()
  const { showToast } = useToast()
  const [bookingId, setBookingId] = useState('')
  const [reasonId, setReasonId] = useState('')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const bookings = [
    ...(lastBooking ? [lastBooking] : []),
    ...mockBookings,
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingId || !reasonId) {
      showToast('Please select booking and reason', 'error')
      return
    }
    setSubmitted(true)
    showToast('TDR filed successfully!', 'success')
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">TDR Filed Successfully</h1>
        <p className="text-gray-500 mb-4">Your TDR has been submitted. Refund will be processed after verification.</p>
        <p className="text-sm text-gray-400">TDR Reference: TDR{Date.now().toString().slice(-8)}</p>
        <Button className="mt-6" onClick={() => { setSubmitted(false); setBookingId(''); setReasonId(''); setDescription('') }}>
          File Another TDR
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">File TDR</h1>
      <p className="text-sm text-gray-500 mb-6">File a Ticket Deposit Receipt for refund due to valid reasons.</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Booking</label>
          <select
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
            required
          >
            <option value="">Select a booking</option>
            {bookings.map((b) => (
              <option key={b.id} value={b.id}>
                PNR: {b.pnr} | {b.trainNumber} | {b.from} → {b.to} | {formatDisplayDate(b.date)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reason for TDR</label>
          <select
            value={reasonId}
            onChange={(e) => setReasonId(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
            required
          >
            <option value="">Select reason</option>
            {tdrReasons.map((r) => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Provide additional details..."
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30 resize-none"
          />
        </div>

        <Button type="submit" className="w-full" size="lg">Submit TDR</Button>
      </form>
    </div>
  )
}
