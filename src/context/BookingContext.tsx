import { useState, useCallback, type ReactNode } from 'react'
import type {
  BookingSearch,
  Station,
  SelectedTrain,
  Passenger,
  Booking,
} from '../types'
import type { SeatAssignment, BookingExtras } from '../data/ntesCoachData'
import { getStationByCode } from '../utils/searchStations'
import { generatePNR } from '../utils/formatDate'
import { addDays, startOfDay } from 'date-fns'

import { BookingContext, type BookingContextType } from './BookingContextValue'
const defaultSearch: BookingSearch = {
  from: getStationByCode('NDLS') ?? null,
  to: getStationByCode('MMCT') ?? null,
  date: addDays(startOfDay(new Date()), 7),
  travelClass: 'ALL',
  adults: 1,
  children: 0,
}

const STORAGE_KEYS = {
  lastBooking: 'irctc-last-booking',
  bookingHistory: 'irctc-booking-history',
  walletBalance: 'irctc-wallet-balance',
  walletTransactions: 'irctc-wallet-transactions',
  cancelledBookings: 'irctc-cancelled-bookings',
}

function readStored<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) as T : fallback
  } catch {
    return fallback
  }
}

function todayIso() {
  return new Date().toISOString().split('T')[0]
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

export function BookingProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState<BookingSearch>(defaultSearch)
  const [selectedTrain, setSelectedTrain] = useState<SelectedTrain | null>(null)
  const [passengers, setPassengers] = useState<Passenger[]>([])
  const [bookingExtras, setBookingExtras] = useState<BookingExtras>(defaultExtras)
  const [seatAssignments, setSeatAssignments] = useState<SeatAssignment[]>([])
  const [lastBooking, setLastBooking] = useState<Booking | null>(() => readStored(STORAGE_KEYS.lastBooking, null))
  const [bookingHistory, setBookingHistory] = useState<Booking[]>(() => readStored(STORAGE_KEYS.bookingHistory, []))
  const [walletBalance, setWalletBalance] = useState(() => readStored(STORAGE_KEYS.walletBalance, 2500))
  const [walletTransactions, setWalletTransactions] = useState<BookingContextType['walletTransactions']>(() => readStored(STORAGE_KEYS.walletTransactions, [
    { id: 'wt1', type: 'credit', amount: 5000, description: 'Wallet top-up via UPI', date: '2025-05-01' },
    { id: 'wt2', type: 'debit', amount: 1850, description: 'Ticket booking - 12951', date: '2025-05-15' },
    { id: 'wt3', type: 'debit', amount: 650, description: 'Ticket booking - 12627', date: '2025-06-02' },
  ]))
  const [cancelledBookings, setCancelledBookings] = useState<string[]>(() => readStored(STORAGE_KEYS.cancelledBookings, []))

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

  const confirmBooking = useCallback((): Booking => {
    const pnr = generatePNR()
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
    const booking: Booking = {
      id: `bk-${Date.now()}`,
      pnr,
      trainNumber: selectedTrain!.train.number,
      trainName: selectedTrain!.train.name,
      from: search.from!.name,
      fromCode: search.from!.code,
      to: search.to!.name,
      toCode: search.to!.code,
      date: search.date!.toISOString().split('T')[0],
      departure: selectedTrain!.train.departure,
      arrival: selectedTrain!.train.arrival,
      class: selectedTrain!.selectedClass.name,
      passengers: passengersWithBerths,
      status: 'Confirmed',
      fare: selectedTrain!.selectedClass.fare * passengers.length + Math.round(insuranceFee),
      bookedOn: todayIso(),
      paymentStatus: 'Paid',
      coachPosition: `Coach ${1 + (passengers.length % 8)} from engine`,
      platform: String(1 + (Number(selectedTrain!.train.number.slice(-1)) % 8)),
      delayMinutes: Number(selectedTrain!.train.number.slice(-1)) % 3 === 0 ? 12 : 0,
    }
    setLastBooking(booking)
    localStorage.setItem(STORAGE_KEYS.lastBooking, JSON.stringify(booking))
    setBookingHistory((prev) => {
      const next = [booking, ...prev.filter((b) => b.pnr !== booking.pnr)].slice(0, 20)
      localStorage.setItem(STORAGE_KEYS.bookingHistory, JSON.stringify(next))
      return next
    })
    return booking
  }, [selectedTrain, search, passengers, seatAssignments, bookingExtras])

  const resetBooking = useCallback(() => {
    setSelectedTrain(null)
    setPassengers([])
    setSeatAssignments([])
    setBookingExtras(defaultExtras)
  }, [])

  const addWalletMoney = useCallback((amount: number) => {
    setWalletBalance((prev) => {
      const next = prev + amount
      localStorage.setItem(STORAGE_KEYS.walletBalance, JSON.stringify(next))
      return next
    })
    setWalletTransactions((prev) => {
      const next = [
        { id: `wt-${Date.now()}`, type: 'credit' as const, amount, description: 'Wallet top-up', date: todayIso() },
        ...prev,
      ]
      localStorage.setItem(STORAGE_KEYS.walletTransactions, JSON.stringify(next))
      return next
    })
  }, [])

  const deductWallet = useCallback((amount: number) => {
    if (walletBalance < amount) return false
    setWalletBalance((prev) => {
      const next = prev - amount
      localStorage.setItem(STORAGE_KEYS.walletBalance, JSON.stringify(next))
      return next
    })
    setWalletTransactions((prev) => {
      const next = [
        { id: `wt-${Date.now()}`, type: 'debit' as const, amount, description: 'Ticket payment', date: todayIso() },
        ...prev,
      ]
      localStorage.setItem(STORAGE_KEYS.walletTransactions, JSON.stringify(next))
      return next
    })
    return true
  }, [walletBalance])

  const cancelBooking = useCallback((bookingId: string) => {
    setCancelledBookings((prev) => {
      const next = [...new Set([...prev, bookingId])]
      localStorage.setItem(STORAGE_KEYS.cancelledBookings, JSON.stringify(next))
      return next
    })
  }, [])

  return (
    <BookingContext.Provider
      value={{
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
        bookingHistory,
        confirmBooking,
        resetBooking,
        walletBalance,
        addWalletMoney,
        deductWallet,
        walletTransactions,
        cancelledBookings,
        cancelBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}
