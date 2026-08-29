import { useBooking } from '../context/BookingContext'
import { ArrowUpRight, ArrowDownLeft, History } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export function TransactionHistoryPage() {
  const { walletTransactions, walletBalance } = useBooking()
  const { t } = useLanguage()

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-6 flex items-center gap-2">
        <History className="w-7 h-7 text-irctc-blue" />
        {t('tx.title')}
      </h1>

      <div className="bg-[#1a2332] rounded-2xl border border-white/10 p-5 mb-6 flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-400">{t('tx.balance')}</div>
          <div className="text-2xl font-bold text-gray-100">₹{walletBalance.toLocaleString()}</div>
        </div>
      </div>

      <h2 className="font-bold text-gray-100 mb-4">{t('tx.recent')}</h2>
      {walletTransactions.length === 0 ? (
        <div className="bg-[#1a2332] rounded-2xl border border-white/10 p-8 text-center text-gray-400">
          {t('tx.empty')}
        </div>
      ) : (
        <div className="bg-[#1a2332] rounded-2xl border border-white/10 divide-y divide-white/10">
          {walletTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 p-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                tx.type === 'credit' ? 'bg-green-900/40' : 'bg-red-900/40'
              }`}>
                {tx.type === 'credit'
                  ? <ArrowDownLeft className="w-5 h-5 text-green-400" />
                  : <ArrowUpRight className="w-5 h-5 text-red-400" />
                }
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-100">{tx.description}</div>
                <div className="text-xs text-gray-400">{tx.date}</div>
              </div>
              <div className="text-right">
                <div className={`font-bold text-sm ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                  {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                </div>
                <div className="text-[10px] text-gray-500 uppercase">
                  {tx.type === 'credit' ? t('tx.credit') : t('tx.debit')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
