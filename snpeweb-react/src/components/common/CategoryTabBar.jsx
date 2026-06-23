import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useRef, useState, useEffect } from 'react'
import { mainNav } from '../../data/navigation'

export default function CategoryTabBar({ bannerMode = false }) {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const currentPath = '/' + pathname.split('/').filter(Boolean)[0]
  const tabBarRef = useRef(null)
  const [stuck, setStuck] = useState(false)

  // sticky 상태 감지: 뷰포트 최상단에 고정됐을 때 → opaque 전환
  useEffect(() => {
    if (!bannerMode) return
    const el = tabBarRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setStuck(entry.intersectionRatio < 1),
      { rootMargin: '-1px 0px 0px 0px', threshold: [1] }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [bannerMode])

  const group = mainNav.find(
    (g) => g.path === currentPath || g.children?.some((c) => c.path === currentPath)
  )

  if (!group || !group.children || currentPath === '/') return null

  const isOverlay = bannerMode && !stuck
  // 교육과정 카테고리일 때 민트 색상 사용
  const isEducation = group?.titleKey === 'nav.education'

  // 원래 민트(청록) hex — CSS 변수는 브라운으로 변경됐으므로 직접 지정
  const mintColor = '#72D4B4'

  const activeClass = isOverlay
    ? 'border-white text-white'
    : 'border-snpe-dark text-snpe-dark'

  const inactiveClass = isOverlay
    ? 'border-transparent text-white/75 hover:text-white hover:border-white/50'
    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'

  const activeStyle = isEducation && !isOverlay ? { borderColor: mintColor, color: mintColor } : {}
  return (
    <div
      ref={tabBarRef}
      className={`sticky top-0 z-30 border-b transition-colors duration-200 ${
        isOverlay
          ? 'bg-black/30 backdrop-blur-sm border-white/20'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4">
        <nav className="flex overflow-x-auto scrollbar-hide -mb-px">
          {group.children.map((child) => {
            const isActive = child.path === currentPath
            return (
              <Link
                key={child.path}
                to={child.path}
                className={`flex-shrink-0 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive ? activeClass : inactiveClass
                }`}
                style={isActive ? activeStyle : {}}
              >
                {t(child.titleKey)}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
