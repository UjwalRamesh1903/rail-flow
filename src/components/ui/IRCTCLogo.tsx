const logoSrc = `${import.meta.env.BASE_URL}images/irctc-logo.png`

export function IRCTCLogo({ className = '' }: { className?: string }) {
  return (
    <img
      src={logoSrc}
      alt="IRCTC - Indian Railway Catering and Tourism Corporation"
      className={`h-11 w-auto object-contain ${className}`}
      width={120}
      height={44}
      decoding="async"
    />
  )
}
