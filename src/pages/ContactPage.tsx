import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h1>
        <p className="text-gray-500">We'll get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {[
            { icon: Phone, label: 'Customer Care', value: '139 / 0755-6610661' },
            { icon: Mail, label: 'Email', value: 'care@irctc.co.in' },
            { icon: MapPin, label: 'Address', value: 'IRCTC Building, State Entry Road, New Delhi - 110055' },
            { icon: Clock, label: 'Working Hours', value: '24x7 Customer Support' },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-start gap-3">
              <div className="w-10 h-10 bg-irctc-blue-light rounded-xl flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-irctc-blue" />
              </div>
              <div>
                <div className="font-semibold text-sm text-gray-900">{item.label}</div>
                <div className="text-sm text-gray-500">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
          <h2 className="font-bold text-gray-900">Send us a Message</h2>
          <input required placeholder="Your Name" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30" />
          <input required type="email" placeholder="Email Address" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30" />
          <input required placeholder="Subject" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30" />
          <textarea required rows={4} placeholder="Your Message" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30 resize-none" />
          <Button type="submit" className="w-full" size="lg">Send Message</Button>
        </form>
      </div>
    </div>
  )
}
