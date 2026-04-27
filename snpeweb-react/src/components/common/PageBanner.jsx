import { useLocation } from 'react-router-dom'
import CategoryTabBar from './CategoryTabBar'

// 정식 5장 수령 시 아래 값만 카테고리별 파일명으로 교체하면 됨
// 예: about: '/images/banner-about.jpg'
const CATEGORY_BANNERS = {
  about: '/images/sub_banner_1.jpg',
  exercise: '/images/sub_banner_1.jpg',
  education: '/images/sub_banner_1.jpg',
  news: '/images/sub_banner_1.jpg',
  support: '/images/sub_banner_1.jpg',
}

const ROUTE_TO_CATEGORY = {
  '/about': 'about',
  '/history': 'about',
  '/bi': 'about',
  '/certification': 'about',
  '/intellectual-property': 'about',
  '/research': 'about',
  '/beginnerguide': 'exercise',
  '/snpeapp': 'exercise',
  '/baseexercise': 'exercise',
  '/experiencecase': 'exercise',
  '/degree': 'education',
  '/level1': 'education',
  '/level2': 'education',
  '/level3': 'education',
  '/master': 'education',
  '/companyclass': 'education',
  '/culturecenter': 'education',
  '/training': 'education',
  '/notice': 'news',
  '/news': 'news',
  '/activity': 'news',
  '/search-center': 'support',
  '/studio': 'support',
  '/certification-teacher': 'support',
  '/franchise': 'support',
  '/faq': 'support',
  '/customerinquiry': 'support',
  '/online': 'support',
}

export default function PageBanner({ title, subtitle, backgroundImage }) {
  const { pathname } = useLocation()
  const category = ROUTE_TO_CATEGORY[pathname]
  const resolvedBg = backgroundImage || (category ? CATEGORY_BANNERS[category] : null)

  const bgStyle = resolvedBg
    ? { backgroundImage: `url(${resolvedBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {}

  return (
    <>
      <section
        className={`text-white py-16 md:py-24 relative ${!resolvedBg ? 'bg-gradient-to-br from-snpe-darker to-snpe-dark' : ''}`}
        style={bgStyle}
      >
        {resolvedBg && <div className="absolute inset-0 bg-black/40" />}
        <div className="max-w-[1440px] mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">{title}</h1>
          {subtitle && (
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      </section>
      <CategoryTabBar />
    </>
  )
}
