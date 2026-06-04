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

        {/* 데스크톱 오버레이 텍스트 (영상 위) */}
        <div className="hidden lg:flex relative z-10 h-full flex-col items-center justify-end px-6 text-center pb-24">
          <div className="mb-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight mb-4">
              Built on Self Recovery
            </h1>
            <p className="text-xl text-white/90 drop-shadow font-medium mb-1">
              움직임을 통해 몸과 삶의 균형을 회복하는 웰니스 시스템
            </p>
            <p className="text-base text-white/70 drop-shadow">
              A movement-based wellness system for restoring balance and well-being
            </p>
          </div>

          <button
            onClick={scrollToContent}
            className="text-white/90 hover:text-white transition-colors"
            aria-label={t('home.scrollDown')}
          >
            <ChevronDown size={40} className="animate-bounce" />
          </button>
        </div>
      </div>

      {/* 모바일 텍스트 (영상 아래) */}
      <div className="lg:hidden bg-gray-900 text-center px-6 pt-8 pb-9">
        <h1 className="text-3xl font-bold text-white leading-tight mb-3">
          Built on Self Recovery
        </h1>
        <p className="text-base text-white/90 font-medium mb-1">
          움직임을 통해 몸과 삶의 균형을 회복하는 웰니스 시스템
        </p>
        <p className="text-sm text-white/60">
          A movement-based wellness system for restoring balance and well-being
        </p>

        <button
          onClick={scrollToContent}
          className="mt-6 text-white/80 hover:text-white transition-colors"
          aria-label={t('home.scrollDown')}
        >
          <ChevronDown size={32} className="animate-bounce mx-auto" />
        </button>
      </div>
    </section>
  )
}
