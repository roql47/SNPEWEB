import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function HeroSlider() {
  const { t } = useTranslation()

  const scrollToContent = () => {
    const el = document.getElementById('about-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative w-full overflow-hidden -mt-16 lg:-mt-[120px]">
      {/* 영상: 모바일은 16:9(전체 노출), 데스크톱은 풀스크린 */}
      <div className="relative w-full aspect-video lg:aspect-auto lg:h-screen lg:min-h-[720px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/intro_3.mp4" type="video/mp4" />
          <source src="/videos/intro2.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/25" />

        {/* 오버레이 텍스트 (영상 위) — 모바일은 작게, 데스크톱은 크게 */}
        <div className="relative z-10 h-full flex flex-col items-center justify-end px-4 text-center pb-4 sm:pb-6 md:pb-24">
          <div className="mb-2 md:mb-8">
            <h1 className="text-lg sm:text-2xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight mb-1 md:mb-4">
              {t('home.heroTitle')}
            </h1>
            <p className="text-xs sm:text-base md:text-xl text-white/90 drop-shadow font-medium mb-0.5 md:mb-1">
              {t('home.heroSubtitle')}
            </p>
            <p className="text-[10px] sm:text-sm md:text-base text-white/70 drop-shadow">
              {t('home.heroDescription')}
            </p>
          </div>

          <button
            onClick={scrollToContent}
            className="hidden md:block text-white/90 hover:text-white transition-colors"
            aria-label={t('home.scrollDown')}
          >
            <ChevronDown size={40} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  )
}
