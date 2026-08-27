import type { TDRReason } from '../types'

export const tdrReasons: TDRReason[] = [
  { id: '1', label: 'Train cancelled by Railways' },
  { id: '2', label: 'Train diverted and not touching boarding station' },
  { id: '3', label: 'Train diverted and not touching destination station' },
  { id: '4', label: 'Train terminated short of destination' },
  { id: '5', label: 'Passenger not travelled due to illness' },
  { id: '6', label: 'Passenger not travelled due to death in family' },
  { id: '7', label: 'AC failure in train' },
  { id: '8', label: 'Difference in fare' },
  { id: '9', label: 'Party partially travelled' },
  { id: '10', label: 'Other valid reason' },
]
