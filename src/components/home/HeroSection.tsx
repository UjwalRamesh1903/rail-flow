import { SearchCard } from '../booking/SearchCard'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[520px] lg:min-h-[580px]">
      {/* Vande Bharat background */}
      <div className="absolute inset-0">
        <img
          src="/images/vande-bharat-hero.jpg"
          alt="Vande Bharat Express train"
          className="w-full h-full object-cover object-[75%_center] lg:object-[right_center]"
        />
        {/* Light gradient — train stays visible on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 to-white/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-36 lg:pt-16 lg:pb-44">
        <div className="max-w-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-gray-900 leading-[1.1] tracking-tight">
            Easy Booking,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052CC] to-[#0080FF]">
              Happy Journey
            </span>
          </h1>
          <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-md leading-relaxed">
            Book train tickets in just a few clicks. Safe, Secure &amp; Trusted by Millions.
          </p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 lg:-mt-28 z-10">
        <SearchCard id="booking-search" />
      </div>
    </section>
  )
}
