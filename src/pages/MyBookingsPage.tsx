import { useNavigate } from 'react-router-dom'
import { Train, Calendar, MapPin } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useBooking } from '../context/BookingContext'
import { RequireAuth } from '../components/auth/RequireAuth'
import { formatDisplayDate } from '../utils/formatDate'

function MyBookingsContent() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { getUserBookings } = useBooking()

  const bookings = user ? getUserBookings(user.email) : []

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-2">My Bookings</h1>
      <p className="text-sm text-gray-400 mb-6">Bookings for {user?.name}</p>

      {bookings.length === 0 ? (
        <div className="bg-[#1a2332] rounded-2xl border border-white/10 p-12 text-center">
          <Train className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 mb-4">No bookings found for your account.</p>
          <button onClick={() => navigate('/')} className="text-irctc-blue font-semibold hover:underline">Book a Ticket</button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-[#1a2332] rounded-2xl border border-white/10 p-5 hover:border-white/20 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-gray-100">{booking.trainNumber}</span>
                    <span className="text-sm text-gray-400">{booking.trainName}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      booking.status === 'Confirmed' ? 'bg-green-900/50 text-green-400' :
                      booking.status === 'RAC' ? 'bg-yellow-900/50 text-yellow-400' :
                      'bg-orange-900/50 text-orange-400'
                    }`}>{booking.status}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {booking.from} → {booking.to}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1 flex-wrap">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDisplayDate(booking.date)} | PNR: <span className="font-mono text-gray-300">{booking.pnr}</span>
                    {booking.paymentId && <> | Payment ID: <span className="font-mono text-gray-300">{booking.paymentId}</span></>}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Booking ID: {booking.id}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-irctc-blue">₹{booking.fare}</div>
                  <div className="text-xs text-gray-400">{booking.passengers.length} passenger(s)</div>
                  <button
                    onClick={() => navigate('/track-train')}
                    className="text-xs text-irctc-blue font-semibold mt-1 hover:underline"
                  >
                    Track Train
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

export function MyBookingsPage() {
  return (
    <RequireAuth title="Login to View Bookings">
      <MyBookingsContent />
    </RequireAuth>
  )
}
