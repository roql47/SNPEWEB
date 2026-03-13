import { ChevronDown } from 'lucide-react'

export default function HeroSlider() {
  const scrollToContent = () => {
    const el = document.getElementById('main-carousel')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <img
          src="/images/mainVideo_title.png"
          alt="SNPE - 바른자세 바른체형 바른건강"
          className="w-[280px] sm:w-[400px] md:w-[560px] lg:w-[700px] mb-8"
        />
        <button
          onClick={scrollToContent}
          className="mt-8 animate-bounce text-white/80 hover:text-white transition-colors"
          aria-label="아래로 스크롤"
        >
          <ChevronDown size={40} />
        </button>
      </div>
    </section>
  )
}
