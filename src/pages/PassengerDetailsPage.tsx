import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Mail, Shield, MapPin } from 'lucide-react'
import { useBooking } from '../context/useBooking'
import { useToast } from '../context/useToast'
import { Button } from '../components/ui/Button'
import type { Passenger } from '../types'

const idProofTypes = ['Aadhaar', 'Voter ID', 'Passport', 'Driving License', 'PAN Card']

export function PassengerDetailsPage() {
  const navigate = useNavigate()
  const { search, selectedTrain, setPassengerDetails, bookingExtras, setBookingExtras } = useBooking()
  const { showToast } = useToast()
  const totalPassengers = search.adults + search.children

  const [passengers, setPassengers] = useState<Passenger[]>(
    Array.from({ length: totalPassengers }, () => ({
      name: '', age: '', gender: 'Male' as const,
    }))
  )
  const [extras, setExtras] = useState(bookingExtras)

  const updatePassenger = (index: number, field: keyof Passenger, value: string | number) => {
    setPassengers((prev) => prev.map((p, i) => i === index ? { ...p, [field]: value } : p))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const invalidPassenger = passengers.some((p) => !p.name.trim() || p.age === '' || Number(p.age) < 1)
    if (invalidPassenger) {
      showToast('Please fill all passenger details including age', 'error')
      return
    }
    if (!extras.email.trim() || !extras.mobile.trim()) {
      showToast('Please enter contact email and mobile number', 'error')
      return
    }
    if (!/^\d{10}$/.test(extras.mobile.replace(/\D/g, ''))) {
      showToast('Please enter a valid 10-digit mobile number', 'error')
      return
    }

    setPassengerDetails(passengers.map((p) => ({ ...p, age: Number(p.age) })))
    setBookingExtras({
      ...extras,
      boardingStation: extras.boardingStation || search.from?.name || '',
      reservationUpto: extras.reservationUpto || search.to?.name || '',
    })
    navigate('/seat-selection')
  }

  if (!selectedTrain) {
    navigate('/trains')
    return null
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <button onClick={() => navigate('/trains')} className="flex items-center gap-1 text-sm text-irctc-blue mb-4 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Trains
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-1">Passenger Details</h1>
      <p className="text-sm text-gray-500 mb-6">
        {selectedTrain.train.number} — {selectedTrain.train.name} | {selectedTrain.selectedClass.name}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Contact Details */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Mail className="w-4 h-4 text-irctc-blue" /> Contact Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Email ID *</label>
              <input
                required type="email" value={extras.email}
                onChange={(e) => setExtras({ ...extras, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Mobile Number *</label>
              <input
                required type="tel" value={extras.mobile}
                onChange={(e) => setExtras({ ...extras, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                placeholder="10-digit mobile"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
              />
            </div>
          </div>
        </div>

        {/* Passenger forms */}
        {passengers.map((p, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-irctc-blue" />
              Passenger {i + 1} {i < search.adults ? '(Adult)' : '(Child)'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Full Name *</label>
                <input
                  required value={p.name}
                  onChange={(e) => updatePassenger(i, 'name', e.target.value)}
                  placeholder="As per ID proof"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Age *</label>
                <input
                  type="number" required min={1} max={120}
                  value={p.age}
                  onChange={(e) => updatePassenger(i, 'age', e.target.value === '' ? '' : parseInt(e.target.value))}
                  placeholder="Age"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Gender *</label>
                <select
                  value={p.gender}
                  onChange={(e) => updatePassenger(i, 'gender', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender">Transgender</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        {/* ID Proof */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-3">ID Proof Type</h3>
          <select
            value={extras.idProofType}
            onChange={(e) => setExtras({ ...extras, idProofType: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
          >
            {idProofTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Boarding / Reservation */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-irctc-blue" /> Journey Stations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Boarding Station</label>
              <input
                value={extras.boardingStation || search.from?.name || ''}
                onChange={(e) => setExtras({ ...extras, boardingStation: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Reservation Up To</label>
              <input
                value={extras.reservationUpto || search.to?.name || ''}
                onChange={(e) => setExtras({ ...extras, reservationUpto: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
              />
            </div>
          </div>
        </div>

        {/* IRCTC Options */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-irctc-blue" /> Booking Options
          </h3>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox" checked={extras.travelInsurance}
              onChange={(e) => setExtras({ ...extras, travelInsurance: e.target.checked })}
              className="mt-1 accent-irctc-blue"
            />
            <div>
              <div className="text-sm font-medium">Travel Insurance (₹0.45/person)</div>
              <div className="text-xs text-gray-500">Covers accidental death and hospitalization during journey</div>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox" checked={extras.autoUpgrade}
              onChange={(e) => setExtras({ ...extras, autoUpgrade: e.target.checked })}
              className="mt-1 accent-irctc-blue"
            />
            <div>
              <div className="text-sm font-medium">Consider for Auto Upgradation</div>
              <div className="text-xs text-gray-500">Get upgraded to higher class if seats available (no extra charge)</div>
            </div>
          </label>
        </div>

        <Button type="submit" size="lg" className="w-full">
          Continue to Seat Selection
        </Button>
      </form>
    </div>
  )
}
