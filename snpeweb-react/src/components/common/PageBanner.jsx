import { useLocation } from 'react-router-dom'
import CategoryTabBar from './CategoryTabBar'

// 정식 5장 수령 시 아래 값만 카테고리별 파일명으로 교체하면 됨
// 예: about: '/images/banner-about.jpg'
const CATEGORY_BANNERS = {
  about: '/images/sub_banner_1.jpg',
  exercise: '/images/sub_banner2.jpg',
  education: '/images/sub_banner3.jpg',
  news: '/images/sub_banner4.jpg',
  support: '/images/sub_banner5.jpg',
}

const ROUTE_TO_CATEGORY = {
  '/about': 'about',
  '/philosophy': 'about',
  '/history': 'about',
  '/brand-assets': 'about',
  '/bi': 'about',
  '/certification': 'about',
  '/intellectual-property': 'about',
  '/research': 'about',
  '/beginnerguide': 'exercise',
  '/snpeapp': 'exercise',
  '/baseexercise': 'exercise',
  '/experiencecase': 'exercise',
  '/snpe-experience': 'exercise',
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
    ? { backgroundImage: `url(${resolvedBg})`, backgroundSize: 'cover', backgroundPosition: 'center top' }
    : {}

  return (
    <div
      className={`relative -mt-16 lg:-mt-[120px] overflow-hidden ${!resolvedBg ? 'bg-gradient-to-br from-snpe-darker to-snpe-dark' : ''}`}
      style={bgStyle}
    >
      {/* 어두운 오버레이 */}
      {resolvedBg && <div className="absolute inset-0 bg-black/45" />}

      {/* 타이틀 콘텐츠 */}
      <section className="relative z-10 text-white flex items-center justify-center w-full min-h-[420px] md:min-h-[500px] lg:min-h-[560px]">
        <div className="max-w-[1440px] w-full mx-auto px-4 text-center pt-28 md:pt-36 lg:pt-44 pb-12 md:pb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg mb-3">{title}</h1>
          {subtitle && (
            <p className="text-white/85 text-base md:text-lg max-w-2xl mx-auto drop-shadow-md whitespace-pre-line">{subtitle}</p>
          )}
        </div>
      </section>

      {/* CategoryTabBar — 배너 이미지 위에 올라타도록 내부에 배치 */}
      <div className="relative z-20">
        <CategoryTabBar bannerMode />
      </div>
    </div>
  )
}
