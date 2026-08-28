import { SearchCard } from '../booking/SearchCard'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[500px] lg:min-h-[560px]">
      {/* Vande Bharat background */}
      <div className="absolute inset-0">
        <img
          src="/images/vande-bharat-hero.jpg"
          alt="Vande Bharat Express train"
          className="w-full h-full object-cover object-[75%_center] lg:object-[right_center]"
        />
        {/* Light gradient — train stays visible on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-sky-200/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(11,92,255,0.22),transparent_26rem),radial-gradient(circle_at_72%_16%,rgba(255,107,0,0.20),transparent_20rem)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f7fbff] via-white/50 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-32 lg:pt-16 lg:pb-36">
        <div className="absolute left-6 top-20 h-28 w-28 rounded-full bg-irctc-cyan/25 blur-3xl animate-float-glow" />
        <div className="absolute right-20 top-10 h-32 w-32 rounded-full bg-irctc-orange/20 blur-3xl animate-float-glow" />
        <div className="relative max-w-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold text-irctc-navy leading-[1.05] tracking-tight drop-shadow-sm">
            Easy Booking,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-irctc-blue via-irctc-cyan to-irctc-orange">
              Happy Journey
            </span>
          </h1>
          <p className="mt-5 text-slate-700 text-base sm:text-lg max-w-md leading-relaxed font-medium">
            Book train tickets in just a few clicks. Safe, Secure &amp; Trusted by Millions.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-irctc-navy">
            <span className="rounded-full bg-white/80 px-3 py-1.5 shadow-sm ring-1 ring-blue-100">IRCTC Authorized Flow</span>
            <span className="rounded-full bg-white/80 px-3 py-1.5 shadow-sm ring-1 ring-orange-100">Instant Booking UI</span>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 lg:-mt-22 z-10">
        <SearchCard id="booking-search" />
      </div>
    </section>
  )
}
