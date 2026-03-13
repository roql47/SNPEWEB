import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Search, User, Globe } from 'lucide-react'
import { mainNav } from '../../data/navigation'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()
  const headerRef = useRef(null)

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

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchText.trim()) {
      navigate(`/search-center?searchText=${encodeURIComponent(searchText)}`)
      setSearchText('')
    }
  }

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-snpe text-white text-sm">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between h-10">
          <a
            href="https://www.snpeshop.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity font-medium"
          >
            SNPE SHOP
          </a>
          <div className="flex items-center gap-4">
            <Link to="/mypage" className="hover:opacity-80 transition-opacity flex items-center gap-1">
              <User size={14} />
              <span className="hidden sm:inline">마이페이지</span>
            </Link>
            <Link to="/login" className="hover:opacity-80 transition-opacity">로그인</Link>
            <Link to="/provision" className="hover:opacity-80 transition-opacity">회원가입</Link>
            <button className="hover:opacity-80 transition-opacity flex items-center gap-1">
              <Globe size={14} />
              <span className="hidden sm:inline">KR</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/images/logo.png" alt="SNPE" className="h-8 lg:h-11" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0 h-full">
            {mainNav.map((item) => (
              <div
                key={item.title}
                className="relative h-full flex items-center group"
                onMouseEnter={() => setActiveMenu(item.title)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  to={item.path}
                  className="px-5 xl:px-7 h-full flex items-center text-[15px] font-medium text-gray-700 hover:text-snpe transition-colors tracking-tight"
                >
                  {item.title}
                </Link>
                {/* Dropdown */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[180px] whitespace-nowrap transition-all duration-200 ${
                    activeMenu === item.title
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className="block px-5 py-2.5 text-sm text-gray-600 hover:text-snpe hover:bg-snpe/5 transition-colors"
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Search bar (desktop) */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center">
            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="수련센터 검색"
                className="w-48 xl:w-56 h-9 pl-4 pr-10 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe transition-colors"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-snpe transition-colors">
                <Search size={16} />
              </button>
            </div>
          </form>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-snpe transition-colors"
            aria-label="메뉴 열기"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl overflow-y-auto">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="p-4 border-b border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="수련센터 검색"
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
                  key={item.title}
                  item={item}
                  onClose={() => setMobileOpen(false)}
                />
              ))}
            </nav>

            {/* Mobile utility links */}
            <div className="border-t border-gray-100 p-4 flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm text-gray-600 hover:text-snpe py-1">
                로그인
              </Link>
              <Link to="/provision" onClick={() => setMobileOpen(false)} className="text-sm text-gray-600 hover:text-snpe py-1">
                회원가입
              </Link>
              <Link to="/mypage" onClick={() => setMobileOpen(false)} className="text-sm text-gray-600 hover:text-snpe py-1">
                마이페이지
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function MobileNavGroup({ item, onClose }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-[15px] font-medium text-gray-700 hover:text-snpe transition-colors"
      >
        {item.title}
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
            className="block pl-10 pr-5 py-2.5 text-sm text-gray-500 hover:text-snpe transition-colors"
          >
            {child.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
