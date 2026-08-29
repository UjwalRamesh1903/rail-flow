import { trains } from './trains'
import { getBookingByPNR } from './bookings'

export interface TrainTrackingInfo {
  trainNumber: string
  trainName: string
  from: string
  to: string
  currentStation: string
  nextStation: string
  status: 'On Time' | 'Delayed' | 'Arrived' | 'Departed'
  delayMinutes: number
  speed: number
  distanceCovered: string
  distanceTotal: string
  lastUpdated: string
  progressPercent: number
  route: string[]
  currentIndex: number
}

const trackingRoutes: Record<string, string[]> = {
  '12951': ['New Delhi', 'Mathura Jn', 'Kota Jn', 'Vadodara Jn', 'Surat', 'Borivali', 'Mumbai Central'],
  '12002': ['New Delhi', 'Agra Cantt', 'Gwalior', 'Jhansi', 'Bhopal Jn'],
  '12627': ['New Delhi', 'Agra Cantt', 'Bhopal Jn', 'Nagpur', 'Secunderabad', 'Bangalore City'],
  '12259': ['New Delhi', 'Kanpur Central', 'Allahabad Jn', 'Mughal Sarai', 'Patna', 'Howrah Jn'],
  '12301': ['New Delhi', 'Kanpur Central', 'Allahabad Jn', 'Mughal Sarai', 'Gaya', 'Howrah Jn'],
}

function seededIndex(seed: string, max: number) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 10000
  return h % max
}

function buildTracking(trainNumber: string, trainName: string, from: string, to: string): TrainTrackingInfo {
  const route = trackingRoutes[trainNumber] || [from, 'Junction A', 'Junction B', 'Junction C', to]
  const idx = Math.min(seededIndex(trainNumber, route.length - 1), route.length - 2)
  const delay = seededIndex(trainNumber + 'd', 5) === 0 ? seededIndex(trainNumber, 45) + 5 : 0
  const progress = Math.round(((idx + 0.6) / (route.length - 1)) * 100)

  return {
    trainNumber,
    trainName,
    from: route[0],
    to: route[route.length - 1],
    currentStation: route[idx],
    nextStation: route[idx + 1],
    status: delay > 15 ? 'Delayed' : idx === route.length - 2 ? 'Arrived' : 'On Time',
    delayMinutes: delay,
    speed: 72 + seededIndex(trainNumber + 's', 40),
    distanceCovered: `${320 + idx * 180} km`,
    distanceTotal: `${320 + (route.length - 1) * 180} km`,
    lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    progressPercent: progress,
    route,
    currentIndex: idx,
  }
}

export function trackByTrainNumber(trainNumber: string): TrainTrackingInfo | null {
  const normalized = trainNumber.trim().replace(/\s/g, '')
  const train = trains.find((t) => t.number === normalized)
  if (!train) return null
  return buildTracking(train.number, train.name, train.from, train.to)
}

export function trackByPNR(pnr: string): TrainTrackingInfo | null {
  const booking = getBookingByPNR(pnr.trim())
  if (!booking) {
    const train = trains.find((t) => seededIndex(pnr, trains.length) === trains.indexOf(t))
    if (!train) return null
    return buildTracking(train.number, train.name, train.from, train.to)
  }
  return buildTracking(booking.trainNumber, booking.trainName, booking.from, booking.to)
}
