import { useMemo, memo } from 'react'
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
  const is2A = coach.classCode === '2A' || coach.classCode === '1A'

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

  const activeBay = sections.find(([section]) => section === activeSection)

  if (!activeBay) {
    return <div className="p-8 text-center text-gray-400 text-sm">No berths in this section.</div>
  }

  const [, { main, side }] = activeBay

  if (is2A) {
    return (
      <div className="p-4">
        <div className="relative rounded-xl border border-white/15 bg-[#141820] p-4">
          <div className="absolute left-2 top-6 bottom-6 w-2 border-l-2 border-t-2 border-b-2 border-white/20 rounded-l-md pointer-events-none" />
          <div className="absolute right-2 top-6 bottom-6 w-2 border-r-2 border-t-2 border-b-2 border-white/20 rounded-r-md pointer-events-none" />
          <div className="flex gap-4 px-4">
            <div className="flex-1 grid grid-cols-2 gap-2">
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
            <div className="w-3 shrink-0 flex items-center justify-center">
              <div className="w-px h-full bg-white/10" />
            </div>
            <div className="w-[88px] shrink-0 flex flex-col justify-between gap-3 py-1">
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
          </div>
        </div>
      </div>
    )
  }

  const row1 = main.slice(0, 3)
  const row2 = main.slice(3, 6)

  return (
    <div className="p-4">
      <BayLayout
        row1={row1}
        row2={row2}
        side={side}
        selectedBerths={selectedBerths}
        activePassenger={activePassenger}
        onSelectBerth={onSelectBerth}
        cols={3}
      />
    </div>
  )
}

function BayLayout({
  row1,
  row2,
  side,
  selectedBerths,
  activePassenger,
  onSelectBerth,
  cols,
}: {
  row1: Berth[]
  row2: Berth[]
  side: Berth[]
  selectedBerths: Map<number, number>
  activePassenger: number
  onSelectBerth: (berth: Berth) => void
  cols: 2 | 3
}) {
  return (
    <div className="relative rounded-xl border border-white/15 bg-[#141820] p-4">
      {/* NTES-style bay brackets */}
      <div className="absolute left-2 top-6 bottom-6 w-2 border-l-2 border-t-2 border-b-2 border-white/20 rounded-l-md pointer-events-none" />
      <div className="absolute right-2 top-6 bottom-6 w-2 border-r-2 border-t-2 border-b-2 border-white/20 rounded-r-md pointer-events-none" />

      <div className="flex gap-4 px-4">
        {/* Main compartment — 2 rows facing each other */}
        <div className="flex-1 space-y-3">
          <div className={cn('grid gap-2', cols === 3 ? 'grid-cols-3' : 'grid-cols-2')}>
            {row1.map((berth) => (
              <BerthButton
                key={berth.number}
                berth={berth}
                selectedBy={selectedBerths.get(berth.number)}
                activePassenger={activePassenger}
                onSelect={() => onSelectBerth(berth)}
              />
            ))}
          </div>
          <div className="h-px bg-white/10 mx-1" aria-hidden="true" />
          <div className={cn('grid gap-2', cols === 3 ? 'grid-cols-3' : 'grid-cols-2')}>
            {row2.map((berth) => (
              <BerthButton
                key={berth.number}
                berth={berth}
                selectedBy={selectedBerths.get(berth.number)}
                activePassenger={activePassenger}
                onSelect={() => onSelectBerth(berth)}
              />
            ))}
          </div>
        </div>

        {/* Aisle */}
        <div className="w-3 shrink-0 flex items-center justify-center">
          <div className="w-px h-full bg-white/10" />
        </div>

        {/* Side berths */}
        <div className="w-[88px] shrink-0 flex flex-col justify-between gap-3 py-1">
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
      </div>
    </div>
  )
}

const BerthButton = memo(function BerthButton({
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
        'rounded-lg border text-center transition-colors w-full',
        compact ? 'px-1 py-3 min-h-[72px]' : 'px-2 py-3 min-h-[68px]',
        isBooked && 'border-red-900/50 bg-red-950/40 text-red-400/60 cursor-not-allowed opacity-60',
        isLadies && !isSelected && 'border-pink-500/40 bg-pink-950/30 text-pink-300',
        !isBooked && !isSelected && 'border-white/20 bg-[#1e2433] text-white hover:border-blue-400 hover:bg-blue-500/20',
        isSelected && 'border-blue-400 bg-blue-500 text-white shadow-lg shadow-blue-500/30',
      )}
    >
      <div className={cn('font-bold leading-none', compact ? 'text-lg' : 'text-xl')}>{berth.number}</div>
      <div className="text-[9px] uppercase tracking-wide opacity-80 leading-tight mt-1">
        {formatBerthLabel(berth.type)}
      </div>
      {isSelected && (
        <div className="text-[9px] mt-1 font-semibold">P{selectedBy! + 1}</div>
      )}
    </button>
  )
})
