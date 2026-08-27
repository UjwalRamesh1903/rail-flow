import type { Train } from '../types'

const classTemplates = [
  { code: '1A', name: 'AC First Class', baseFare: 4500 },
  { code: '2A', name: 'AC 2 Tier', baseFare: 2800 },
  { code: '3A', name: 'AC 3 Tier', baseFare: 1850 },
  { code: 'CC', name: 'AC Chair Car', baseFare: 1200 },
  { code: 'EC', name: 'Executive Chair Car', baseFare: 2200 },
  { code: 'SL', name: 'Sleeper', baseFare: 650 },
  { code: '2S', name: 'Second Sitting', baseFare: 350 },
]

const availabilities = ['Available', 'RAC', 'Waitlist', 'Not Available'] as const

function makeClasses(multiplier: number) {
  return classTemplates.map((c, i) => ({
    code: c.code,
    name: c.name,
    fare: Math.round(c.baseFare * multiplier),
    availability: availabilities[i % 4] as (typeof availabilities)[number],
    seats: i % 4 === 0 ? Math.floor(Math.random() * 50) + 5 : undefined,
  }))
}

export const trains: Train[] = [
  {
    id: 't1', number: '12951', name: 'Mumbai Rajdhani Express', type: 'Rajdhani',
    from: 'New Delhi', fromCode: 'NDLS', to: 'Mumbai Central', toCode: 'MMCT',
    departure: '16:55', arrival: '08:35', duration: '15h 40m',
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: makeClasses(1.2),
  },
  {
    id: 't2', number: '12952', name: 'Mumbai Rajdhani Express', type: 'Rajdhani',
    from: 'Mumbai Central', fromCode: 'MMCT', to: 'New Delhi', toCode: 'NDLS',
    departure: '17:00', arrival: '08:35', duration: '15h 35m',
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: makeClasses(1.2),
  },
  {
    id: 't3', number: '12259', name: 'Sealdah Duronto Express', type: 'Duronto',
    from: 'New Delhi', fromCode: 'NDLS', to: 'Howrah Junction', toCode: 'HWH',
    departure: '11:00', arrival: '06:00', duration: '19h 00m',
    runningDays: ['Mon', 'Wed', 'Fri'],
    classes: makeClasses(1.0),
  },
  {
    id: 't4', number: '12260', name: 'Sealdah Duronto Express', type: 'Duronto',
    from: 'Howrah Junction', fromCode: 'HWH', to: 'New Delhi', toCode: 'NDLS',
    departure: '12:30', arrival: '07:30', duration: '19h 00m',
    runningDays: ['Tue', 'Thu', 'Sat'],
    classes: makeClasses(1.0),
  },
  {
    id: 't5', number: '12009', name: 'Shatabdi Express', type: 'Shatabdi',
    from: 'New Delhi', fromCode: 'NDLS', to: 'Bhopal Junction', toCode: 'BPL',
    departure: '06:00', arrival: '14:25', duration: '8h 25m',
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: makeClasses(0.9).filter((c) => ['CC', 'EC', '2S'].includes(c.code)),
  },
  {
    id: 't6', number: '12627', name: 'Karnataka Express', type: 'Superfast',
    from: 'New Delhi', fromCode: 'NDLS', to: 'Bangalore City Junction', toCode: 'SBC',
    departure: '20:20', arrival: '06:40', duration: '34h 20m',
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: makeClasses(1.1),
  },
  {
    id: 't7', number: '12649', name: 'Mysore Express', type: 'Superfast',
    from: 'New Delhi', fromCode: 'NDLS', to: 'Mysore Junction', toCode: 'MYS',
    departure: '14:15', arrival: '04:30', duration: '38h 15m',
    runningDays: ['Mon', 'Wed', 'Fri'],
    classes: makeClasses(1.05),
  },
  {
    id: 't8', number: '12432', name: 'Rajdhani Express', type: 'Rajdhani',
    from: 'New Delhi', fromCode: 'NDLS', to: 'Thiruvananthapuram Central', toCode: 'TVC',
    departure: '11:00', arrival: '05:00', duration: '42h 00m',
    runningDays: ['Wed', 'Fri', 'Sun'],
    classes: makeClasses(1.3),
  },
  {
    id: 't9', number: '12269', name: 'Chennai Central Duronto', type: 'Duronto',
    from: 'New Delhi', fromCode: 'NDLS', to: 'Chennai Central', toCode: 'MAS',
    departure: '15:55', arrival: '20:45', duration: '28h 50m',
    runningDays: ['Mon', 'Thu'],
    classes: makeClasses(1.15),
  },
  {
    id: 't10', number: '12270', name: 'Chennai Central Duronto', type: 'Duronto',
    from: 'Chennai Central', fromCode: 'MAS', to: 'New Delhi', toCode: 'NDLS',
    departure: '16:00', arrival: '21:00', duration: '29h 00m',
    runningDays: ['Tue', 'Fri'],
    classes: makeClasses(1.15),
  },
  {
    id: 't11', number: '12953', name: 'Bandra Terminus Garib Rath', type: 'Garib Rath',
    from: 'New Delhi', fromCode: 'NDLS', to: 'Bandra Terminus', toCode: 'BDTS',
    departure: '20:30', arrival: '16:45', duration: '20h 15m',
    runningDays: ['Mon', 'Wed', 'Fri', 'Sun'],
    classes: makeClasses(0.7).filter((c) => ['3A', 'CC'].includes(c.code)),
  },
  {
    id: 't12', number: '12424', name: 'Rajdhani Express', type: 'Rajdhani',
    from: 'New Delhi', fromCode: 'NDLS', to: 'Dibrugarh', toCode: 'DBRG',
    departure: '16:10', arrival: '07:00', duration: '38h 50m',
    runningDays: ['Tue', 'Sat'],
    classes: makeClasses(1.25),
  },
  {
    id: 't13', number: '12301', name: 'Howrah Rajdhani Express', type: 'Rajdhani',
    from: 'New Delhi', fromCode: 'NDLS', to: 'Howrah Junction', toCode: 'HWH',
    departure: '16:55', arrival: '10:00', duration: '17h 05m',
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: makeClasses(1.18),
  },
  {
    id: 't14', number: '12302', name: 'Howrah Rajdhani Express', type: 'Rajdhani',
    from: 'Howrah Junction', fromCode: 'HWH', to: 'New Delhi', toCode: 'NDLS',
    departure: '16:50', arrival: '10:00', duration: '17h 10m',
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: makeClasses(1.18),
  },
  {
    id: 't15', number: '12621', name: 'Tamil Nadu Express', type: 'Superfast',
    from: 'New Delhi', fromCode: 'NDLS', to: 'Chennai Central', toCode: 'MAS',
    departure: '22:30', arrival: '05:00', duration: '30h 30m',
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: makeClasses(1.0),
  },
  {
    id: 't16', number: '12622', name: 'Tamil Nadu Express', type: 'Superfast',
    from: 'Chennai Central', fromCode: 'MAS', to: 'New Delhi', toCode: 'NDLS',
    departure: '22:00', arrival: '04:30', duration: '30h 30m',
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: makeClasses(1.0),
  },
  {
    id: 't17', number: '12213', name: 'Yuva Express', type: 'Yuva',
    from: 'New Delhi', fromCode: 'NDLS', to: 'Howrah Junction', toCode: 'HWH',
    departure: '18:00', arrival: '10:30', duration: '16h 30m',
    runningDays: ['Sat'],
    classes: makeClasses(0.85),
  },
  {
    id: 't18', number: '12431', name: 'Rajdhani Express', type: 'Rajdhani',
    from: 'New Delhi', fromCode: 'NDLS', to: 'Thiruvananthapuram Central', toCode: 'TVC',
    departure: '11:00', arrival: '05:00', duration: '42h 00m',
    runningDays: ['Mon', 'Thu'],
    classes: makeClasses(1.3),
  },
  {
    id: 't19', number: '12951', name: 'Mumbai Rajdhani Express', type: 'Rajdhani',
    from: 'New Delhi', fromCode: 'NDLS', to: 'Mumbai Central', toCode: 'MMCT',
    departure: '16:55', arrival: '08:35', duration: '15h 40m',
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: makeClasses(1.2),
  },
  {
    id: 't20', number: '22691', name: 'Rajdhani Express', type: 'Rajdhani',
    from: 'New Delhi', fromCode: 'NDLS', to: 'Bangalore City Junction', toCode: 'SBC',
    departure: '20:50', arrival: '06:40', duration: '33h 50m',
    runningDays: ['Mon', 'Wed', 'Fri'],
    classes: makeClasses(1.22),
  },
]

