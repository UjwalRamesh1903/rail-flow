import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react'
import type {
  BookingSearch,
  Station,
  SelectedTrain,
  Passenger,
  Booking,
  PaymentRecord,
} from '../types'
import type { SeatAssignment, BookingExtras } from '../data/ntesCoachData'
import { getStationByCode } from '../utils/searchStations'
import { generatePNR } from '../utils/formatDate'
import { seedBookingsByEmail, seedPaymentsByEmail } from '../data/userBookings'
import { addDays, startOfDay } from 'date-fns'

interface BookingContextType {
  search: BookingSearch
  setFrom: (station: Station) => void
  setTo: (station: Station) => void
  swapStations: () => void
  setDate: (date: Date) => void
  setTravelClass: (cls: string) => void
  setPassengers: (adults: number, children: number) => void
  selectedTrain: SelectedTrain | null
  setSelectedTrain: (train: SelectedTrain) => void
  passengers: Passenger[]
  setPassengerDetails: (passengers: Passenger[]) => void
  bookingExtras: BookingExtras
  setBookingExtras: (extras: BookingExtras) => void
  seatAssignments: SeatAssignment[]
  setSeatAssignments: (assignments: SeatAssignment[]) => void
  lastBooking: Booking | null
  confirmBooking: (userEmail: string, paymentMethod: string) => Booking
  resetBooking: () => void
  getUserBookings: (email: string) => Booking[]
  getPaymentHistory: (email: string) => PaymentRecord[]
  cancelledBookings: string[]
  cancelBooking: (bookingId: string, email: string) => void
}

const defaultSearch: BookingSearch = {
  from: getStationByCode('NDLS') ?? null,
  to: getStationByCode('MMCT') ?? null,
  date: addDays(startOfDay(new Date()), 7),
  travelClass: 'ALL',
  adults: 1,
  children: 0,
}

const defaultExtras: BookingExtras = {
  email: '',
  mobile: '',
  idProofType: 'Aadhaar',
  travelInsurance: false,
  autoUpgrade: false,
  confirmBerths: true,
  boardingStation: '',
  reservationUpto: '',
}

function loadUserData<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function bookingsKey(email: string) {
  return `irctc-bookings-${email}`
}

function paymentsKey(email: string) {
  return `irctc-payments-${email}`
}

