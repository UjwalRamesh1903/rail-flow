import { useState } from 'react'
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { useBooking } from '../context/useBooking'
import { useToast } from '../context/useToast'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'

export function EWalletPage() {
  const { walletBalance, addWalletMoney, walletTransactions } = useBooking()
  const { showToast } = useToast()
  const [addOpen, setAddOpen] = useState(false)
  const [amount, setAmount] = useState('')

  const handleAddMoney = (e: React.FormEvent) => {
    e.preventDefault()
    const val = parseInt(amount)
    if (!val || val < 100) {
      showToast('Minimum amount is ₹100', 'error')
      return
    }
    addWalletMoney(val)
    showToast(`₹${val} added to wallet successfully!`, 'success')
    setAddOpen(false)
    setAmount('')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">IRCTC e-Wallet</h1>

      <div className="bg-gradient-to-br from-irctc-blue to-irctc-blue-dark rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-2 mb-2 opacity-80">
          <Wallet className="w-5 h-5" />
          <span className="text-sm">Available Balance</span>
        </div>
        <div className="text-4xl font-bold mb-4">₹{walletBalance.toLocaleString()}</div>
        <Button
          variant="secondary"
          onClick={() => setAddOpen(true)}
          className="bg-white/20 text-white hover:bg-white/30 border-0"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Money
        </Button>
      </div>

      <h2 className="font-bold text-gray-900 mb-4">Recent Transactions</h2>
      {walletTransactions.length === 0 ? (
        <div className="bg-white rounded-2xl border p-8 text-center text-gray-500">No transactions yet.</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 divide-y">
          {walletTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 p-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                tx.type === 'credit' ? 'bg-green-50' : 'bg-red-50'
              }`}>
                {tx.type === 'credit'
                  ? <ArrowDownLeft className="w-5 h-5 text-green-600" />
                  : <ArrowUpRight className="w-5 h-5 text-red-600" />
                }
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{tx.description}</div>
                <div className="text-xs text-gray-500">{tx.date}</div>
              </div>
              <div className={`font-bold text-sm ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Add Money to Wallet" size="sm">
        <form onSubmit={handleAddMoney} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={100}
              placeholder="Enter amount (min ₹100)"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
            />
          </div>
          <div className="flex gap-2">
            {[500, 1000, 2000, 5000].map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAmount(String(a))}
                className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:border-irctc-blue hover:text-irctc-blue transition-colors"
              >
                ₹{a}
              </button>
            ))}
          </div>
          <Button type="submit" className="w-full" size="lg">Add Money</Button>
        </form>
      </Modal>
    </div>
  )
}
