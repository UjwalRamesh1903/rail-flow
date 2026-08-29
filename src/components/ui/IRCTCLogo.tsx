const logoSrc = `${import.meta.env.BASE_URL}images/irctc-logo.png`

export function IRCTCLogo({ className = '' }: { className?: string }) {
  return (
    <img
      src={logoSrc}
      alt="IRCTC - Indian Railway Catering and Tourism Corporation"
      className={`h-12 w-auto object-contain ${className}`}
    />
  )
}
