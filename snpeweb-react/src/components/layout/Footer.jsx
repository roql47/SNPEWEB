import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowDown } from 'lucide-react'
import { socialLinks } from '../../data/socialLinks'

const BROCHURE_URL = 'https://mycuring.com/'
const SGROUND_URL = 'https://www.s-ground.co.kr'
const SHOP_URL = 'https://www.snpeshop.com'

export default function Footer() {
  const { t } = useTranslation()

  const footerNav = [
    { labelKey: 'footer.about', path: '/about' },
    { labelKey: 'footer.privacy', path: '/about' },
    { labelKey: 'footer.terms', path: '/about' },
  ]

  return (
    <footer className="bg-[#2f2f2f] text-gray-400">
      <div className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            {footerNav.map((item) => (
              <Link
                key={item.labelKey}
                to={item.path}
                className="hover:text-white transition-colors"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((l) => {
              const Icon = l.icon
              const isLg = l.size === 'lg'
              return (
                <a
                  key={l.key}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={l.title}
                  aria-label={l.title}
                  className={`flex items-center justify-center rounded-lg opacity-60 hover:opacity-100 transition-opacity ${
                    isLg ? 'w-7 h-7' : 'w-6 h-6'
                  }`}
                >
                  {Icon ? (
                    <Icon size={isLg ? 20 : 16} className="text-gray-400" />
                  ) : (
                    <span className="text-gray-400 font-bold text-[11px]">{l.badgeText}</span>
                  )}
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-10 md:py-12 text-white text-[13px] md:text-sm leading-[1.8]">
        <p>{t('footer.copyright')}</p>
        <p>
          {t('footer.bizNumLabel')} : {t('footer.bizNum')}
          <span className="mx-1.5 text-white/50">|</span>
          {t('footer.ceoLabel')} : {t('footer.ceo')}
        </p>
        <p>{t('footer.address')}</p>

        <div className="mt-8">
          <p className="font-bold text-white mb-1">{t('footer.otherInquiry')}</p>
          <a href="mailto:contact@mycuring.com" className="block hover:opacity-80 transition-opacity">
            contact@mycuring.com
          </a>
          <a href="tel:025392925" className="block hover:opacity-80 transition-opacity">
            02-539-2925
          </a>
        </div>

        <a
          href={BROCHURE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-1.5 text-snpe font-medium hover:opacity-80 transition-opacity"
        >
          {t('footer.brochure')}
          <ArrowDown size={16} strokeWidth={2.2} />
        </a>

        <div className="mt-8">
          <p className="font-bold text-white mb-1">{t('footer.relatedSites')}</p>
          <a
            href={SGROUND_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition-opacity"
          >
            S-GROUND
          </a>
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition-opacity"
          >
            SNPE SHOP
          </a>
        </div>
      </div>
    </footer>
  )
}
