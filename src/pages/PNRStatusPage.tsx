import { useState } from 'react'
import { Search, Train, User, MapPin, Calendar } from 'lucide-react'
import { getBookingByPNR } from '../data/bookings'
import { useBooking } from '../context/BookingContext'
import { formatDisplayDate } from '../utils/formatDate'
import { Button } from '../components/ui/Button'
import type { Booking } from '../types'

export function PNRStatusPage() {
  const [pnr, setPnr] = useState('')
  const [result, setResult] = useState<Booking | null>(null)
  const [searched, setSearched] = useState(false)
  const { lastBooking } = useBooking()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearched(true)
    const booking = getBookingByPNR(pnr.trim())
    if (!booking && lastBooking?.pnr === pnr.trim()) {
      setResult(lastBooking)
    } else {
      setResult(booking || null)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-2">PNR Status Enquiry</h1>
      <p className="text-sm text-gray-400 mb-6">Enter your 10-digit PNR number to check booking status.</p>

      <form onSubmit={handleSearch} className="bg-[#1a2332] rounded-2xl border border-white/10 p-5 mb-6">
        <div className="flex gap-3">
          <input
            value={pnr}
            onChange={(e) => setPnr(e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="Enter 10-digit PNR"
            className="flex-1 px-4 py-3 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
            maxLength={10}
          />
          <Button type="submit" disabled={pnr.length !== 10}>
            <Search className="w-4 h-4 mr-1" /> Check
          </Button>
        </div>
        <p className="text-xs text-gray-400 mt-2">Try: 4521879630, 8745213690, or 9632587410</p>
      </form>

      {searched && !result && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-700 font-medium">No booking found for PNR: {pnr}</p>
          <p className="text-sm text-red-500 mt-1">Please check the PNR number and try again.</p>
        </div>
      )}

      {result && (
        <div className="bg-[#1a2332] rounded-2xl border border-white/10 overflow-hidden animate-slide-up">
          <div className="bg-irctc-blue text-white p-4 text-center">
            <div className="text-xs uppercase tracking-wide opacity-80">PNR Status</div>
            <div className="text-2xl font-bold tracking-wider">{result.pnr}</div>
            <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
              result.status === 'Confirmed' ? 'bg-green-500' :
              result.status === 'RAC' ? 'bg-yellow-500' : 'bg-orange-500'
            }`}>
              {result.status}
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              <Train className="w-5 h-5 text-irctc-blue" />
              <div>
                <div className="font-bold">{result.trainNumber} - {result.trainName}</div>
                <div className="text-sm text-gray-400">{result.class}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-irctc-blue" />
              <div className="text-sm">
                <span className="font-medium">{result.from}</span> → <span className="font-medium">{result.to}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-irctc-blue" />
              <div className="text-sm">{formatDisplayDate(result.date)} | Dep: {result.departure} | Arr: {result.arrival}</div>
            </div>
            <div className="border-t pt-3">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-1"><User className="w-4 h-4" /> Passengers</h4>
              {result.passengers.map((p, i) => (
                <div key={i} className="text-sm text-gray-400 py-1">
                  {p.name} | Age: {p.age} | {p.gender} {p.berth && `| ${p.berth}`}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
