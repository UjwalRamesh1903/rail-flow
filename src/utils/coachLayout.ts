import type { Berth, BerthStatus, BerthType, Coach } from '../data/ntesCoachData'
import { trainCompositions, defaultComposition } from '../data/ntesCoachData'

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function getBookedSeeds(coachId: string, total: number): Set<number> {
  const booked = new Set<number>()
  const seed = coachId.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const count = Math.floor(total * 0.42)
  for (let i = 0; i < count; i++) {
    booked.add(Math.floor(seededRandom(seed + i * 17) * total) + 1)
  }
  return booked
}

function status(num: number, booked: Set<number>): BerthStatus {
  return booked.has(num) ? 'booked' : 'available'
}

/** NTES-style AC 3 Tier — 64 berths */
export function generate3ACLayout(coachId: string): Berth[] {
  const berths: Berth[] = []
  const booked = getBookedSeeds(coachId, 64)
  let main = 1
  let side = 7

  for (let section = 1; section <= 8; section++) {
    berths.push(
      { number: main, type: 'LOWER', status: status(main, booked), section },
      { number: main + 1, type: 'MIDDLE', status: status(main + 1, booked), section },
      { number: main + 2, type: 'UPPER', status: status(main + 2, booked), section },
    )
    main += 3

    if (section % 2 === 1) {
      berths.push({ number: side, type: 'S.LOWER', status: status(side, booked), section })
      side++
    } else {
      berths.push({ number: side, type: 'S.UPPER', status: status(side, booked), section })
      side += 7
    }
  }
  return berths
}

export function generate2ALayout(coachId: string): Berth[] {
  const berths: Berth[] = []
  const booked = getBookedSeeds(coachId, 48)
  let num = 1
  for (let section = 1; section <= 12; section++) {
    berths.push(
      { number: num++, type: 'LOWER', status: status(num - 1, booked), section },
      { number: num++, type: 'UPPER', status: status(num - 1, booked), section },
      { number: num++, type: 'SIDE_LOWER', status: status(num - 1, booked), section },
      { number: num++, type: 'SIDE_UPPER', status: status(num - 1, booked), section },
    )
  }
  return berths
}

export function generateSleeperLayout(coachId: string): Berth[] {
  const berths: Berth[] = []
  const booked = getBookedSeeds(coachId, 72)
  let main = 1
  let side = 7
  for (let section = 1; section <= 9; section++) {
    berths.push(
      { number: main, type: 'LOWER', status: status(main, booked), section },
      { number: main + 1, type: 'MIDDLE', status: status(main + 1, booked), section },
      { number: main + 2, type: 'UPPER', status: status(main + 2, booked), section },
    )
    main += 3
    if (section % 2 === 1) {
      berths.push({ number: side, type: 'S.LOWER', status: status(side, booked), section })
      side++
    } else {
      berths.push({ number: side, type: 'S.UPPER', status: status(side, booked), section })
      side += 7
    }
  }
  return berths
}

export function generateChairLayout(coachId: string, count = 78): Berth[] {
  const booked = getBookedSeeds(coachId, count)
  return Array.from({ length: count }, (_, i) => ({
    number: i + 1,
    type: 'CHAIR' as BerthType,
    status: status(i + 1, booked),
    section: Math.floor(i / 6) + 1,
  }))
}

export function generateCoachBerths(coachId: string, classCode: string): Berth[] {
  switch (classCode) {
    case '3A': return generate3ACLayout(coachId)
    case '2A': return generate2ALayout(coachId)
    case 'SL': return generateSleeperLayout(coachId)
    case 'CC':
    case 'EC':
    case '2S': return generateChairLayout(coachId, classCode === 'EC' ? 56 : 78)
    case '1A': return generate2ALayout(coachId).slice(0, 24)
    default: return generate3ACLayout(coachId)
  }
}

export function formatBerthLabel(type: BerthType): string {
  const map: Record<string, string> = {
    LOWER: 'LOWER', MIDDLE: 'MIDDLE', UPPER: 'UPPER',
    'S.LOWER': 'S.LOWER', 'S.UPPER': 'S.UPPER',
    SIDE_LOWER: 'S.LOWER', SIDE_UPPER: 'S.UPPER',
    CABIN: 'CABIN', COUPE: 'COUPE', CHAIR: 'SEAT',
  }
  return map[type] || type
}

export function groupBerthsBySection(berths: Berth[]) {
  const sections = new Map<number, { main: Berth[]; side: Berth[] }>()
  for (const b of berths) {
    if (!sections.has(b.section)) sections.set(b.section, { main: [], side: [] })
    const s = sections.get(b.section)!
    if (['LOWER', 'MIDDLE', 'UPPER', 'CABIN', 'COUPE', 'CHAIR'].includes(b.type)) {
      s.main.push(b)
    } else {
      s.side.push(b)
    }
  }
  return Array.from(sections.entries()).sort(([a], [b]) => a - b)
}

export function buildCoachesForTrain(
  classCode: string,
  coaches: { id: string; classCode: string; className: string }[]
): Coach[] {
  const bookable = coaches.filter((c) => !['PC', 'GEN'].includes(c.classCode))
  const matching = bookable.filter((c) => c.classCode === classCode)
  const list = matching.length > 0 ? matching : bookable

  return list.map((c, i) => ({
    id: c.id,
    label: c.id,
    classCode: c.classCode,
    className: c.className,
    position: i + 1,
    berths: generateCoachBerths(c.id, c.classCode),
  }))
}

export function getTrainComposition(trainType: string) {
  return trainCompositions[trainType] || defaultComposition
}
