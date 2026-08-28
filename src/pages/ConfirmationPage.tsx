import { useNavigate } from 'react-router-dom'
import { CheckCircle, Home } from 'lucide-react'
import { useBooking } from '../context/useBooking'
import { formatDisplayDate } from '../utils/formatDate'
import { Button } from '../components/ui/Button'

export function ConfirmationPage() {
  const navigate = useNavigate()
  const { lastBooking, resetBooking } = useBooking()

  if (!lastBooking) {
    navigate('/')
    return null
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
      <p className="text-gray-500 mb-8">Your ticket has been booked successfully.</p>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 text-left mb-6">
        <div className="text-center mb-4 pb-4 border-b border-gray-100">
          <div className="text-xs text-gray-500 uppercase tracking-wide">PNR Number</div>
          <div className="text-3xl font-bold text-irctc-blue tracking-wider mt-1">{lastBooking.pnr}</div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-gray-500">Train:</span> <span className="font-medium">{lastBooking.trainNumber}</span></div>
          <div><span className="text-gray-500">Name:</span> <span className="font-medium">{lastBooking.trainName}</span></div>
          <div><span className="text-gray-500">From:</span> <span className="font-medium">{lastBooking.from}</span></div>
          <div><span className="text-gray-500">To:</span> <span className="font-medium">{lastBooking.to}</span></div>
          <div><span className="text-gray-500">Date:</span> <span className="font-medium">{formatDisplayDate(lastBooking.date)}</span></div>
          <div><span className="text-gray-500">Class:</span> <span className="font-medium">{lastBooking.class}</span></div>
          <div><span className="text-gray-500">Status:</span> <span className="font-medium text-green-600">{lastBooking.status}</span></div>
          <div><span className="text-gray-500">Fare:</span> <span className="font-medium">₹{lastBooking.fare}</span></div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="font-semibold text-sm mb-2">Passengers</h4>
          {lastBooking.passengers.map((p, i) => (
            <div key={i} className="text-sm text-gray-600 py-1">
              {p.name} — {p.age} yrs, {p.gender}
              {p.berth && <span className="block text-irctc-blue font-medium text-xs mt-0.5">{p.berth}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={() => { resetBooking(); navigate('/my-bookings') }}>
          View My Bookings
        </Button>
        <Button variant="outline" onClick={() => { resetBooking(); navigate('/') }}>
          <Home className="w-4 h-4 mr-1" /> Back to Home
        </Button>
      </div>
    </div>
  )
}
