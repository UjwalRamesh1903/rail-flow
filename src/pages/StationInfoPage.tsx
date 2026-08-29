import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'
import { searchStations } from '../utils/searchStations'

export function StationInfoPage() {
  const [query, setQuery] = useState('')
  const results = searchStations(query, 30)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-2">Station Information</h1>
      <p className="text-sm text-gray-400 mb-6">Search stations by name, code, or city.</p>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search station name, code or city..."
          className="w-full pl-10 pr-4 py-3 bg-[#1a2332] border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
        />
      </div>

      <div className="bg-[#1a2332] rounded-2xl border border-white/10 divide-y">
        {results.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No stations found.</div>
        ) : (
          results.map((station) => (
            <div key={`${station.code}-${station.name}`} className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 bg-irctc-blue-light rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-irctc-blue" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-100">{station.name}</div>
                <div className="text-sm text-gray-400">{station.city}, {station.state}</div>
              </div>
              <span className="px-2.5 py-1 bg-irctc-blue-light text-irctc-blue text-xs font-bold rounded">{station.code}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
