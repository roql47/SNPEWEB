import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Youtube, Instagram, BookOpen, MessageCircle, PenLine, ShoppingBag } from 'lucide-react'

const socialLinks = [
  { title: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/c/SNPElife', size: 'lg' },
  { title: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/snpe_korea/' },
  { title: 'Naver Cafe', icon: MessageCircle, url: 'https://cafe.naver.com/snpe/' },
  { title: 'Blog', icon: PenLine, url: 'https://blog.naver.com/snpekorea' },
  { title: 'E-Book', icon: BookOpen, url: 'https://www.kyobobook.co.kr' },
  { title: 'Kakao', icon: MessageCircle, url: 'http://pf.kakao.com/_Tqyxib' },
  { title: 'SNPE SHOP', icon: ShoppingBag, url: 'https://www.snpeshop.com/' },
]

export default function Footer() {
  const { t } = useTranslation()

  const footerNav = [
    { labelKey: 'footer.about', path: '/about' },
    { labelKey: 'footer.privacy', path: '/about' },
    { labelKey: 'footer.terms', path: '/about' },
  ]

  return (
    <footer className="bg-[#2f2f2f] text-gray-400">
      {/* Top bar */}
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
            {socialLinks.map((l) => (
              <a
                key={l.title}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                title={l.title}
                className={`flex items-center justify-center rounded-lg opacity-60 hover:opacity-100 transition-opacity ${
                  l.size === 'lg' ? 'w-7 h-7' : 'w-6 h-6'
                }`}
              >
                <l.icon size={l.size === 'lg' ? 20 : 16} className="text-gray-400" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main info */}
      <div className="max-w-[1440px] mx-auto px-6 py-8 md:py-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div>
            <p className="text-white font-semibold text-sm mb-3">{t('footer.company')}</p>
            <div className="text-xs leading-[1.8] space-y-0.5">
              <p>
                <span className="text-gray-500 mr-1.5">Address :</span>
                {t('footer.address')}
              </p>
              <p>
                <span className="text-gray-500 mr-1.5">Biz No. :</span>
                {t('footer.bizNum')}
                <span className="text-gray-500 mx-2">|</span>
                <span className="text-gray-500 mr-1.5">CEO :</span>
                {t('footer.ceo')}
              </p>
              <p>
                <span className="text-gray-500 mr-1.5">TEL :</span>
                02-539-2925
                <span className="text-gray-500 mx-2">|</span>
                <span className="text-gray-500 mr-1.5">FAX :</span>
                02-568-2925
                <span className="text-gray-500 mx-2">|</span>
                <span className="text-gray-500 mr-1.5">E-mail :</span>
                <a href="mailto:contact@mycuring.com" className="hover:text-white transition-colors">
                  contact@mycuring.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <a
              href="https://www.snpeshop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs px-4 py-2 border border-gray-600 rounded hover:border-gray-400 hover:text-white transition-colors"
            >
              <ShoppingBag size={14} /> SNPE SHOP →
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 py-4 text-center text-[11px] text-gray-500">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  )
}
