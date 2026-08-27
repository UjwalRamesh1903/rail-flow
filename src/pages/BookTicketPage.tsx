import { useEffect } from 'react'
import { SearchCard } from '../components/booking/SearchCard'

export function BookTicketPage() {
  useEffect(() => {
    document.getElementById('booking-search')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Book Train Ticket</h1>
      <SearchCard id="booking-search" />
      <p className="text-sm text-gray-500 mt-4 text-center">
        Select your journey details above and click Search Trains to find available trains.
      </p>
    </div>
  )
}
