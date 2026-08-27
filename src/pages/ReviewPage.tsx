import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { formatJourneyDate } from '../utils/formatDate'
import { Button } from '../components/ui/Button'

export function ReviewPage() {
  const navigate = useNavigate()
  const { search, selectedTrain, passengers } = useBooking()

  if (!selectedTrain || passengers.length === 0) {
    navigate('/trains')
    return null
  }

  const totalFare = selectedTrain.selectedClass.fare * passengers.length

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={() => navigate('/passenger-details')} className="flex items-center gap-1 text-sm text-irctc-blue mb-4 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back
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
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <h3 className="font-bold text-gray-900 mb-3">Passengers</h3>
        {passengers.map((p, i) => (
          <div key={i} className="flex justify-between text-sm py-2 border-b border-gray-50 last:border-0">
            <span>{p.name} ({p.age}, {p.gender})</span>
            <span className="font-medium">₹{selectedTrain.selectedClass.fare}</span>
          </div>
        ))}
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
