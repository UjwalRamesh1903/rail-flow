import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { useToast } from '../context/ToastContext'
import { Button } from '../components/ui/Button'

export function FeedbackPage() {
  const { showToast } = useToast()
  const [submitted, setSubmitted] = useState(false)
  const [rating, setRating] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    showToast('Thank you for your feedback!', 'success')
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-100 mb-2">Thank You!</h1>
        <p className="text-gray-400">Your feedback has been submitted successfully.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-2">Feedback / Suggestion</h1>
      <p className="text-sm text-gray-400 mb-6">Help us improve your experience. Share your feedback with us.</p>

      <form onSubmit={handleSubmit} className="bg-[#1a2332] rounded-2xl border border-white/10 p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Rate your experience</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`w-10 h-10 rounded-lg text-lg font-bold transition-colors ${
                  star <= rating ? 'bg-yellow-100 text-yellow-600' : 'bg-white/5 text-gray-400 hover:bg-yellow-50'
                }`}
              >
                {star}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
          <select required className="surface-input w-full px-3 py-2.5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30">
            <option value="">Select category</option>
            <option>Booking Experience</option>
            <option>Website / App</option>
            <option>Train Service</option>
            <option>Customer Support</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Your Feedback</label>
          <textarea required rows={4} placeholder="Share your thoughts..." className="surface-input w-full px-3 py-2.5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30 resize-none" />
        </div>

        <input required placeholder="Email (optional for follow-up)" type="email" className="surface-input w-full px-3 py-2.5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30" />

        <Button type="submit" className="w-full" size="lg">Submit Feedback</Button>
      </form>
    </div>
  )
}
