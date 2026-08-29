import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Share2 } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { useToast } from '../context/ToastContext'
import { CoachSeatMap } from '../components/booking/CoachSeatMap'
import { Button } from '../components/ui/Button'
import { buildCoachesForTrain, getTrainComposition } from '../utils/coachLayout'
import type { Berth } from '../data/ntesCoachData'
import { cn } from '../utils/cn'

export function SeatSelectionPage() {
  const navigate = useNavigate()
  const { selectedTrain, search, seatAssignments, setSeatAssignments } = useBooking()
  const { showToast } = useToast()

  const classCode = selectedTrain?.selectedClass.code || '3A'
  const trainType = selectedTrain?.train.type || 'Express'
  const coaches = useMemo(
    () => buildCoachesForTrain(classCode, getTrainComposition(trainType).coaches),
    [classCode, trainType]
  )

  const [activeCoachId, setActiveCoachId] = useState(coaches[0]?.id || 'B1')
  const [activeSection, setActiveSection] = useState(1)
  const [activePassenger, setActivePassenger] = useState(0)

  const totalPassengers = search.adults + search.children
  const activeCoach = coaches.find((c) => c.id === activeCoachId) || coaches[0]

  const selectedMap = useMemo(() => {
    const map = new Map<number, number>()
    seatAssignments.forEach((a) => map.set(a.berthNumber, a.passengerIndex))
    return map
  }, [seatAssignments])

  const handleSelectBerth = useCallback((berth: Berth) => {
    if (berth.status === 'booked') return

    const existing = seatAssignments.find((a) => a.berthNumber === berth.number && a.coachId === activeCoachId)
    if (existing) {
      setSeatAssignments(seatAssignments.filter((a) => !(a.coachId === activeCoachId && a.berthNumber === berth.number)))
      return
    }

    const filtered = seatAssignments.filter((a) => a.passengerIndex !== activePassenger)
    setSeatAssignments([
      ...filtered,
      {
        coachId: activeCoachId,
        coachLabel: activeCoach.label,
        berthNumber: berth.number,
        berthType: berth.type,
        passengerIndex: activePassenger,
      },
    ])

    if (activePassenger < totalPassengers - 1) {
      setActivePassenger(activePassenger + 1)
    }
    setActiveSection(berth.section)
  }, [seatAssignments, activeCoachId, activeCoach, activePassenger, totalPassengers, setSeatAssignments])

  const handleContinue = () => {
    if (seatAssignments.length < totalPassengers) {
      showToast(`Please select ${totalPassengers - seatAssignments.length} more berth(s)`, 'error')
      return
    }
    navigate('/review')
  }

  if (!selectedTrain) {
    navigate('/trains')
    return null
  }

  const sections = [...new Set(activeCoach.berths.map((b) => b.section))]

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#161b26] border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/passenger-details')} className="p-2 rounded-lg hover:bg-[#1a2332]/10">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-base truncate">
                {activeCoach.label} — {activeCoach.className}
              </h1>
              <p className="text-xs text-gray-400 truncate">
                {selectedTrain.train.number} — {selectedTrain.train.name}
              </p>
            </div>
            <button className="p-2 rounded-lg hover:bg-[#1a2332]/10"><Share2 className="w-5 h-5" /></button>
          </div>

          {/* Coach selector */}
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {coaches.map((coach) => (
              <button
                key={coach.id}
                onClick={() => { setActiveCoachId(coach.id); setActiveSection(1) }}
                className={cn(
                  'shrink-0 flex flex-col items-center gap-1 px-2',
                  activeCoachId === coach.id ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                )}
              >
                <div className={cn(
                  'w-10 h-6 rounded-sm border-2 flex items-end justify-center overflow-hidden',
                  activeCoachId === coach.id ? 'border-blue-400' : 'border-gray-600'
                )}>
                  <div className="w-full h-3 bg-gradient-to-b from-blue-500 to-orange-500" />
                </div>
                <span className={cn('text-xs font-bold', activeCoachId === coach.id && 'text-blue-400')}>
                  {coach.label}
                </span>
              </button>
            ))}
          </div>

          {/* Section selector */}
          <div className="flex gap-1.5 overflow-x-auto pb-2">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={cn(
                  'w-8 h-8 rounded-full text-xs font-bold shrink-0 transition-all',
                  activeSection === s ? 'bg-blue-500 text-white' : 'bg-[#1a2332]/10 text-gray-400 hover:bg-[#1a2332]/20'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-red-700 text-white text-xs text-center py-2 px-4 font-medium">
        WARNING! Coach position may not be accurate for certain trains. Please check it once at station
      </div>

      {/* Passenger tabs */}
      <div className="max-w-4xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
        {Array.from({ length: totalPassengers }).map((_, i) => {
          const assigned = seatAssignments.find((a) => a.passengerIndex === i)
          return (
            <button
              key={i}
              onClick={() => setActivePassenger(i)}
              className={cn(
                'shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all',
                activePassenger === i
                  ? 'bg-blue-500 border-blue-400 text-white'
                  : assigned
                    ? 'bg-green-900/40 border-green-500/50 text-green-300'
                    : 'bg-[#1a2332]/5 border-white/20 text-gray-400'
              )}
            >
              P{i + 1} {assigned ? `— ${assigned.coachLabel}/${assigned.berthNumber}` : ''}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="max-w-4xl mx-auto px-4 pb-2 flex flex-wrap gap-3 text-xs text-gray-400">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#1e2433] border border-white/20" /> Available</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500" /> Selected</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-950 border border-red-800" /> Booked</span>
      </div>

      {/* Seat map */}
      <div className="max-w-4xl mx-auto">
        <CoachSeatMap
          coach={activeCoach}
          activeSection={activeSection}
          selectedBerths={selectedMap}
          activePassenger={activePassenger}
          onSelectBerth={handleSelectBerth}
        />
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-[#161b26] border-t border-white/10 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            {seatAssignments.length}/{totalPassengers} berths selected
          </div>
          <Button onClick={handleContinue} className="min-w-[160px]">
            Continue to Review
          </Button>
        </div>
      </div>
    </div>
  )
}
