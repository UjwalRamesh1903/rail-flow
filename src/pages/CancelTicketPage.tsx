import { useState } from 'react'
import { AlertTriangle, CheckCircle } from 'lucide-react'
import { mockBookings } from '../data/bookings'
import { useBooking } from '../context/BookingContext'
import { useToast } from '../context/ToastContext'
import { formatDisplayDate } from '../utils/formatDate'
import { Button } from '../components/ui/Button'

export function CancelTicketPage() {
  const { cancelledBookings, cancelBooking, lastBooking } = useBooking()
  const { showToast } = useToast()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [cancelled, setCancelled] = useState(false)

  const availableBookings = [
    ...(lastBooking && !cancelledBookings.includes(lastBooking.id) ? [lastBooking] : []),
    ...mockBookings.filter((b) => !cancelledBookings.includes(b.id)),
  ]

  const selected = availableBookings.find((b) => b.id === selectedId)

  const handleCancel = () => {
    if (!selectedId) return
    cancelBooking(selectedId)
    setCancelled(true)
    showToast('Ticket cancelled successfully. Refund will be processed in 5-7 business days.', 'success')
  }

  if (cancelled && selected) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Ticket Cancelled</h1>
        <p className="text-gray-500 mb-4">
          PNR {selected.pnr} has been cancelled. Refund of ₹{Math.round(selected.fare * 0.7)} will be credited.
        </p>
        <Button onClick={() => { setCancelled(false); setSelectedId(null) }}>Cancel Another Ticket</Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Cancel Ticket</h1>
      <p className="text-sm text-gray-500 mb-6">Select a booking to cancel. Cancellation charges may apply.</p>

      {availableBookings.length === 0 ? (
        <div className="bg-white rounded-2xl border p-12 text-center text-gray-500">No active bookings to cancel.</div>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {availableBookings.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedId(b.id)}
                className={`w-full text-left bg-white rounded-2xl border-2 p-4 transition-all ${
                  selectedId === b.id ? 'border-irctc-blue bg-irctc-blue-light/20' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="font-bold">{b.trainNumber} - {b.trainName}</div>
                <div className="text-sm text-gray-500">{b.from} → {b.to} | {formatDisplayDate(b.date)}</div>
                <div className="text-sm text-gray-500">PNR: {b.pnr} | ₹{b.fare}</div>
              </button>
            ))}
          </div>

          {selected && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-4 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-orange-800">Cancellation Charges Apply</p>
                <p className="text-orange-600">Estimated refund: ₹{Math.round(selected.fare * 0.7)} (after deduction)</p>
              </div>
            </div>
          )}

          <Button onClick={handleCancel} disabled={!selectedId} className="w-full" size="lg">
            Confirm Cancellation
          </Button>
        </>
      )}
    </div>
  )
}
