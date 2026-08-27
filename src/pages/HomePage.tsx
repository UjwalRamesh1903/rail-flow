import { HeroSection } from '../components/home/HeroSection'
import { QuickActions } from '../components/home/QuickActions'
import { TrustBar } from '../components/home/TrustBar'
import { PopularOffers } from '../components/home/PopularOffers'
import { HelpSection } from '../components/home/HelpSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickActions />
      <TrustBar />
      <PopularOffers />
      <HelpSection />
    </>
  )
}
