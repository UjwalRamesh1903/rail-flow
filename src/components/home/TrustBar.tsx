import { Shield, Zap, Tag, Headphones } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import type { TranslationKey } from '../../i18n/translations'

const items: { icon: typeof Shield; key: TranslationKey }[] = [
  { icon: Shield, key: 'trust.secure' },
  { icon: Zap, key: 'trust.instant' },
  { icon: Tag, key: 'trust.noHidden' },
  { icon: Headphones, key: 'trust.support' },
]

export function TrustBar() {
  const { t } = useLanguage()

  return (
    <section className="bg-[#111827] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.key}
              className={`flex items-center justify-center gap-2.5 py-4 ${
                i < items.length - 1 ? 'lg:border-r border-white/10' : ''
              } ${i % 2 === 0 ? 'border-r border-white/10 lg:border-r' : ''} ${
                i < 2 ? 'border-b lg:border-b-0 border-white/10' : ''
              }`}
            >
              <item.icon className="w-5 h-5 text-blue-400 shrink-0" />
              <span className="text-sm font-semibold text-gray-300">{t(item.key)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
