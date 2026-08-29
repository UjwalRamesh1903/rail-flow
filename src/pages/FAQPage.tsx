import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '../data/faqs'
import { cn } from '../utils/cn'

export function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null)
  const categories = [...new Set(faqs.map((f) => f.category))]

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-2">Frequently Asked Questions</h1>
      <p className="text-sm text-gray-400 mb-8">Find answers to common questions about train bookings.</p>

      {categories.map((cat) => (
        <div key={cat} className="mb-6">
          <h2 className="font-bold text-irctc-blue mb-3">{cat}</h2>
          <div className="space-y-2">
            {faqs.filter((f) => f.category === cat).map((faq) => (
              <div key={faq.id} className="bg-[#1a2332] rounded-xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-[#0a0e17] transition-colors"
                >
                  <span className="font-medium text-sm text-gray-100 pr-4">{faq.question}</span>
                  <ChevronDown className={cn('w-5 h-5 text-gray-400 shrink-0 transition-transform', openId === faq.id && 'rotate-180')} />
                </button>
                {openId === faq.id && (
                  <div className="px-4 pb-4 text-sm text-gray-400 animate-slide-down">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
