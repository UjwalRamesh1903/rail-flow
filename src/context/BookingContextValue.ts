import { createContext } from 'react'
import type { BookingSearch, Station, SelectedTrain, Passenger, Booking } from '../types'
import type { SeatAssignment, BookingExtras } from '../data/ntesCoachData'

export interface BookingContextType {
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
  bookingHistory: Booking[]
  confirmBooking: () => Booking
  resetBooking: () => void
  walletBalance: number
  addWalletMoney: (amount: number) => void
  deductWallet: (amount: number) => boolean
  walletTransactions: { id: string; type: 'credit' | 'debit'; amount: number; description: string; date: string }[]
  cancelledBookings: string[]
  cancelBooking: (bookingId: string) => void
}

export const BookingContext = createContext<BookingContextType | null>(null)
