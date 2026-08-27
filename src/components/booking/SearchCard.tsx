import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Armchair, User, ArrowLeftRight, Search } from 'lucide-react'
import { useBooking } from '../../context/BookingContext'
import { useToast } from '../../context/ToastContext'
import { StationSelector } from './StationSelector'
import { DatePicker } from './DatePicker'
import { ClassSelector } from './ClassSelector'
import { PassengerSelector } from './PassengerSelector'
import { formatJourneyDate, formatDayName } from '../../utils/formatDate'

interface SearchCardProps {
  id?: string
}

export function SearchCard({ id }: SearchCardProps) {
  const navigate = useNavigate()
  const { search, setFrom, setTo, swapStations, setDate, setTravelClass, setPassengers } = useBooking()
  const { showToast } = useToast()

  const [stationModal, setStationModal] = useState<'from' | 'to' | null>(null)
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  const handleSearch = () => {
    if (!search.from) {
      showToast('Please select departure station', 'error')
      return
    }
    if (!search.to) {
      showToast('Please select destination station', 'error')
      return
    }
    if (search.from.code === search.to.code) {
      showToast('From and To stations cannot be the same', 'error')
      return
    }
    if (!search.date) {
      showToast('Please select journey date', 'error')
      return
    }
    navigate('/trains')
  }

  return (
    <>
      <div id={id} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          {/* From */}
          <button
            onClick={() => setStationModal('from')}
            className="flex-1 flex items-start gap-3 px-5 py-4 lg:py-5 hover:bg-gray-50/80 transition-colors text-left border-b lg:border-b-0 lg:border-r border-gray-100"
          >
            <MapPin className="w-5 h-5 text-irctc-blue mt-0.5 shrink-0" />
            <div>
              <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wide mb-0.5">From</div>
              <div className="font-bold text-gray-900 text-base leading-tight">
                {search.from?.name || 'Select Station'}
              </div>
              {search.from && (
                <span className="inline-block mt-1 px-2 py-0.5 bg-irctc-blue-light text-irctc-blue text-[11px] font-bold rounded">
                  {search.from.code}
                </span>
              )}
            </div>
          </button>

          {/* Swap */}
          <div className="hidden lg:flex items-center justify-center px-1 relative z-10 -mx-3">
            <button
              onClick={swapStations}
              className="w-9 h-9 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center hover:border-irctc-blue hover:bg-irctc-blue-light transition-all shadow-sm"
              aria-label="Swap stations"
            >
              <ArrowLeftRight className="w-4 h-4 text-irctc-blue" />
            </button>
          </div>

          {/* To */}
          <button
            onClick={() => setStationModal('to')}
            className="flex-1 flex items-start gap-3 px-5 py-4 lg:py-5 hover:bg-gray-50/80 transition-colors text-left border-b lg:border-b-0 lg:border-r border-gray-100"
          >
            <MapPin className="w-5 h-5 text-irctc-blue mt-0.5 shrink-0" />
            <div>
              <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wide mb-0.5">To</div>
              <div className="font-bold text-gray-900 text-base leading-tight">
                {search.to?.name || 'Select Station'}
              </div>
              {search.to && (
                <span className="inline-block mt-1 px-2 py-0.5 bg-irctc-blue-light text-irctc-blue text-[11px] font-bold rounded">
                  {search.to.code}
                </span>
              )}
            </div>
          </button>

          {/* Mobile swap */}
          <div className="lg:hidden flex justify-center -my-2 relative z-10">
            <button
              onClick={swapStations}
              className="w-9 h-9 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center hover:border-irctc-blue shadow-sm"
            >
              <ArrowLeftRight className="w-4 h-4 text-irctc-blue" />
            </button>
          </div>

          {/* Date */}
          <button
            onClick={() => setDatePickerOpen(true)}
            className="flex-1 flex items-start gap-3 px-5 py-4 lg:py-5 hover:bg-gray-50/80 transition-colors text-left border-b lg:border-b-0 lg:border-r border-gray-100"
          >
            <Calendar className="w-5 h-5 text-irctc-blue mt-0.5 shrink-0" />
            <div>
              <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wide mb-0.5">Journey Date</div>
              <div className="font-bold text-gray-900 text-base leading-tight">
                {search.date ? formatJourneyDate(search.date) : 'Select Date'}
              </div>
              {search.date && (
                <div className="text-xs text-gray-500 mt-0.5">{formatDayName(search.date)}</div>
              )}
            </div>
          </button>

          {/* Class */}
          <div className="flex-1 flex items-start gap-3 px-5 py-4 lg:py-5 border-b lg:border-b-0 lg:border-r border-gray-100">
            <Armchair className="w-5 h-5 text-irctc-blue mt-0.5 shrink-0" />
            <div className="flex-1">
              <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wide mb-1">Class</div>
              <ClassSelector value={search.travelClass} onChange={setTravelClass} />
            </div>
          </div>

          {/* Passengers */}
          <div className="flex-1 flex items-start gap-3 px-5 py-4 lg:py-5 border-b lg:border-b-0 lg:border-r border-gray-100">
            <User className="w-5 h-5 text-irctc-blue mt-0.5 shrink-0" />
            <div className="flex-1">
              <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wide mb-1">Passengers</div>
              <PassengerSelector
                adults={search.adults}
                children={search.children}
                onChange={setPassengers}
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 bg-irctc-blue hover:bg-irctc-blue-dark text-white font-semibold px-6 py-5 lg:py-0 transition-all active:scale-[0.98] min-w-[160px]"
          >
            <Search className="w-5 h-5" />
            <span className="text-sm">Search Trains</span>
          </button>
        </div>
      </div>

      <StationSelector
        isOpen={stationModal === 'from'}
        onClose={() => setStationModal(null)}
        onSelect={setFrom}
        title="Select Departure Station"
        selectedStation={search.from}
      />
      <StationSelector
        isOpen={stationModal === 'to'}
        onClose={() => setStationModal(null)}
        onSelect={setTo}
        title="Select Destination Station"
        selectedStation={search.to}
      />
      <DatePicker
        isOpen={datePickerOpen}
        onClose={() => setDatePickerOpen(false)}
        selectedDate={search.date}
        onSelect={setDate}
      />
    </>
  )
}
