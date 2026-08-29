const logoWebp = `${import.meta.env.BASE_URL}images/irctc-logo.webp`
const logoPng = `${import.meta.env.BASE_URL}images/irctc-logo.png`

export function IRCTCLogo({ className = '' }: { className?: string }) {
  return (
    <picture>
      <source srcSet={logoWebp} type="image/webp" />
      <img
        src={logoPng}
        alt="IRCTC - Indian Railway Catering and Tourism Corporation. Safar Aasaan, Zindagi Khushhaal"
        className={`h-14 sm:h-16 w-auto object-contain object-left ${className}`}
        width={320}
        height={292}
        decoding="async"
      />
    </picture>
  )
}
