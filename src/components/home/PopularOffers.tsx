import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { offers } from '../../data/offers'
import { useToast } from '../../context/useToast'

export function PopularOffers() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const featured = offers.slice(0, 4)

  const handleCoupon = (code: string, e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(code)
    showToast(`Coupon code "${code}" copied to clipboard!`, 'success')
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9 lg:py-11">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl lg:text-2xl font-extrabold text-irctc-navy">Popular Offers</h2>
        <button
          onClick={() => navigate('/offers')}
          className="text-irctc-blue text-sm font-semibold hover:underline flex items-center gap-1"
        >
          View All Offers <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featured.map((offer) => (
          <div
            key={offer.id}
            onClick={() => navigate('/offers')}
            className="bg-white/90 rounded-[1.35rem] border border-white/80 overflow-hidden shadow-lg shadow-blue-950/5 hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          >
            <div className="h-36 overflow-hidden">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 text-sm leading-snug mb-3 min-h-[40px]">
                {offer.title}
              </h3>
              {offer.type === 'coupon' && offer.code ? (
                <button
                  onClick={(e) => handleCoupon(offer.code!, e)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                    offer.id === 'o1' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                    offer.id === 'o2' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' :
                    'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  Use Code: {offer.code}
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate('/book-ticket')
                  }}
                  className="text-xs font-bold px-4 py-1.5 bg-gradient-to-r from-irctc-blue to-irctc-cyan text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                  Book Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
