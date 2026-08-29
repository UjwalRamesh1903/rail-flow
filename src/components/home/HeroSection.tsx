import { SearchCard } from '../booking/SearchCard'
import { useLanguage } from '../../context/LanguageContext'

const HERO_WEBP = `${import.meta.env.BASE_URL}images/hero-trains.webp`
const HERO_JPG = `${import.meta.env.BASE_URL}images/hero-trains-opt.jpg`

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden min-h-[480px] lg:min-h-[540px]">
      <div className="absolute inset-0">
        <picture>
          <source srcSet={HERO_WEBP} type="image/webp" />
          <img
            src={HERO_JPG}
            alt="Indian Railways trains at sunset"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
            width={1400}
            height={933}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e17] via-[#0a0e17]/85 to-[#0a0e17]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/70 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-28 lg:pt-14 lg:pb-32">
        <div className="max-w-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-lg">
            {t('hero.title1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] to-[#93c5fd]">
              {t('hero.title2')}
            </span>
          </h1>
          <p className="mt-4 text-gray-300 text-base sm:text-lg max-w-md leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 lg:-mt-24 z-10">
        <SearchCard id="booking-search" />
      </div>
    </section>
  )
}
