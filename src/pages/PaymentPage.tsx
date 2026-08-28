import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Wallet, Building } from 'lucide-react'
import { useBooking } from '../context/useBooking'
import { useToast } from '../context/useToast'
import { Button } from '../components/ui/Button'
import { cn } from '../utils/cn'

export function PaymentPage() {
  const navigate = useNavigate()
  const { selectedTrain, passengers, confirmBooking, walletBalance, deductWallet, bookingExtras } = useBooking()
  const { showToast } = useToast()
  const [method, setMethod] = useState('card')
  const [processing, setProcessing] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [upiId, setUpiId] = useState('')
  const [paymentStep, setPaymentStep] = useState<'idle' | 'pending' | 'success' | 'failed'>('idle')

  if (!selectedTrain) { navigate('/trains'); return null }

  const insuranceFee = bookingExtras.travelInsurance ? Math.round(0.45 * passengers.length) : 0
  const totalFare = selectedTrain.selectedClass.fare * passengers.length + insuranceFee

  const handlePay = async () => {
    if (method === 'card' && (cardNumber.replace(/\s/g, '').length < 12 || !cardExpiry || cardCvv.length < 3)) {
      setPaymentStep('failed')
      showToast('Please enter valid card details', 'error')
      return
    }
    if (method === 'upi' && !/^[\w.-]+@[\w.-]+$/.test(upiId)) {
      setPaymentStep('failed')
      showToast('Please enter a valid UPI ID', 'error')
      return
    }
    setProcessing(true)
    setPaymentStep(method === 'upi' ? 'pending' : 'idle')
    await new Promise((r) => setTimeout(r, method === 'upi' ? 1800 : 1200))

    if (method === 'wallet') {
      if (!deductWallet(totalFare)) {
        showToast('Insufficient wallet balance', 'error')
        setProcessing(false)
        return
      }
    }

    confirmBooking()
    setProcessing(false)
    setPaymentStep('success')
    navigate('/confirmation')
  }

  const methods = [
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', label: 'UPI', icon: Building },
    { id: 'wallet', label: `IRCTC Wallet (₹${walletBalance})`, icon: Wallet },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={() => navigate('/review')} className="flex items-center gap-1 text-sm text-irctc-blue mb-4 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payment</h1>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Amount to Pay</span>
          <span className="text-2xl font-bold text-irctc-blue">₹{totalFare}</span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-3">Select Payment Method</h3>
        <div className="space-y-2">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={cn(
                'w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left',
                method === m.id ? 'border-irctc-blue bg-irctc-blue-light/30' : 'border-gray-100 hover:border-gray-200'
              )}
            >
              <m.icon className="w-5 h-5 text-irctc-blue" />
              <span className="font-medium text-sm">{m.label}</span>
            </button>
          ))}
        </div>

        {method === 'card' && (
          <div className="mt-4 space-y-3">
            <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))} placeholder="Card Number" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30" />
            <div className="grid grid-cols-2 gap-3">
              <input value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value.slice(0, 5))} placeholder="MM/YY" className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30" />
              <input value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="CVV" className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30" />
            </div>
          </div>
        )}

        {method === 'upi' && (
          <div className="mt-4">
            <input value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="Enter UPI ID" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30" />
          </div>
        )}
      </div>

      {paymentStep === 'pending' && <div className="mb-4 rounded-xl border border-yellow-200 bg-yellow-50 p-3 text-sm font-medium text-yellow-800">UPI collect request sent. Simulating bank approval...</div>}
      {paymentStep === 'failed' && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">Payment details need attention. Please correct and retry.</div>}

      <Button size="lg" className="w-full" onClick={handlePay} disabled={processing}>
        {processing ? 'Processing...' : `Pay ₹${totalFare}`}
      </Button>
    </div>
  )
}
