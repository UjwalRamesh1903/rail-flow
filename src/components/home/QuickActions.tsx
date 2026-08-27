import { useNavigate } from 'react-router-dom'
import { Train, Ticket, XCircle, Wallet, FileText } from 'lucide-react'

const actions = [
  {
    title: 'Check PNR Status',
    subtitle: 'Get your PNR details',
    icon: Train,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    route: '/pnr-status',
  },
  {
    title: 'My Bookings',
    subtitle: 'View your bookings',
    icon: Ticket,
    color: 'text-green-600',
    bg: 'bg-green-50',
    route: '/my-bookings',
  },
  {
    title: 'Cancel Ticket',
    subtitle: 'Cancel your ticket',
    icon: XCircle,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    route: '/cancel-ticket',
  },
  {
    title: 'E-Wallet',
    subtitle: 'Manage your wallet',
    icon: Wallet,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    route: '/e-wallet',
  },
  {
    title: 'File TDR',
    subtitle: 'File ticket deposit receipt',
    icon: FileText,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    route: '/file-tdr',
  },
]

export function QuickActions() {
  const navigate = useNavigate()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={() => navigate(action.route)}
            className="bg-white rounded-2xl border border-gray-100 p-4 lg:p-5 text-left hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div className={`w-10 h-10 ${action.bg} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <action.icon className={`w-5 h-5 ${action.color}`} />
            </div>
            <h3 className={`font-bold text-sm ${action.color}`}>{action.title}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{action.subtitle}</p>
          </button>
        ))}
      </div>
    </section>
  )
}
