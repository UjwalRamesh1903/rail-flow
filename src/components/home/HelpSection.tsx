import { useNavigate } from 'react-router-dom'
import { HelpCircle, Phone, MapPin, MessageSquare } from 'lucide-react'

const helpItems = [
  { icon: HelpCircle, title: 'FAQs', subtitle: 'Find quick answers', route: '/faq' },
  { icon: Phone, title: 'Contact Us', subtitle: 'Reach our support', route: '/contact' },
  { icon: MapPin, title: 'Station Info', subtitle: 'Find station details', route: '/station-info' },
]

export function HelpSection() {
  const navigate = useNavigate()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <div className="bg-white/85 rounded-[1.5rem] border border-white/80 shadow-xl shadow-blue-950/5 backdrop-blur-xl p-5 lg:p-6 flex flex-col lg:flex-row items-start lg:items-center gap-6">
        <h2 className="text-lg font-bold text-irctc-blue shrink-0">Need Help?</h2>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {helpItems.map((item) => (
            <button
              key={item.title}
              onClick={() => navigate(item.route)}
              className="flex items-center gap-3 hover:bg-blue-50/80 rounded-xl p-2 -m-2 transition-colors text-left"
            >
              <div className="w-11 h-11 bg-gradient-to-br from-irctc-blue to-irctc-cyan rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm text-gray-900">{item.title}</div>
                <div className="text-xs text-gray-500">{item.subtitle}</div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('/feedback')}
          className="flex items-center gap-2 px-5 py-2.5 border-2 border-blue-200 bg-white/80 rounded-full text-sm font-semibold text-gray-700 hover:border-irctc-blue hover:text-irctc-blue transition-colors shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          Feedback / Suggestion
        </button>
      </div>
    </section>
  )
}
