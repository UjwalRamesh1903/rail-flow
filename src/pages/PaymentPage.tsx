import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Building, Smartphone } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { Button } from '../components/ui/Button'
import { cn } from '../utils/cn'

const methodLabels: Record<string, string> = {
  card: 'Credit/Debit Card',
  upi: 'UPI',
  netbanking: 'Net Banking',
}

export function PaymentPage() {
  const navigate = useNavigate()
  const { selectedTrain, passengers, confirmBooking, bookingExtras } = useBooking()
  const { user } = useAuth()
  const { showToast } = useToast()
  const [method, setMethod] = useState('card')
  const [processing, setProcessing] = useState(false)

  if (!selectedTrain) { navigate('/trains'); return null }
  if (!user) { navigate('/trains'); return null }

  const insuranceFee = bookingExtras.travelInsurance ? Math.round(0.45 * passengers.length) : 0
  const totalFare = selectedTrain.selectedClass.fare * passengers.length + insuranceFee

  const handlePay = async () => {
    setProcessing(true)
    await new Promise((r) => setTimeout(r, 1200))
    confirmBooking(user.email, methodLabels[method] || method)
    setProcessing(false)
    showToast('Payment successful!', 'success')
    navigate('/confirmation')
  }

  const methods = [
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', label: 'UPI', icon: Smartphone },
    { id: 'netbanking', label: 'Net Banking', icon: Building },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={() => navigate('/review')} className="flex items-center gap-1 text-sm text-irctc-blue mb-4 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h1 className="text-2xl font-bold text-gray-100 mb-6">Payment</h1>

      <div className="bg-[#1a2332] rounded-2xl border border-white/10 p-5 mb-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400">Amount to Pay</span>
          <span className="text-2xl font-bold text-irctc-blue">₹{totalFare}</span>
        </div>

        <h3 className="font-semibold text-gray-100 mb-3">Select Payment Method</h3>
        <div className="space-y-2">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={cn(
                'w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-colors text-left',
                method === m.id ? 'border-irctc-blue bg-irctc-blue-light/30' : 'border-white/10 hover:border-white/20'
              )}
            >
              <m.icon className="w-5 h-5 text-irctc-blue" />
              <span className="font-medium text-sm">{m.label}</span>
            </button>
          ))}
        </div>

        {method === 'card' && (
          <div className="mt-4 space-y-3">
            <input placeholder="Card Number" className="surface-input w-full px-3 py-2.5 rounded-xl text-sm" />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="MM/YY" className="surface-input px-3 py-2.5 rounded-xl text-sm" />
              <input placeholder="CVV" className="surface-input px-3 py-2.5 rounded-xl text-sm" />
            </div>
          </div>
        )}

        {method === 'upi' && (
          <div className="mt-4">
            <input placeholder="Enter UPI ID" className="surface-input w-full px-3 py-2.5 rounded-xl text-sm" />
          </div>
        )}
      </div>

      <Button size="lg" className="w-full" onClick={handlePay} disabled={processing}>
        {processing ? 'Processing...' : `Pay ₹${totalFare}`}
      </Button>
    </div>
  )
}
