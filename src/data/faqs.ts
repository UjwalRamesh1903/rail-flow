import type { FAQ } from '../types'

export const faqs: FAQ[] = [
  {
    id: 'f1',
    category: 'Booking',
    question: 'How do I book a train ticket on IRCTC?',
    answer: 'To book a train ticket, visit the IRCTC website or app, enter your source and destination stations, select journey date, class, and number of passengers. Search for trains, select your preferred train, enter passenger details, and complete payment.',
  },
  {
    id: 'f2',
    category: 'Booking',
    question: 'What is the advance reservation period for train tickets?',
    answer: 'Train tickets can be booked up to 120 days in advance for most trains. Tatkal tickets can be booked one day before the journey date.',
  },
  {
    id: 'f3',
    category: 'PNR',
    question: 'What is a PNR number and how do I check its status?',
    answer: 'PNR (Passenger Name Record) is a 10-digit unique number assigned to each booking. You can check PNR status on the IRCTC website under PNR Status section by entering your PNR number.',
  },
  {
    id: 'f4',
    category: 'Cancellation',
    question: 'How do I cancel my train ticket?',
    answer: 'You can cancel your ticket online through My Bookings section. Cancellation charges apply based on the time of cancellation and class of travel. Refunds are processed to the original payment method.',
  },
  {
    id: 'f5',
    category: 'Cancellation',
    question: 'What are the cancellation charges?',
    answer: 'Cancellation charges vary by class and timing. For AC classes, charges range from ₹240 to ₹600 depending on when you cancel. For Sleeper class, charges are lower. No refund is given if cancelled less than 4 hours before departure.',
  },
  {
    id: 'f6',
    category: 'TDR',
    question: 'What is TDR and when should I file it?',
    answer: 'TDR (Ticket Deposit Receipt) is filed when you could not travel due to valid reasons like train cancellation, diversion, or medical emergency. TDR must be filed within specified time limits after the scheduled departure.',
  },
  {
    id: 'f7',
    category: 'Payment',
    question: 'What payment methods are accepted?',
    answer: 'IRCTC accepts credit cards, debit cards, net banking, and UPI. International cards are also accepted for select bookings.',
  },
  {
    id: 'f8',
    category: 'Classes',
    question: 'What are the different classes of travel?',
    answer: 'Indian Railways offers AC First Class (1A), AC 2 Tier (2A), AC 3 Tier (3A), AC Chair Car (CC), Executive Chair Car (EC), Sleeper (SL), and Second Sitting (2S). Each class offers different comfort levels and pricing.',
  },
  {
    id: 'f9',
    category: 'Tatkal',
    question: 'What is Tatkal booking?',
    answer: 'Tatkal is a scheme for booking train tickets at short notice, one day before the journey. Tatkal tickets open at 10:00 AM for AC classes and 11:00 AM for non-AC classes.',
  },
  {
    id: 'f10',
    category: 'Tracking',
    question: 'How can I track my train live?',
    answer: 'Use the "Where Is My Train?" feature on the homepage. Enter your PNR or train number to see the current running status, last crossed station, next station, delay, and estimated arrival time.',
  },
]
