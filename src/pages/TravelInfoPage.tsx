import { Train, Tag, Armchair, Map, UtensilsCrossed, Luggage, Users, Accessibility, Hotel, Compass } from 'lucide-react'
import { travelInfoItems } from '../data/travel-info'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  train: Train, tag: Tag, seat: Armchair, map: Map, food: UtensilsCrossed,
  luggage: Luggage, senior: Users, accessibility: Accessibility, room: Hotel, tourism: Compass,
}

export function TravelInfoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-2">Travel Information</h1>
      <p className="text-sm text-gray-400 mb-8">Everything you need to know for a comfortable train journey.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {travelInfoItems.map((item) => {
          const Icon = iconMap[item.icon] || Train
          return (
            <div key={item.id} className="bg-[#1a2332] rounded-2xl border border-white/10 p-5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-irctc-blue-light rounded-xl flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-irctc-blue" />
              </div>
              <h3 className="font-bold text-gray-100 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
