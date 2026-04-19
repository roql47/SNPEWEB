import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Search, User, Globe, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { mainNav } from '../../data/navigation'

const LANGUAGES = [
  { code: 'ko', label: '한국어', flag: 'KR' },
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'ja', label: '日本語', flag: 'JP' },
  { code: 'zh', label: '中文', flag: 'CN' },
]

export default function Header() {
  const { t, i18n } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [langOpen, setLangOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const headerRef = useRef(null)
  const langRef = useRef(null)

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0]
  const isHome = location.pathname === '/'
  // 홈 히어로 위에서는 투명 오버레이 + 흰 텍스트, 스크롤 후엔 기본 스타일
  const overlay = isHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchText.trim()) {
      navigate(`/search-center?searchText=${encodeURIComponent(searchText)}`)
      setSearchText('')
    }
  }

  const changeLanguage = (code) => {
    i18n.changeLanguage(code)
    setLangOpen(false)
  }

  return (
    <>
      {/* Top utility bar */}
      <div
        className={`hidden lg:block text-white text-sm relative z-[60] transition-colors duration-300 ${
          overlay ? 'bg-white/10 backdrop-blur-sm' : 'bg-mint'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between h-10">
          <a
            href="https://www.snpeshop.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity font-medium"
          >
            {t('header.shop')}
          </a>
          <div className="flex items-center gap-4">
            <Link to="/mypage" className="hover:opacity-80 transition-opacity flex items-center gap-1">
              <User size={14} />
              <span className="hidden sm:inline">{t('header.mypage')}</span>
            </Link>

            {/* Language switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="hover:opacity-80 transition-opacity flex items-center gap-1"
              >
                <Globe size={14} />
                <span>{currentLang.flag}</span>
                <ChevronDown size={12} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-gray-100 py-1 min-w-[120px] z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        lang.code === i18n.language
                          ? 'text-snpe-dark font-medium bg-snpe/5'
                          : 'text-gray-600 hover:text-snpe-dark hover:bg-gray-50'
                      }`}
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          overlay
            ? 'bg-transparent'
            : `bg-white ${scrolled ? 'shadow-md' : ''}`
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="SNPE"
              className={`h-8 lg:h-11 transition-[filter] duration-300 ${
                overlay ? 'brightness-0 invert' : ''
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0 h-full">
            {mainNav.map((item) => {
              const label = t(item.titleKey)
              return (
                <div
                  key={item.titleKey}
                  className="relative h-full flex items-center group"
                  onMouseEnter={() => setActiveMenu(item.titleKey)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    to={item.path}
                    className={`px-5 xl:px-7 h-full flex items-center text-[15px] font-medium transition-colors tracking-tight ${
                      overlay
                        ? 'text-white/95 hover:text-white'
                        : 'text-gray-700 hover:text-snpe-dark'
                    }`}
                  >
                    {label}
                  </Link>
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[180px] whitespace-nowrap transition-all duration-200 ${
                      activeMenu === item.titleKey
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-5 py-2.5 text-sm text-gray-600 hover:text-snpe-dark hover:bg-snpe/5 transition-colors"
                      >
                        {t(child.titleKey)}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </nav>

          {/* Search bar (desktop) */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center">
            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={t('header.searchPlaceholder')}
                className={`w-48 xl:w-56 h-9 pl-4 pr-10 rounded-full text-sm focus:outline-none transition-colors ${
                  overlay
                    ? 'bg-white/15 border border-white/30 text-white placeholder-white/70 focus:border-white/60 focus:bg-white/20'
                    : 'border border-gray-300 focus:border-snpe focus:ring-1 focus:ring-snpe'
                }`}
              />
              <button
                type="submit"
                className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                  overlay ? 'text-white/80 hover:text-white' : 'text-gray-400 hover:text-snpe-dark'
                }`}
              >
                <Search size={16} />
              </button>
            </div>
          </form>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors ${
              overlay ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-snpe-dark'
            }`}
            aria-label={t('header.menuOpen')}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl overflow-y-auto">
            {/* Mobile menu header */}
            <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100">
              <Link to="/" onClick={() => setMobileOpen(false)} className="flex-shrink-0">
                <img src="/images/logo.png" alt="SNPE" className="h-7" />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-800 transition-colors"
                aria-label={t('header.menuClose')}
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile language switcher */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100">
              <Globe size={16} className="text-gray-500" />
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                    lang.code === i18n.language
                      ? 'bg-snpe-dark text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {lang.flag}
                </button>
              ))}
            </div>

            {/* Mobile search */}
            <form onSubmit={handleSearch} className="p-4 border-b border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder={t('header.searchPlaceholder')}
                  className="w-full h-10 pl-4 pr-10 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-snpe"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={16} />
                </button>
              </div>
            </form>

            {/* Mobile nav items */}
            <nav className="py-2">
              {mainNav.map((item) => (
                <MobileNavGroup
                  key={item.titleKey}
                  item={item}
                  onClose={() => setMobileOpen(false)}
                />
              ))}
            </nav>

            {/* Mobile utility links */}
            <div className="border-t border-gray-100 p-4 flex flex-col gap-2">
              <Link to="/mypage" onClick={() => setMobileOpen(false)} className="text-sm text-gray-600 hover:text-snpe-dark py-1">
                {t('header.mypage')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function MobileNavGroup({ item, onClose }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-[15px] font-medium text-gray-700 hover:text-snpe-dark transition-colors"
      >
        {t(item.titleKey)}
        <span className={`transition-transform duration-200 text-gray-400 ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${open ? 'max-h-96' : 'max-h-0'}`}>
        {item.children.map((child) => (
          <Link
            key={child.path}
            to={child.path}
            onClick={onClose}
            className="block pl-10 pr-5 py-2.5 text-sm text-gray-500 hover:text-snpe-dark transition-colors"
          >
            {t(child.titleKey)}
          </Link>
        ))}
      </div>
    </div>
  )
}
