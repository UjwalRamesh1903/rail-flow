import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { Button } from '../components/ui/Button'
import type { Passenger } from '../types'

export function PassengerDetailsPage() {
  const navigate = useNavigate()
  const { search, selectedTrain, setPassengerDetails } = useBooking()
  const totalPassengers = search.adults + search.children

  const [passengers, setPassengers] = useState<Passenger[]>(
    Array.from({ length: totalPassengers }, () => ({
      name: '', age: 25, gender: 'Male' as const,
    }))
  )

  const updatePassenger = (index: number, field: keyof Passenger, value: string | number) => {
    setPassengers((prev) => prev.map((p, i) => i === index ? { ...p, [field]: value } : p))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const invalid = passengers.some((p) => !p.name.trim() || p.age < 1)
    if (invalid) return
    setPassengerDetails(passengers)
    navigate('/review')
  }

  if (!selectedTrain) {
    navigate('/trains')
    return null
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={() => navigate('/trains')} className="flex items-center gap-1 text-sm text-irctc-blue mb-4 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Trains
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">Passenger Details</h1>
      <p className="text-sm text-gray-500 mb-6">
        {selectedTrain.train.number} - {selectedTrain.train.name} | {selectedTrain.selectedClass.name}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {passengers.map((p, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">
              Passenger {i + 1} {i < search.adults ? '(Adult)' : '(Child)'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
                <input
                  required
                  value={p.name}
                  onChange={(e) => updatePassenger(i, 'name', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Age</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={120}
                  value={p.age}
                  onChange={(e) => updatePassenger(i, 'age', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Gender</label>
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

        <Button type="submit" size="lg" className="w-full">Continue to Review</Button>
      </form>
    </div>
  )
}
