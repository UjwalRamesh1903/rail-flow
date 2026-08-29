import { SearchCard } from '../booking/SearchCard'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1920&h=900&fit=crop&q=80'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[480px] lg:min-h-[540px]">
      {/* First-model Vande Bharat / sunset train background */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Vande Bharat Express train at sunset"
          className="w-full h-full object-cover object-[65%_center] lg:object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e17] via-[#0a0e17]/88 to-[#0a0e17]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/60 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-28 lg:pt-14 lg:pb-32">
        <div className="max-w-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-lg">
            Easy Booking,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] to-[#93c5fd]">
              Happy Journey
            </span>
          </h1>
          <p className="mt-4 text-gray-300 text-base sm:text-lg max-w-md leading-relaxed">
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
