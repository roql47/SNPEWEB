import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { mainNav } from '../../data/navigation'

export default function CategoryTabBar() {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const currentPath = '/' + pathname.split('/').filter(Boolean)[0]

  const group = mainNav.find(
    (g) => g.path === currentPath || g.children?.some((c) => c.path === currentPath)
  )

  if (!group || !group.children || currentPath === '/') return null

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-[1440px] mx-auto px-4">
        <nav className="flex overflow-x-auto scrollbar-hide -mb-px">
          {group.children.map((child) => {
            const isActive = child.path === currentPath
            return (
              <Link
                key={child.path}
                to={child.path}
                className={`flex-shrink-0 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-snpe-dark text-snpe-dark'
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                }`}
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
