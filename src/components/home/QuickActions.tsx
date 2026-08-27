import { useNavigate } from 'react-router-dom'
import { Train, Ticket, TicketX, Wallet, FileText } from 'lucide-react'

const actions = [
  {
    title: 'Check PNR Status',
    subtitle: 'Get your PNR details',
    icon: Train,
    iconBg: 'bg-[#1a73e8]',
    titleColor: 'text-[#1a73e8]',
    route: '/pnr-status',
  },
  {
    title: 'My Bookings',
    subtitle: 'View your bookings',
    icon: Ticket,
    iconBg: 'bg-[#34a853]',
    titleColor: 'text-[#34a853]',
    route: '/my-bookings',
  },
  {
    title: 'Cancel Ticket',
    subtitle: 'Cancel your ticket',
    icon: TicketX,
    iconBg: 'bg-[#ea4335]',
    titleColor: 'text-[#ea4335]',
    route: '/cancel-ticket',
  },
  {
    title: 'E-Wallet',
    subtitle: 'Top-up & manage',
    icon: Wallet,
    iconBg: 'bg-[#8e24aa]',
    titleColor: 'text-[#8e24aa]',
    route: '/e-wallet',
  },
  {
    title: 'File TDR',
    subtitle: 'Track your refund',
    icon: FileText,
    iconBg: 'bg-[#00acc1]',
    titleColor: 'text-[#00acc1]',
    route: '/file-tdr',
  },
]

export function QuickActions() {
  const navigate = useNavigate()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={() => navigate(action.route)}
            className="bg-white rounded-2xl border border-gray-100 p-4 lg:p-4 text-left hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group flex items-center gap-3.5"
          >
            <div
              className={`w-11 h-11 ${action.iconBg} rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform`}
            >
              <action.icon className="w-5 h-5 text-white" strokeWidth={2.25} />
            </div>
            <div className="min-w-0">
              <h3 className={`font-bold text-sm leading-tight ${action.titleColor}`}>{action.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5 leading-snug">{action.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
