import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function HeroSlider() {
  const { t } = useTranslation()

  const scrollToContent = () => {
    const el = document.getElementById('about-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative w-full h-screen min-h-[720px] overflow-hidden -mt-16 lg:-mt-[120px]">
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

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <p className="mt-6 text-white/95 text-base md:text-lg lg:text-xl leading-relaxed drop-shadow-md">
          New paradigm exercise Therapy
          <br />
          Using SNPE belts and props
        </p>

        <button
          onClick={scrollToContent}
          className="mt-16 text-white/90 hover:text-white transition-colors"
          aria-label={t('home.scrollDown')}
        >
          <ChevronDown size={40} className="animate-bounce" />
        </button>
      </div>
    </section>
  )
}
