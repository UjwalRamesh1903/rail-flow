import type { TravelInfoItem } from '../types'

export const travelInfoItems: TravelInfoItem[] = [
  {
    id: 'ti1',
    title: 'Train Schedules',
    description: 'View complete train schedules, running days, and route information for all trains across the Indian Railways network.',
    icon: 'train',
  },
  {
    id: 'ti2',
    title: 'Fare Chart',
    description: 'Check fare details for different classes of travel. Fares vary based on distance, class, and train type.',
    icon: 'tag',
  },
  {
    id: 'ti3',
    title: 'Seat Availability',
    description: 'Check real-time seat availability for your preferred train and class before booking.',
    icon: 'seat',
  },
  {
    id: 'ti4',
    title: 'Train Route Map',
    description: 'View detailed route maps showing all stations, halts, and timings for any train.',
    icon: 'map',
  },
  {
    id: 'ti5',
    title: 'Catering Services',
    description: 'Information about onboard catering, e-catering options, and meal booking for your journey.',
    icon: 'food',
  },
  {
    id: 'ti6',
    title: 'Luggage Rules',
    description: 'Know the free allowance and charges for excess luggage. Different rules apply for AC and non-AC classes.',
    icon: 'luggage',
  },
  {
    id: 'ti7',
    title: 'Senior Citizen Concession',
    description: 'Male senior citizens (60+) get 40% concession and female senior citizens (58+) get 50% concession on base fare.',
    icon: 'senior',
  },
  {
    id: 'ti8',
    title: 'Divyangjan Facilities',
    description: 'Special facilities and concessions available for persons with disabilities including reserved coaches and assistance.',
    icon: 'accessibility',
  },
  {
    id: 'ti9',
    title: 'Retiring Rooms',
    description: 'Book comfortable retiring rooms at major railway stations for short stays during your journey.',
    icon: 'room',
  },
  {
    id: 'ti10',
    title: 'Tourism Packages',
    description: 'Explore curated tourism packages combining train travel with hotel stays and sightseeing.',
    icon: 'tourism',
  },
]
