import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Clock, Filter, X } from 'lucide-react'
import { useBooking } from '../context/useBooking'
import { getTrainsForRoute } from '../data/trains'
import { formatJourneyDate } from '../utils/formatDate'
import { cn } from '../utils/cn'
import type { Train } from '../types'

export function TrainsPage() {
  const navigate = useNavigate()
  const { search, setSelectedTrain } = useBooking()
  const [departureFilter, setDepartureFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [classFilter, setClassFilter] = useState('all')
  const [availFilter, setAvailFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const allTrains = useMemo(() => {
    if (!search.from || !search.to) return []
    return getTrainsForRoute(search.from.code, search.to.code)
  }, [search.from, search.to])

  const filteredTrains = useMemo(() => {
    return allTrains.filter((train) => {
      if (typeFilter !== 'all' && train.type !== typeFilter) return false
      if (departureFilter !== 'all') {
        const hour = parseInt(train.departure.split(':')[0])
        if (departureFilter === 'morning' && (hour < 6 || hour >= 12)) return false
        if (departureFilter === 'afternoon' && (hour < 12 || hour >= 17)) return false
        if (departureFilter === 'evening' && (hour < 17 || hour >= 21)) return false
        if (departureFilter === 'night' && hour < 21 && hour >= 6) return false
      }
      if (classFilter !== 'all') {
        const hasClass = train.classes.some((c) => c.code === classFilter && c.availability !== 'Not Available')
        if (!hasClass) return false
      }
      if (availFilter !== 'all') {
        const hasAvail = train.classes.some((c) => c.availability === availFilter)
        if (!hasAvail) return false
      }
      return true
    })
  }, [allTrains, departureFilter, typeFilter, classFilter, availFilter])

  const trainTypes = [...new Set(allTrains.map((t) => t.type))]

  const handleSelectTrain = (train: Train, cls: Train['classes'][0]) => {
    setSelectedTrain({ train, selectedClass: cls })
    navigate('/passenger-details')
  }

  if (!search.from || !search.to) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">Please search for trains from the homepage first.</p>
        <button onClick={() => navigate('/')} className="text-irctc-blue font-semibold hover:underline">Go to Home</button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Search summary */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-bold text-gray-900">{search.from.name}</span>
          <span className="px-1.5 py-0.5 bg-irctc-blue-light text-irctc-blue text-xs font-bold rounded">{search.from.code}</span>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <span className="font-bold text-gray-900">{search.to.name}</span>
          <span className="px-1.5 py-0.5 bg-irctc-blue-light text-irctc-blue text-xs font-bold rounded">{search.to.code}</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-600">{search.date ? formatJourneyDate(search.date) : ''}</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-600">{search.adults + search.children} Passenger(s)</span>
          <button onClick={() => navigate('/')} className="ml-auto text-irctc-blue text-sm font-semibold hover:underline">Modify Search</button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filters - Desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sticky top-20">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </h3>

            <FilterGroup label="Departure Time" value={departureFilter} onChange={setDepartureFilter} options={[
              { value: 'all', label: 'All' },
              { value: 'morning', label: 'Morning (6AM-12PM)' },
              { value: 'afternoon', label: 'Afternoon (12PM-5PM)' },
              { value: 'evening', label: 'Evening (5PM-9PM)' },
              { value: 'night', label: 'Night (9PM-6AM)' },
            ]} />

            <FilterGroup label="Train Type" value={typeFilter} onChange={setTypeFilter} options={[
              { value: 'all', label: 'All Types' },
              ...trainTypes.map((t) => ({ value: t, label: t })),
            ]} />

            <FilterGroup label="Class" value={classFilter} onChange={setClassFilter} options={[
              { value: 'all', label: 'All Classes' },
              { value: '1A', label: 'AC First (1A)' },
              { value: '2A', label: 'AC 2 Tier (2A)' },
              { value: '3A', label: 'AC 3 Tier (3A)' },
              { value: 'SL', label: 'Sleeper (SL)' },
            ]} />

            <FilterGroup label="Availability" value={availFilter} onChange={setAvailFilter} options={[
              { value: 'all', label: 'All' },
              { value: 'Available', label: 'Available' },
              { value: 'RAC', label: 'RAC' },
              { value: 'Waitlist', label: 'Waitlist' },
            ]} />
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">{filteredTrains.length} train(s) found</p>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-1 text-sm text-irctc-blue font-semibold"
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>

          {showFilters && (
            <div className="lg:hidden bg-white rounded-2xl border p-4 mb-4 animate-slide-down">
              <div className="flex justify-between mb-3">
                <h3 className="font-bold">Filters</h3>
                <button onClick={() => setShowFilters(false)}><X className="w-4 h-4" /></button>
              </div>
              <FilterGroup label="Departure" value={departureFilter} onChange={setDepartureFilter} options={[
                { value: 'all', label: 'All' }, { value: 'morning', label: 'Morning' },
                { value: 'afternoon', label: 'Afternoon' }, { value: 'evening', label: 'Evening' }, { value: 'night', label: 'Night' },
              ]} />
            </div>
          )}

          {filteredTrains.length === 0 ? (
            <div className="bg-white rounded-2xl border p-12 text-center">
              <p className="text-gray-500">No trains found matching your filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTrains.map((train) => (
                <div key={train.id} className="bg-white rounded-2xl border border-gray-100 p-4 lg:p-5 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">{train.number}</span>
                        <span className="text-gray-600 text-sm">{train.name}</span>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded">{train.type}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div>
                          <div className="text-lg font-bold text-gray-900">{train.departure}</div>
                          <div className="text-xs text-gray-500">{train.fromCode}</div>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {train.duration}
                          </div>
                          <div className="w-full h-px bg-gray-200 my-1 relative">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-300" />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-300" />
                          </div>
                          <div className="text-[10px] text-gray-400">{train.runningDays.join(', ')}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{train.arrival}</div>
                          <div className="text-xs text-gray-500">{train.toCode}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
                      {train.classes
                        .filter((c) => search.travelClass === 'ALL' || c.code === search.travelClass)
                        .slice(0, 4)
                        .map((cls) => (
                          <button
                            key={cls.code}
                            onClick={() => cls.availability !== 'Not Available' && handleSelectTrain(train, cls)}
                            disabled={cls.availability === 'Not Available'}
                            className={cn(
                              'px-3 py-2 rounded-lg border text-xs text-left min-w-[120px] transition-all',
                              cls.availability === 'Available' && 'border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer',
                              cls.availability === 'RAC' && 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100 cursor-pointer',
                              cls.availability === 'Waitlist' && 'border-orange-200 bg-orange-50 hover:bg-orange-100 cursor-pointer',
                              cls.availability === 'Not Available' && 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed',
                            )}
                          >
                            <div className="font-bold text-gray-800">{cls.code}</div>
                            <div className={cn(
                              'font-medium',
                              cls.availability === 'Available' && 'text-green-700',
                              cls.availability === 'RAC' && 'text-yellow-700',
                              cls.availability === 'Waitlist' && 'text-orange-700',
                              cls.availability === 'Not Available' && 'text-gray-400',
                            )}>
                              {cls.availability === 'Available' ? `₹${cls.fare}` : cls.availability}
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterGroup({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">{label}</h4>
      <div className="space-y-1">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer hover:text-irctc-blue">
            <input
              type="radio"
              name={label}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="accent-irctc-blue"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  )
}
