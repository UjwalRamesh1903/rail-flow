import { useNavigate } from 'react-router-dom'
import { Copy } from 'lucide-react'
import { offers } from '../data/offers'
import { useToast } from '../context/ToastContext'

export function OffersPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    showToast(`Coupon "${code}" copied!`, 'success')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-2">All Offers</h1>
      <p className="text-sm text-gray-400 mb-8">Exclusive deals and discounts on train bookings and services.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-[#1a2332] rounded-2xl border border-white/10 overflow-hidden hover:shadow-lg transition-all">
            <div className="h-44 overflow-hidden">
              <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <span className="text-xs font-medium text-irctc-blue bg-irctc-blue-light px-2 py-0.5 rounded">{offer.category}</span>
              <h3 className="font-bold text-gray-100 mt-2 mb-1">{offer.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{offer.description}</p>
              {offer.discount && (
                <span className="inline-block text-sm font-bold text-green-700 bg-green-50 px-2 py-1 rounded mb-3">{offer.discount}</span>
              )}
              <div className="flex gap-2">
                {offer.code ? (
                  <button
                    onClick={() => handleCopy(offer.code!)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-irctc-blue-light text-irctc-blue text-sm font-bold rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Copy className="w-4 h-4" /> {offer.code}
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/book-ticket')}
                    className="flex-1 py-2 bg-irctc-blue text-white text-sm font-bold rounded-lg hover:bg-irctc-blue-dark transition-colors"
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
