import { useNavigate } from 'react-router-dom'
import { Train, Ticket, TicketX, Wallet, FileText } from 'lucide-react'

const actions = [
  {
    title: 'Check PNR Status',
    subtitle: 'Get your PNR details',
    icon: Train,
    iconGradient: 'from-[#3B82F6] to-[#1D4ED8]',
    iconShadow: 'shadow-blue-500/40',
    titleColor: 'text-blue-400',
    route: '/pnr-status',
  },
  {
    title: 'My Bookings',
    subtitle: 'View your bookings',
    icon: Ticket,
    iconGradient: 'from-[#22C55E] to-[#15803D]',
    iconShadow: 'shadow-green-500/40',
    titleColor: 'text-green-400',
    route: '/my-bookings',
  },
  {
    title: 'Cancel Ticket',
    subtitle: 'Cancel your ticket',
    icon: TicketX,
    iconGradient: 'from-[#FB923C] to-[#EA580C]',
    iconShadow: 'shadow-orange-500/40',
    titleColor: 'text-orange-400',
    route: '/cancel-ticket',
  },
  {
    title: 'E-Wallet',
    subtitle: 'Top-up & manage',
    icon: Wallet,
    iconGradient: 'from-[#C084FC] to-[#9333EA]',
    iconShadow: 'shadow-purple-500/40',
    titleColor: 'text-purple-400',
    route: '/e-wallet',
  },
  {
    title: 'File TDR',
    subtitle: 'Track your refund',
    icon: FileText,
    iconGradient: 'from-[#22D3EE] to-[#0891B2]',
    iconShadow: 'shadow-cyan-500/40',
    titleColor: 'text-cyan-400',
    route: '/file-tdr',
  },
]

export function QuickActions() {
  const navigate = useNavigate()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 bg-[#0a0e17]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={() => navigate(action.route)}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1a2332] p-4 text-left hover:border-white/20 hover:bg-[#243044] hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 group flex items-center gap-4"
          >
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.iconGradient} flex items-center justify-center shrink-0 shadow-lg ${action.iconShadow} ring-2 ring-white/20 group-hover:scale-110 transition-all duration-300`}
            >
              <action.icon className="w-6 h-6 text-white drop-shadow-sm" strokeWidth={2.5} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className={`font-bold text-sm leading-tight ${action.titleColor}`}>{action.title}</h3>
              <p className="text-xs text-gray-400 mt-1 leading-snug">{action.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
