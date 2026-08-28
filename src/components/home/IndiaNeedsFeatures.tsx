import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Accessibility, Languages, WifiOff, ShieldAlert, Users, Sparkles, Download } from 'lucide-react'
import { useToast } from '../../context/useToast'

const modes = [
  { icon: Accessibility, title: 'Senior Citizen Mode', body: 'Large touch targets, lower-berth guidance, clear step-by-step booking help.', tint: 'from-blue-500 to-cyan-400' },
  { icon: Languages, title: 'Hindi + Regional Ready', body: 'Prototype copy blocks for Hindi-first users and room to add more Indian languages.', tint: 'from-orange-500 to-amber-400' },
  { icon: WifiOff, title: 'Low Data / Offline Draft', body: 'Save trip intent locally so users can resume booking when network comes back.', tint: 'from-emerald-500 to-teal-400' },
  { icon: ShieldAlert, title: 'Journey Safety Layer', body: 'Post-booking SOS, family sharing, coach position and station support prompts.', tint: 'from-rose-500 to-pink-400' },
]

const assistantCards = [
  'Cheapest train with seats available',
  'Best overnight option for families',
  'Lower berth friendly for parents',
  'Fastest arrival before office time',
]

export function IndiaNeedsFeatures() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [lowData, setLowData] = useState(() => localStorage.getItem('irctc-low-data') === 'true')
  const [largeText, setLargeText] = useState(() => localStorage.getItem('irctc-large-text') === 'true')
  const savedDraft = useMemo(() => localStorage.getItem('irctc-trip-draft'), [])

  const toggleLowData = () => {
    const next = !lowData
    setLowData(next)
    localStorage.setItem('irctc-low-data', String(next))
    showToast(next ? 'Low-data mode enabled' : 'Low-data mode disabled', 'info')
  }

  const toggleLargeText = () => {
    const next = !largeText
    setLargeText(next)
    document.documentElement.classList.toggle('large-type', next)
    localStorage.setItem('irctc-large-text', String(next))
    showToast(next ? 'Accessible large text enabled' : 'Accessible large text disabled', 'info')
  }

  const saveDraft = () => {
    localStorage.setItem('irctc-trip-draft', JSON.stringify({ savedAt: new Date().toISOString(), intent: 'NDLS to MMCT, family friendly, lower berth preferred' }))
    showToast('Offline booking draft saved', 'success')
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="rounded-[2rem] bg-gradient-to-br from-irctc-navy via-[#0B3CCF] to-[#00A3FF] p-5 lg:p-7 text-white shadow-2xl shadow-blue-900/25 overflow-hidden relative">
        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-orange-400/25 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-44 w-44 rounded-full bg-cyan-300/25 blur-3xl" />
        <div className="relative grid lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-bold ring-1 ring-white/20 mb-4">
              <Sparkles className="w-4 h-4 text-amber-200" /> Built for India-scale travel
            </div>
            <h2 className="text-2xl lg:text-4xl font-extrabold leading-tight">Assisted booking for seniors, families, low network users and first-time travellers.</h2>
            <p className="mt-3 text-blue-50/90 leading-relaxed">This turns the prototype from a booking clone into an accessibility-first travel assistant: simpler language, local draft saving, smart suggestions and safety prompts.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button onClick={toggleLargeText} className="rounded-full bg-white text-irctc-blue px-4 py-2 text-sm font-bold shadow-lg hover:scale-105 transition-transform">{largeText ? 'Large Text On' : 'Enable Large Text'}</button>
              <button onClick={toggleLowData} className="rounded-full bg-white/12 px-4 py-2 text-sm font-bold ring-1 ring-white/25 hover:bg-white/20 transition-colors">{lowData ? 'Low Data On' : 'Low Data Mode'}</button>
              <button onClick={saveDraft} className="rounded-full bg-orange-500 px-4 py-2 text-sm font-bold shadow-lg shadow-orange-900/25 hover:bg-orange-400 transition-colors">Save Offline Draft</button>
            </div>
            {savedDraft && <p className="mt-3 text-xs text-cyan-100"><Download className="inline w-3.5 h-3.5 mr-1" /> A previous offline draft exists on this device.</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {modes.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white/12 p-4 ring-1 ring-white/20 backdrop-blur-md">
                <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.tint} shadow-lg`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-blue-50/85">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-6 rounded-2xl bg-white/95 p-4 text-irctc-navy shadow-xl">
          <div className="flex items-center gap-2 font-extrabold mb-3"><Users className="w-5 h-5 text-irctc-blue" /> Smart train assistant shortcuts</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {assistantCards.map((label) => (
              <button key={label} onClick={() => { showToast(`Assistant selected: ${label}`, 'info'); navigate('/trains') }} className="rounded-xl border border-blue-100 bg-blue-50/80 px-3 py-3 text-left text-sm font-bold hover:border-irctc-blue hover:bg-white hover:shadow-lg transition-all">
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
