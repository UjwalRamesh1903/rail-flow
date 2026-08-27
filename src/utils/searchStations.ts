import type { Station } from '../types'
import stationsData from '../data/stations.json'

export const stations: Station[] = stationsData as Station[]

export function searchStations(query: string, limit = 50): Station[] {
  const q = query.trim().toLowerCase()
  if (!q) return stations.slice(0, limit)

  return stations
    .filter((station) => {
      const nameMatch = station.name.toLowerCase().includes(q)
      const codeMatch = station.code.toLowerCase().includes(q)
      const cityMatch = station.city.toLowerCase().includes(q)
      const stateMatch = station.state.toLowerCase().includes(q)
      const aliasMatch = station.aliases?.some((a) => a.toLowerCase().includes(q))
      return nameMatch || codeMatch || cityMatch || stateMatch || aliasMatch
    })
    .slice(0, limit)
}

export function getStationByCode(code: string): Station | undefined {
  return stations.find((s) => s.code.toLowerCase() === code.toLowerCase())
}
