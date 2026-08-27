import { SearchCard } from '../booking/SearchCard'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1600&h=600&fit=crop"
          alt="Vande Bharat Express train"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-32 lg:pt-14 lg:pb-40">
        <div className="max-w-xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Easy Booking,{' '}
            <span className="text-irctc-blue">Happy Journey</span>
          </h1>
          <p className="mt-3 text-gray-600 text-sm sm:text-base max-w-md">
            Book train tickets in just a few clicks. Safe, Secure &amp; Trusted by Millions.
          </p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 lg:-mt-24 z-10">
        <SearchCard id="booking-search" />
      </div>
    </section>
  )
}
