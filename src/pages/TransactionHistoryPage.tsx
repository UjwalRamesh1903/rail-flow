import { useAuth } from '../context/AuthContext'
import { useBooking } from '../context/BookingContext'
import { History, Receipt } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { RequireAuth } from '../components/auth/RequireAuth'
import { formatDisplayDate } from '../utils/formatDate'

function TransactionHistoryContent() {
  const { user } = useAuth()
  const { getPaymentHistory } = useBooking()
  const { t } = useLanguage()

  const payments = user ? getPaymentHistory(user.email) : []
  const totalSpent = payments.filter((p) => p.status === 'Success').reduce((s, p) => s + p.amount, 0)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-6 flex items-center gap-2">
        <History className="w-7 h-7 text-irctc-blue" />
        {t('tx.title')}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#1a2332] rounded-2xl border border-white/10 p-5">
          <div className="text-sm text-gray-400">{t('tx.totalSpent')}</div>
          <div className="text-2xl font-bold text-irctc-blue">₹{totalSpent.toLocaleString()}</div>
        </div>
        <div className="bg-[#1a2332] rounded-2xl border border-white/10 p-5">
          <div className="text-sm text-gray-400">{t('tx.totalBookings')}</div>
          <div className="text-2xl font-bold text-gray-100">{payments.length}</div>
        </div>
      </div>

      <h2 className="font-bold text-gray-100 mb-4">{t('tx.recent')}</h2>
      {payments.length === 0 ? (
        <div className="bg-[#1a2332] rounded-2xl border border-white/10 p-8 text-center text-gray-400">
          {t('tx.empty')}
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((tx) => (
            <div key={tx.id} className="bg-[#1a2332] rounded-2xl border border-white/10 p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-irctc-blue shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-100">{tx.trainNumber} — {tx.trainName}</div>
                    <div className="text-xs text-gray-400">{tx.from} → {tx.to}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-400">₹{tx.amount}</div>
                  <div className={`text-[10px] uppercase font-semibold ${
                    tx.status === 'Success' ? 'text-green-500' : tx.status === 'Refunded' ? 'text-yellow-500' : 'text-red-500'
                  }`}>{tx.status}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div><span className="text-gray-500">PNR</span><div className="font-mono text-gray-200">{tx.pnr}</div></div>
                <div><span className="text-gray-500">Payment ID</span><div className="font-mono text-gray-200">{tx.paymentId}</div></div>
                <div><span className="text-gray-500">Booking ID</span><div className="font-mono text-gray-200">{tx.bookingId}</div></div>
                <div><span className="text-gray-500">Journey Date</span><div className="text-gray-200">{formatDisplayDate(tx.journeyDate)}</div></div>
                <div><span className="text-gray-500">Paid On</span><div className="text-gray-200">{formatDisplayDate(tx.date)}</div></div>
                <div><span className="text-gray-500">Method</span><div className="text-gray-200">{tx.method}</div></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function TransactionHistoryPage() {
  return (
    <RequireAuth title="Login to View Transactions">
      <TransactionHistoryContent />
    </RequireAuth>
  )
}