const BookingContext = createContext<BookingContextType | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState<BookingSearch>(defaultSearch)
  const [selectedTrain, setSelectedTrain] = useState<SelectedTrain | null>(null)
  const [passengers, setPassengers] = useState<Passenger[]>([])
  const [bookingExtras, setBookingExtras] = useState<BookingExtras>(defaultExtras)
  const [seatAssignments, setSeatAssignments] = useState<SeatAssignment[]>([])
  const [lastBooking, setLastBooking] = useState<Booking | null>(null)
  const [cancelledBookings, setCancelledBookings] = useState<string[]>(
    () => loadUserData('irctc-cancelled', [])
  )

  const setFrom = useCallback((station: Station) => {
    setSearch((prev) => ({ ...prev, from: station }))
  }, [])

  const setTo = useCallback((station: Station) => {
    setSearch((prev) => ({ ...prev, to: station }))
  }, [])

  const swapStations = useCallback(() => {
    setSearch((prev) => ({ ...prev, from: prev.to, to: prev.from }))
  }, [])

  const setDate = useCallback((date: Date) => {
    setSearch((prev) => ({ ...prev, date }))
  }, [])

  const setTravelClass = useCallback((travelClass: string) => {
    setSearch((prev) => ({ ...prev, travelClass }))
  }, [])

  const setPassengersCount = useCallback((adults: number, children: number) => {
    setSearch((prev) => ({ ...prev, adults, children }))
  }, [])

  const setPassengerDetails = useCallback((p: Passenger[]) => {
    setPassengers(p)
  }, [])

  const getUserBookings = useCallback((email: string): Booking[] => {
    const stored = loadUserData<Booking[]>(bookingsKey(email), [])
    const seeded = seedBookingsByEmail[email] ?? []
    const merged = [...stored, ...seeded]
    return merged.filter(
      (b, i, arr) => arr.findIndex((x) => x.id === b.id) === i && !cancelledBookings.includes(b.id)
    )
  }, [cancelledBookings])

  const getPaymentHistory = useCallback((email: string): PaymentRecord[] => {
    const stored = loadUserData<PaymentRecord[]>(paymentsKey(email), [])
    const seeded = seedPaymentsByEmail[email] ?? []
    const merged = [...stored, ...seeded]
    return merged.sort((a, b) => b.date.localeCompare(a.date)).filter(
      (p, i, arr) => arr.findIndex((x) => x.paymentId === p.paymentId) === i
    )
  }, [])

  const confirmBooking = useCallback((userEmail: string, paymentMethod: string): Booking => {
    const pnr = generatePNR()
    const paymentId = `PAY${Date.now().toString().slice(-8)}`
    const passengersWithBerths = passengers.map((p, i) => {
      const seat = seatAssignments.find((s) => s.passengerIndex === i)
      return {
        ...p,
        age: typeof p.age === 'number' ? p.age : 0,
        coach: seat?.coachLabel,
        berthNumber: seat?.berthNumber,
        berthType: seat?.berthType,
        berth: seat ? `${seat.coachLabel} - ${seat.berthNumber} (${seat.berthType})` : undefined,
      }
    })
    const insuranceFee = bookingExtras.travelInsurance ? 0.45 * passengers.length : 0
    const fare = selectedTrain!.selectedClass.fare * passengers.length + Math.round(insuranceFee)
    const bookedOn = new Date().toISOString().split('T')[0]
    const journeyDate = search.date!.toISOString().split('T')[0]

    const booking: Booking = {
      id: `bk-${Date.now()}`,
      pnr,
      trainNumber: selectedTrain!.train.number,
      trainName: selectedTrain!.train.name,
      from: search.from!.name,
      fromCode: search.from!.code,
      to: search.to!.name,
      toCode: search.to!.code,
      date: journeyDate,
      departure: selectedTrain!.train.departure,
      arrival: selectedTrain!.train.arrival,
      class: selectedTrain!.selectedClass.name,
      passengers: passengersWithBerths,
      status: 'Confirmed',
      fare,
      bookedOn,
      userEmail,
      paymentId,
    }

    const payment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      paymentId,
      bookingId: booking.id,
      pnr,
      trainNumber: booking.trainNumber,
      trainName: booking.trainName,
      amount: fare,
      method: paymentMethod,
      status: 'Success',
      date: bookedOn,
      from: booking.from,
      to: booking.to,
      journeyDate,
    }

    const existingBookings = loadUserData<Booking[]>(bookingsKey(userEmail), [])
    const existingPayments = loadUserData<PaymentRecord[]>(paymentsKey(userEmail), [])
    localStorage.setItem(bookingsKey(userEmail), JSON.stringify([booking, ...existingBookings]))
    localStorage.setItem(paymentsKey(userEmail), JSON.stringify([payment, ...existingPayments]))

    setLastBooking(booking)
    return booking
  }, [selectedTrain, search, passengers, seatAssignments, bookingExtras])

  const resetBooking = useCallback(() => {
    setSelectedTrain(null)
    setPassengers([])
    setSeatAssignments([])
    setBookingExtras(defaultExtras)
  }, [])

  const cancelBooking = useCallback((bookingId: string, _email: string) => {
    setCancelledBookings((prev) => {
      const next = [...prev, bookingId]
      localStorage.setItem('irctc-cancelled', JSON.stringify(next))
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      search,
      setFrom,
      setTo,
      swapStations,
      setDate,
      setTravelClass,
      setPassengers: setPassengersCount,
      selectedTrain,
      setSelectedTrain,
      passengers,
      setPassengerDetails,
      bookingExtras,
      setBookingExtras,
      seatAssignments,
      setSeatAssignments,
      lastBooking,
      confirmBooking,
      resetBooking,
      getUserBookings,
      getPaymentHistory,
      cancelledBookings,
      cancelBooking,
    }),
    [
      search, setFrom, setTo, swapStations, setDate, setTravelClass, setPassengersCount,
      selectedTrain, passengers, setPassengerDetails, bookingExtras, seatAssignments,
      lastBooking, confirmBooking, resetBooking, getUserBookings, getPaymentHistory,
      cancelledBookings, cancelBooking,
    ]
  )

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
