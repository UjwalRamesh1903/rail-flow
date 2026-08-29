import { useState, useEffect, useRef } from 'react'
import { Search, MapPin } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { searchStations } from '../../utils/searchStations'
import type { Station } from '../../types'

interface StationSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (station: Station) => void
  title: string
  selectedStation?: Station | null
}

export function StationSelector({ isOpen, onClose, onSelect, title, selectedStation }: StationSelectorProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Station[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setResults(searchStations('', 50))
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    setResults(searchStations(query, 50))
  }, [query])

  const handleSelect = (station: Station) => {
    onSelect(station)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by station name, code or city..."
            className="surface-input w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue/30"
          />
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {results.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="w-10 h-10 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No stations found for &quot;{query}&quot;</p>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {results.map((station) => (
                <button
                  key={`${station.code}-${station.name}`}
                  onClick={() => handleSelect(station)}
                  className={`w-full flex items-center gap-3 px-3 py-3 hover:bg-irctc-blue-light/30 transition-colors text-left rounded-lg ${
                    selectedStation?.code === station.code ? 'bg-irctc-blue-light/40' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-irctc-blue-light/50 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-irctc-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-100 text-sm">{station.name}</div>
                    <div className="text-xs text-gray-400">{station.city}, {station.state}</div>
                  </div>
                  <span className="px-2.5 py-1 bg-irctc-blue-light text-irctc-blue text-xs font-bold rounded-md shrink-0">
                    {station.code}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
