import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react'
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
  confirmBooking: () => Booking
  resetBooking: () => void
  walletBalance: number
  addWalletMoney: (amount: number) => void
  deductWallet: (amount: number) => boolean
  walletTransactions: { id: string; type: 'credit' | 'debit'; amount: number; description: string; date: string }[]
  cancelledBookings: string[]
  cancelBooking: (bookingId: string) => void
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

const BookingContext = createContext<BookingContextType | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState<BookingSearch>(defaultSearch)
  const [selectedTrain, setSelectedTrain] = useState<SelectedTrain | null>(null)
  const [passengers, setPassengers] = useState<Passenger[]>([])
  const [bookingExtras, setBookingExtras] = useState<BookingExtras>(defaultExtras)
  const [seatAssignments, setSeatAssignments] = useState<SeatAssignment[]>([])
  const [lastBooking, setLastBooking] = useState<Booking | null>(null)
  const [walletBalance, setWalletBalance] = useState(2500)
  const [walletTransactions, setWalletTransactions] = useState<BookingContextType['walletTransactions']>([
    { id: 'wt1', type: 'credit', amount: 5000, description: 'Wallet top-up via UPI', date: '2025-05-01' },
    { id: 'wt2', type: 'debit', amount: 1850, description: 'Ticket booking - 12951', date: '2025-05-15' },
    { id: 'wt3', type: 'debit', amount: 650, description: 'Ticket booking - 12627', date: '2025-06-02' },
  ])
  const [cancelledBookings, setCancelledBookings] = useState<string[]>([])

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
      bookedOn: new Date().toISOString().split('T')[0],
    }
    setLastBooking(booking)
    return booking
  }, [selectedTrain, search, passengers, seatAssignments, bookingExtras])

  const resetBooking = useCallback(() => {
    setSelectedTrain(null)
    setPassengers([])
    setSeatAssignments([])
    setBookingExtras(defaultExtras)
  }, [])

  const addWalletMoney = useCallback((amount: number) => {
    setWalletBalance((prev) => prev + amount)
    setWalletTransactions((prev) => [
      { id: `wt-${Date.now()}`, type: 'credit', amount, description: 'Wallet top-up', date: new Date().toISOString().split('T')[0] },
      ...prev,
    ])
  }, [])

  const deductWallet = useCallback((amount: number) => {
    if (walletBalance < amount) return false
    setWalletBalance((prev) => prev - amount)
    setWalletTransactions((prev) => [
      { id: `wt-${Date.now()}`, type: 'debit', amount, description: 'Ticket payment', date: new Date().toISOString().split('T')[0] },
      ...prev,
    ])
    return true
  }, [walletBalance])

  const cancelBooking = useCallback((bookingId: string) => {
    setCancelledBookings((prev) => [...prev, bookingId])
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
      walletBalance,
      addWalletMoney,
      deductWallet,
      walletTransactions,
      cancelledBookings,
      cancelBooking,
    }),
    [
      search, setFrom, setTo, swapStations, setDate, setTravelClass, setPassengersCount,
      selectedTrain, passengers, setPassengerDetails, bookingExtras, seatAssignments,
      lastBooking, confirmBooking, resetBooking, walletBalance, addWalletMoney,
      deductWallet, walletTransactions, cancelledBookings, cancelBooking,
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
