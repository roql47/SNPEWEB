import { useLocation } from 'react-router-dom'
import CategoryTabBar from './CategoryTabBar'

const CATEGORY_BANNERS = {
  about: '/images/sub_banner_1.jpg',
  exercise: '/images/sub_banner2.jpg',
  education: '/images/sub_banner3.jpg',
  news: '/images/sub_banner4.jpg',
  support: '/images/sub_banner5.jpg',
}

// 모바일용 배너가 준비되면 아래에 추가
// 예: about: '/images/sub_banner_1_mobile.jpg'
const CATEGORY_BANNERS_MOBILE = {
  // about: '/images/sub_banner_1_mobile.jpg',
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

export default function PageBanner({ title, subtitle, backgroundImage, mobileBackgroundImage }) {
  const { pathname } = useLocation()
  const category = ROUTE_TO_CATEGORY[pathname]

  const pcBg = backgroundImage || (category ? CATEGORY_BANNERS[category] : null)
  const mobileBg = mobileBackgroundImage || (category ? CATEGORY_BANNERS_MOBILE[category] : null) || pcBg

  return (
    <div className="relative -mt-16 lg:-mt-[120px] overflow-hidden">
      {/* 배경 이미지 레이어 — PC */}
      {pcBg ? (
        <>
          {/* 모바일 배경 (768px 미만) */}
          <div
            className="absolute inset-0 block md:hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${mobileBg})` }}
            aria-hidden="true"
          />
          {/* PC 배경 (768px 이상) */}
          <div
            className="absolute inset-0 hidden md:block bg-cover bg-center"
            style={{ backgroundImage: `url(${pcBg})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-snpe-darker to-snpe-dark" aria-hidden="true" />
      )}

      {/* 타이틀 콘텐츠 — 고정 높이, absolute 텍스트로 배너 높이에 영향 없음 */}
      <div className="relative z-10 h-[280px] md:h-[500px] lg:h-[560px]">
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <div className="mt-16 lg:mt-[120px]">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-2 md:mb-3">
              {title}
            </h1>
            {subtitle && (
              <p className="text-white/85 text-sm md:text-lg max-w-2xl mx-auto drop-shadow-md whitespace-pre-line">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* CategoryTabBar */}
      <div className="relative z-20">
        <CategoryTabBar bannerMode />
      </div>
    </div>
  )
}
