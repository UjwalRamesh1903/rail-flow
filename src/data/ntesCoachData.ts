export type BerthType =
  | 'LOWER'
  | 'MIDDLE'
  | 'UPPER'
  | 'S.LOWER'
  | 'S.UPPER'
  | 'SIDE_LOWER'
  | 'SIDE_UPPER'
  | 'CABIN'
  | 'COUPE'
  | 'CHAIR'

export type BerthStatus = 'available' | 'booked' | 'selected' | 'blocked' | 'ladies'

export interface Berth {
  number: number
  type: BerthType
  status: BerthStatus
  section: number
  passengerIndex?: number
}

export interface Coach {
  id: string
  label: string
  classCode: string
  className: string
  berths: Berth[]
  position: number
}

export interface TrainComposition {
  trainNumber: string
  coaches: Coach[]
}

export interface SeatAssignment {
  coachId: string
  coachLabel: string
  berthNumber: number
  berthType: BerthType
  passengerIndex: number
}

export interface BookingExtras {
  email: string
  mobile: string
  idProofType: string
  travelInsurance: boolean
  autoUpgrade: boolean
  confirmBerths: boolean
  boardingStation: string
  reservationUpto: string
}

// NTES-style coach compositions for major train types
export const trainCompositions: Record<string, { coaches: { id: string; classCode: string; className: string }[] }> = {
  Rajdhani: {
    coaches: [
      { id: 'H1', classCode: '1A', className: 'AC First Class' },
      { id: 'A1', classCode: '2A', className: 'AC 2 Tier' },
      { id: 'A2', classCode: '2A', className: 'AC 2 Tier' },
      { id: 'A3', classCode: '2A', className: 'AC 2 Tier' },
      { id: 'PC', classCode: 'PC', className: 'Pantry Car' },
      { id: 'B1', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B2', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B3', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B4', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B5', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B6', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B7', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B8', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B9', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B10', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B11', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B12', classCode: '3A', className: 'AC 3 Tier' },
    ],
  },
  Duronto: {
    coaches: [
      { id: 'H1', classCode: '1A', className: 'AC First Class' },
      { id: 'A1', classCode: '2A', className: 'AC 2 Tier' },
      { id: 'A2', classCode: '2A', className: 'AC 2 Tier' },
      { id: 'PC', classCode: 'PC', className: 'Pantry Car' },
      { id: 'B1', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B2', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B3', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B4', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B5', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B6', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B7', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B8', classCode: '3A', className: 'AC 3 Tier' },
    ],
  },
  Shatabdi: {
    coaches: [
      { id: 'C1', classCode: 'EC', className: 'Executive Chair Car' },
      { id: 'C2', classCode: 'CC', className: 'AC Chair Car' },
      { id: 'C3', classCode: 'CC', className: 'AC Chair Car' },
      { id: 'PC', classCode: 'PC', className: 'Pantry Car' },
      { id: 'C4', classCode: 'CC', className: 'AC Chair Car' },
      { id: 'C5', classCode: 'CC', className: 'AC Chair Car' },
    ],
  },
  Superfast: {
    coaches: [
      { id: 'S1', classCode: 'SL', className: 'Sleeper' },
      { id: 'S2', classCode: 'SL', className: 'Sleeper' },
      { id: 'S3', classCode: 'SL', className: 'Sleeper' },
      { id: 'S4', classCode: 'SL', className: 'Sleeper' },
      { id: 'S5', classCode: 'SL', className: 'Sleeper' },
      { id: 'B1', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B2', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'A1', classCode: '2A', className: 'AC 2 Tier' },
      { id: 'GEN', classCode: '2S', className: 'General' },
    ],
  },
  Express: {
    coaches: [
      { id: 'S1', classCode: 'SL', className: 'Sleeper' },
      { id: 'S2', classCode: 'SL', className: 'Sleeper' },
      { id: 'S3', classCode: 'SL', className: 'Sleeper' },
      { id: 'S4', classCode: 'SL', className: 'Sleeper' },
      { id: 'S5', classCode: 'SL', className: 'Sleeper' },
      { id: 'S6', classCode: 'SL', className: 'Sleeper' },
      { id: 'B1', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'B2', classCode: '3A', className: 'AC 3 Tier' },
      { id: 'A1', classCode: '2A', className: 'AC 2 Tier' },
      { id: 'GEN', classCode: '2S', className: 'General' },
    ],
  },
}

export const defaultComposition = trainCompositions.Express
