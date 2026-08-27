import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { formatJourneyDate } from '../utils/formatDate'
import { Button } from '../components/ui/Button'

export function ReviewPage() {
  const navigate = useNavigate()
  const { search, selectedTrain, passengers, seatAssignments, bookingExtras } = useBooking()

  if (!selectedTrain || passengers.length === 0) {
    navigate('/trains')
    return null
  }

  const insuranceFee = bookingExtras.travelInsurance ? Math.round(0.45 * passengers.length) : 0
  const baseFare = selectedTrain.selectedClass.fare * passengers.length
  const totalFare = baseFare + insuranceFee

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <button onClick={() => navigate('/seat-selection')} className="flex items-center gap-1 text-sm text-irctc-blue mb-4 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Seat Selection
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Review Booking</h1>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <h3 className="font-bold text-gray-900 mb-3">Journey Details</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-gray-500">Train:</span> <span className="font-medium">{selectedTrain.train.number} - {selectedTrain.train.name}</span></div>
          <div><span className="text-gray-500">Class:</span> <span className="font-medium">{selectedTrain.selectedClass.name}</span></div>
          <div><span className="text-gray-500">From:</span> <span className="font-medium">{search.from?.name} ({search.from?.code})</span></div>
          <div><span className="text-gray-500">To:</span> <span className="font-medium">{search.to?.name} ({search.to?.code})</span></div>
          <div><span className="text-gray-500">Date:</span> <span className="font-medium">{search.date ? formatJourneyDate(search.date) : ''}</span></div>
          <div><span className="text-gray-500">Departure:</span> <span className="font-medium">{selectedTrain.train.departure}</span></div>
          <div><span className="text-gray-500">Boarding:</span> <span className="font-medium">{bookingExtras.boardingStation}</span></div>
          <div><span className="text-gray-500">Reservation Up To:</span> <span className="font-medium">{bookingExtras.reservationUpto}</span></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <h3 className="font-bold text-gray-900 mb-3">Passengers &amp; Berths</h3>
        {passengers.map((p, i) => {
          const seat = seatAssignments.find((s) => s.passengerIndex === i)
          return (
            <div key={i} className="flex justify-between text-sm py-2.5 border-b border-gray-50 last:border-0">
              <div>
                <span className="font-medium">{p.name}</span>
                <span className="text-gray-500"> ({p.age}, {p.gender})</span>
                {seat && (
                  <div className="text-xs text-irctc-blue font-semibold mt-0.5">
                    Coach {seat.coachLabel} — Berth {seat.berthNumber} ({seat.berthType})
                  </div>
                )}
              </div>
              <span className="font-medium shrink-0">₹{selectedTrain.selectedClass.fare}</span>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4 text-sm space-y-2">
        <div className="flex justify-between"><span className="text-gray-500">Contact Email</span><span>{bookingExtras.email}</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Mobile</span><span>{bookingExtras.mobile}</span></div>
        <div className="flex justify-between"><span className="text-gray-500">ID Proof</span><span>{bookingExtras.idProofType}</span></div>
        {bookingExtras.travelInsurance && <div className="flex justify-between"><span className="text-gray-500">Travel Insurance</span><span>₹{insuranceFee}</span></div>}
        {bookingExtras.autoUpgrade && <div className="text-green-600 text-xs">Auto upgradation opted</div>}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">Total Fare</span>
          <span className="font-bold text-2xl text-irctc-blue">₹{totalFare}</span>
        </div>
      </div>

      <Button size="lg" className="w-full" onClick={() => navigate('/payment')}>
        Proceed to Payment
      </Button>
    </div>
  )
}
