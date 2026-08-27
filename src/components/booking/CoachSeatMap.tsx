import { useMemo } from 'react'
import type { Berth, Coach } from '../../data/ntesCoachData'
import { formatBerthLabel, groupBerthsBySection } from '../../utils/coachLayout'
import { cn } from '../../utils/cn'

interface CoachSeatMapProps {
  coach: Coach
  activeSection: number
  selectedBerths: Map<number, number>
  activePassenger: number
  onSelectBerth: (berth: Berth) => void
}

export function CoachSeatMap({ coach, activeSection, selectedBerths, activePassenger, onSelectBerth }: CoachSeatMapProps) {
  const sections = useMemo(() => groupBerthsBySection(coach.berths), [coach.berths])
  const isChair = ['CC', 'EC', '2S'].includes(coach.classCode)

  if (isChair) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-3">
        {coach.berths.map((berth: Berth) => (
          <BerthButton
            key={berth.number}
            berth={berth}
            selectedBy={selectedBerths.get(berth.number)}
            activePassenger={activePassenger}
            onSelect={() => onSelectBerth(berth)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="p-3 space-y-3">
      {sections.map(([section, { main, side }]) => (
        <div
          key={section}
          className={cn(
            'rounded-xl border p-3 transition-all',
            section === activeSection ? 'border-blue-500 bg-blue-500/10 ring-1 ring-blue-500/30' : 'border-white/10 bg-white/5'
          )}
        >
          <div className="flex gap-3">
            <div className="flex-1 grid grid-cols-3 gap-2">
              {main.map((berth) => (
                <BerthButton
                  key={berth.number}
                  berth={berth}
                  selectedBy={selectedBerths.get(berth.number)}
                  activePassenger={activePassenger}
                  onSelect={() => onSelectBerth(berth)}
                />
              ))}
            </div>
            {side.length > 0 && (
              <div className="w-24 flex flex-col gap-2">
                {side.map((berth) => (
                  <BerthButton
                    key={berth.number}
                    berth={berth}
                    selectedBy={selectedBerths.get(berth.number)}
                    activePassenger={activePassenger}
                    onSelect={() => onSelectBerth(berth)}
                    compact
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function BerthButton({
  berth,
  selectedBy,
  activePassenger: _activePassenger,
  onSelect,
  compact,
}: {
  berth: Berth
  selectedBy?: number
  activePassenger: number
  onSelect: () => void
  compact?: boolean
}) {
  const isSelected = selectedBy !== undefined
  const isBooked = berth.status === 'booked'
  const isLadies = berth.status === 'ladies'

  return (
    <button
      type="button"
      disabled={isBooked}
      onClick={onSelect}
      className={cn(
        'rounded-lg border text-center transition-all',
        compact ? 'px-1 py-2' : 'px-2 py-2.5',
        isBooked && 'border-red-900/50 bg-red-950/40 text-red-400/60 cursor-not-allowed opacity-60',
        isLadies && !isSelected && 'border-pink-500/40 bg-pink-950/30 text-pink-300',
        !isBooked && !isSelected && 'border-white/20 bg-[#1e2433] text-white hover:border-blue-400 hover:bg-blue-500/20',
        isSelected && 'border-blue-400 bg-blue-500 text-white shadow-lg shadow-blue-500/30',
      )}
    >
      <div className={cn('font-bold', compact ? 'text-sm' : 'text-base')}>{berth.number}</div>
      <div className="text-[9px] uppercase tracking-wide opacity-80 leading-tight">
        {formatBerthLabel(berth.type)}
      </div>
      {isSelected && (
        <div className="text-[9px] mt-0.5 font-semibold">P{selectedBy! + 1}</div>
      )}
    </button>
  )
}
