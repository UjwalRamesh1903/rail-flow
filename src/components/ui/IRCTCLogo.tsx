export function IRCTCLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative w-10 h-10 shrink-0">
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
          <circle cx="20" cy="20" r="19" fill="#004595" stroke="#003a7a" strokeWidth="1" />
          <circle cx="20" cy="20" r="14" fill="none" stroke="white" strokeWidth="1.5" />
          <text x="20" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Inter, sans-serif">R</text>
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-lg font-bold text-irctc-blue tracking-tight">IRCTC</span>
        <span className="text-[10px] text-gray-500 font-medium -mt-0.5">Indian Railways</span>
      </div>
    </div>
  )
}
