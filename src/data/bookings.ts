import type { Booking } from '../types'

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    pnr: '4521879630',
    trainNumber: '12951',
    trainName: 'Mumbai Rajdhani Express',
    from: 'New Delhi',
    fromCode: 'NDLS',
    to: 'Mumbai Central',
    toCode: 'MMCT',
    date: '2025-06-15',
    departure: '16:55',
    arrival: '08:35',
    class: 'AC 3 Tier (3A)',
    passengers: [
      { name: 'Rahul Sharma', age: 32, gender: 'Male', berth: 'B2 - 45 (Lower)' },
      { name: 'Priya Sharma', age: 28, gender: 'Female', berth: 'B2 - 46 (Middle)' },
    ],
    status: 'Confirmed',
    fare: 3700,
    bookedOn: '2025-05-20',
  },
  {
    id: 'b2',
    pnr: '8745213690',
    trainNumber: '12259',
    trainName: 'Sealdah Duronto Express',
    from: 'New Delhi',
    fromCode: 'NDLS',
    to: 'Howrah Junction',
    toCode: 'HWH',
    date: '2025-07-08',
    departure: '11:00',
    arrival: '06:00',
    class: 'AC 2 Tier (2A)',
    passengers: [
      { name: 'Amit Kumar', age: 45, gender: 'Male', berth: 'A1 - 12 (Side Lower)' },
    ],
    status: 'Confirmed',
    fare: 2800,
    bookedOn: '2025-06-10',
  },
  {
    id: 'b3',
    pnr: '9632587410',
    trainNumber: '12627',
    trainName: 'Karnataka Express',
    from: 'New Delhi',
    fromCode: 'NDLS',
    to: 'Bangalore City Junction',
    toCode: 'SBC',
    date: '2025-08-02',
    departure: '20:20',
    arrival: '06:40',
    class: 'Sleeper (SL)',
    passengers: [
      { name: 'Sneha Reddy', age: 24, gender: 'Female', berth: 'S5 - 32 (Upper)' },
      { name: 'Karthik Reddy', age: 26, gender: 'Male', berth: 'S5 - 33 (Middle)' },
    ],
    status: 'RAC',
    fare: 1300,
    bookedOn: '2025-07-15',
  },
]

export function getBookingByPNR(pnr: string): Booking | undefined {
  return mockBookings.find((b) => b.pnr === pnr)
}
