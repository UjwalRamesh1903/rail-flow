import { useNavigate } from 'react-router-dom'
import { Train, Calendar, MapPin } from 'lucide-react'
import { mockBookings } from '../data/bookings'
import { useBooking } from '../context/BookingContext'
import { formatDisplayDate } from '../utils/formatDate'

export function MyBookingsPage() {
  const navigate = useNavigate()
  const { lastBooking, cancelledBookings } = useBooking()

  const allBookings = [
    ...(lastBooking ? [lastBooking] : []),
    ...mockBookings.filter((b) => !cancelledBookings.includes(b.id)),
  ]

  const uniqueBookings = allBookings.filter(
    (b, i, arr) => arr.findIndex((x) => x.pnr === b.pnr) === i
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">My Bookings</h1>

      {uniqueBookings.length === 0 ? (
        <div className="bg-[#1a2332] rounded-2xl border p-12 text-center">
          <Train className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 mb-4">No bookings found.</p>
          <button onClick={() => navigate('/')} className="text-irctc-blue font-semibold hover:underline">Book a Ticket</button>
        </div>
      ) : (
        <div className="space-y-4">
          {uniqueBookings.map((booking) => (
            <div key={booking.pnr} className="bg-[#1a2332] rounded-2xl border border-white/10 p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-100">{booking.trainNumber}</span>
                    <span className="text-sm text-gray-400">{booking.trainName}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'RAC' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>{booking.status}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {booking.from} → {booking.to}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDisplayDate(booking.date)} | PNR: {booking.pnr}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-irctc-blue">₹{booking.fare}</div>
                  <div className="text-xs text-gray-400">{booking.passengers.length} passenger(s)</div>
                  <button
                    onClick={() => navigate('/pnr-status')}
                    className="text-xs text-irctc-blue font-semibold mt-1 hover:underline"
                  >
                    Check PNR
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
