export interface Station {
  name: string
  code: string
  city: string
  state: string
  aliases?: string[]
}

export interface TrainClass {
  code: string
  name: string
  fare: number
  availability: 'Available' | 'RAC' | 'Waitlist' | 'Not Available'
  seats?: number
}

export interface Train {
  id: string
  number: string
  name: string
  type: string
  from: string
  fromCode: string
  to: string
  toCode: string
  departure: string
  arrival: string
  duration: string
  runningDays: string[]
  classes: TrainClass[]
}

export interface Passenger {
  name: string
  age: number | ''
  gender: 'Male' | 'Female' | 'Transgender'
  berth?: string
  coach?: string
  berthNumber?: number
  berthType?: string
}

export interface BookingSearch {
  from: Station | null
  to: Station | null
  date: Date | null
  travelClass: string
  adults: number
  children: number
}

export interface SelectedTrain {
  train: Train
  selectedClass: TrainClass
}

export interface Booking {
  id: string
  pnr: string
  trainNumber: string
  trainName: string
  from: string
  fromCode: string
  to: string
  toCode: string
  date: string
  departure: string
  arrival: string
  class: string
  passengers: Passenger[]
  status: 'Confirmed' | 'RAC' | 'Waitlist' | 'Cancelled'
  fare: number
  paymentStatus?: 'Paid' | 'Pending' | 'Failed' | 'Refund Initiated'
  coachPosition?: string
  platform?: string
  delayMinutes?: number
  bookedOn: string
}

export interface Offer {
  id: string
  title: string
  description: string
  code?: string
  image: string
  type: 'coupon' | 'book'
  category: string
  discount?: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

export interface TravelInfoItem {
  id: string
  title: string
  description: string
  icon: string
}

export interface WalletTransaction {
  id: string
  type: 'credit' | 'debit'
  amount: number
  description: string
  date: string
}

export interface TDRReason {
  id: string
  label: string
}

export interface User {
  name: string
  email: string
  phone: string
}

export type { Berth, BerthType, BerthStatus, Coach, SeatAssignment, BookingExtras } from '../data/ntesCoachData'