export function getTrainsForRoute(fromCode: string, toCode: string): Train[] {
  const direct = trains.filter(
    (t) => t.fromCode === fromCode && t.toCode === toCode
  )
  if (direct.length > 0) return direct

  // Return generic trains for any route
  const routeTrains: Train[] = []
  const types = ['Rajdhani', 'Duronto', 'Shatabdi', 'Superfast', 'Express', 'Mail']
  const names = [
    'Express Special', 'Superfast Express', 'SF Express',
    'Intercity Express', 'Garib Rath', 'Jan Shatabdi',
  ]

  for (let i = 0; i < 12; i++) {
    const depHour = 5 + Math.floor(i * 1.5)
    const depMin = (i * 17) % 60
    const durationH = 8 + (i % 20)
    const arrHour = (depHour + durationH) % 24
    const arrMin = (depMin + 25) % 60

    routeTrains.push({
      id: `gen-${fromCode}-${toCode}-${i}`,
      number: String(12000 + i * 111 + Math.floor(Math.random() * 50)),
      name: `${fromCode} ${names[i % names.length]}`,
      type: types[i % types.length],
      from: fromCode,
      fromCode,
      to: toCode,
      toCode,
      departure: `${String(depHour).padStart(2, '0')}:${String(depMin).padStart(2, '0')}`,
      arrival: `${String(arrHour).padStart(2, '0')}:${String(arrMin).padStart(2, '0')}`,
      duration: `${durationH}h ${25 + (i % 35)}m`,
      runningDays: i % 3 === 0
        ? ['Mon', 'Wed', 'Fri', 'Sun']
        : i % 3 === 1
          ? ['Tue', 'Thu', 'Sat']
          : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      classes: makeClasses(0.8 + (i % 5) * 0.1),
    })
  }

  return routeTrains
}
