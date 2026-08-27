import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type {
  BookingSearch,
  Station,
  SelectedTrain,
  Passenger,
  Booking,
} from '../types'
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
  date: new Date(2025, 4, 22),
  travelClass: 'ALL',
  adults: 1,
  children: 0,
}

const BookingContext = createContext<BookingContextType | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState<BookingSearch>(defaultSearch)
  const [selectedTrain, setSelectedTrain] = useState<SelectedTrain | null>(null)
  const [passengers, setPassengers] = useState<Passenger[]>([])
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
      passengers,
      status: 'Confirmed',
      fare: selectedTrain!.selectedClass.fare * (search.adults + search.children),
      bookedOn: new Date().toISOString().split('T')[0],
    }
    setLastBooking(booking)
    return booking
  }, [selectedTrain, search, passengers])

  const resetBooking = useCallback(() => {
    setSelectedTrain(null)
    setPassengers([])
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
        lastBooking,
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

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
