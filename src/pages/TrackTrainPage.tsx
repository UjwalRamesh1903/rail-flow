import { useState } from 'react'
import { MapPin, Train, Clock, Gauge, Navigation } from 'lucide-react'
import { trackByPNR, trackByTrainNumber, type TrainTrackingInfo } from '../data/trainTracking'
import { useToast } from '../context/ToastContext'
import { Button } from '../components/ui/Button'
import { cn } from '../utils/cn'

export function TrackTrainPage() {
  const { showToast } = useToast()
  const [mode, setMode] = useState<'pnr' | 'train'>('pnr')
  const [query, setQuery] = useState('')
  const [tracking, setTracking] = useState<TrainTrackingInfo | null>(null)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) {
      showToast('Please enter a PNR or train number', 'error')
      return
    }

    const result = mode === 'pnr' ? trackByPNR(trimmed) : trackByTrainNumber(trimmed)
    if (!result) {
      showToast(mode === 'pnr' ? 'PNR not found' : 'Train number not found', 'error')
      setTracking(null)
      return
    }
    setTracking(result)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-2 flex items-center gap-2">
        <Navigation className="w-7 h-7 text-irctc-blue" />
        Where Is My Train?
      </h1>
      <p className="text-sm text-gray-400 mb-6">Enter your PNR or train number to see live running status.</p>

      <div className="flex gap-2 mb-4">
        {(['pnr', 'train'] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setQuery(''); setTracking(null) }}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-semibold border transition-colors',
              mode === m ? 'bg-irctc-blue border-irctc-blue text-white' : 'border-white/15 text-gray-400 hover:border-white/30'
            )}
          >
            {m === 'pnr' ? 'By PNR' : 'By Train Number'}
          </button>
        ))}
      </div>

      <form onSubmit={handleTrack} className="flex gap-2 mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={mode === 'pnr' ? 'Enter 10-digit PNR' : 'Enter train number e.g. 12951'}
          className="surface-input flex-1 px-4 py-3 rounded-xl text-sm"
        />
        <Button type="submit" size="lg">Track</Button>
      </form>

      {tracking && (
        <div className="bg-[#1a2332] rounded-2xl border border-white/10 overflow-hidden">
          <div className="bg-gradient-to-r from-irctc-blue/20 to-transparent p-5 border-b border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Train className="w-5 h-5 text-irctc-blue" />
              <span className="font-bold text-lg text-gray-100">{tracking.trainNumber}</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                tracking.status === 'On Time' ? 'bg-green-900/50 text-green-400' :
                tracking.status === 'Delayed' ? 'bg-red-900/50 text-red-400' :
                'bg-blue-900/50 text-blue-400'
              }`}>{tracking.status}{tracking.delayMinutes > 0 ? ` (+${tracking.delayMinutes}m)` : ''}</span>
            </div>
            <div className="text-sm text-gray-400">{tracking.trainName}</div>
            <div className="text-xs text-gray-500 mt-1">{tracking.from} → {tracking.to}</div>
          </div>

          <div className="p-5">
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{tracking.from}</span>
                <span>{tracking.to}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-irctc-blue to-green-400 rounded-full transition-all"
                  style={{ width: `${tracking.progressPercent}%` }}
                />
              </div>
              <div className="text-center text-xs text-irctc-blue font-semibold mt-1">{tracking.progressPercent}% completed</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-[#111827] rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1"><MapPin className="w-3.5 h-3.5" /> Current Station</div>
                <div className="font-bold text-gray-100">{tracking.currentStation}</div>
              </div>
              <div className="bg-[#111827] rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1"><MapPin className="w-3.5 h-3.5" /> Next Station</div>
                <div className="font-bold text-gray-100">{tracking.nextStation}</div>
              </div>
              <div className="bg-[#111827] rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1"><Gauge className="w-3.5 h-3.5" /> Speed</div>
                <div className="font-bold text-gray-100">{tracking.speed} km/h</div>
              </div>
              <div className="bg-[#111827] rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1"><Clock className="w-3.5 h-3.5" /> Last Updated</div>
                <div className="font-bold text-gray-100">{tracking.lastUpdated}</div>
              </div>
            </div>

            <div className="text-xs text-gray-500 mb-2">Route: {tracking.distanceCovered} / {tracking.distanceTotal}</div>
            <div className="flex flex-wrap gap-1.5">
              {tracking.route.map((station, i) => (
                <span
                  key={station}
                  className={cn(
                    'px-2 py-1 rounded text-xs',
                    i === tracking.currentIndex ? 'bg-irctc-blue text-white font-bold' :
                    i < tracking.currentIndex ? 'bg-green-900/40 text-green-400' :
                    'bg-white/5 text-gray-500'
                  )}
                >
                  {station}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
