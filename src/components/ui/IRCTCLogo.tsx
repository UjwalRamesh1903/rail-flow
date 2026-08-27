export function IRCTCLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative w-11 h-11 shrink-0">
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" aria-label="IRCTC Logo">
          {/* Outer ring */}
          <circle cx="24" cy="24" r="23" fill="#0052CC" />
          <circle cx="24" cy="24" r="21" fill="none" stroke="#ffffff" strokeWidth="0.75" opacity="0.9" />

          {/* Inner wheel hub */}
          <circle cx="24" cy="24" r="4.5" fill="#ffffff" />
          <circle cx="24" cy="24" r="2.2" fill="#0052CC" />

          {/* Wheel spokes - Indian Railways style */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 22.5 * Math.PI) / 180
            const x1 = 24 + Math.cos(angle) * 5.5
            const y1 = 24 + Math.sin(angle) * 5.5
            const x2 = 24 + Math.cos(angle) * 17.5
            const y2 = 24 + Math.sin(angle) * 17.5
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )
          })}

          {/* Curved outer segments between spokes */}
          <circle cx="24" cy="24" r="17.5" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.85" />

          {/* Lotus/petal accents at cardinal points */}
          <ellipse cx="24" cy="7.5" rx="2.2" ry="3.2" fill="#ffffff" opacity="0.95" />
          <ellipse cx="24" cy="40.5" rx="2.2" ry="3.2" fill="#ffffff" opacity="0.95" />
          <ellipse cx="7.5" cy="24" rx="3.2" ry="2.2" fill="#ffffff" opacity="0.95" />
          <ellipse cx="40.5" cy="24" rx="3.2" ry="2.2" fill="#ffffff" opacity="0.95" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[1.35rem] font-extrabold text-[#0052CC] tracking-tight">IRCTC</span>
        <span className="text-[11px] text-gray-500 font-medium mt-0.5 tracking-wide">Indian Railways</span>
      </div>
    </div>
  )
}
