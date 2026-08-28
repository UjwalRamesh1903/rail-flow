import { Shield, Zap, Tag, Headphones } from 'lucide-react'

const items = [
  { icon: Shield, label: '100% Secure Booking' },
  { icon: Zap, label: 'Instant Confirmation' },
  { icon: Tag, label: 'No Hidden Charges' },
  { icon: Headphones, label: 'Customer Support 24x7' },
]

export function TrustBar() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-blue-200/80 bg-white/75 shadow-lg shadow-blue-950/5 backdrop-blur-xl overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center justify-center gap-2.5 py-4 ${
                i < items.length - 1 ? 'lg:border-r border-blue-100' : ''
              } ${i % 2 === 0 ? 'border-r border-blue-100 lg:border-r' : ''} ${
                i < 2 ? 'border-b lg:border-b-0 border-blue-100' : ''
              }`}
            >
              <item.icon className="w-5 h-5 text-irctc-blue shrink-0" />
              <span className="text-sm font-semibold text-irctc-navy">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
