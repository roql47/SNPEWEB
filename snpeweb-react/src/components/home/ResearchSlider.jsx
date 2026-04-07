import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { useTranslation } from 'react-i18next'
import 'swiper/css'
import 'swiper/css/pagination'

const paperDefs = [
  { titleKey: 'research.paper1title', descKey: 'research.paper1desc', link: 'https://www.kci.go.kr' },
  { titleKey: 'research.paper2title', descKey: 'research.paper2desc', link: 'https://www.kci.go.kr' },
  { titleKey: 'research.paper3title', descKey: 'research.paper3desc', link: 'https://www.kci.go.kr' },
]

export default function ResearchSlider() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-28 bg-snpe-darker">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-4">
          {t('home.researchTitle')}
        </h2>
        <p className="text-white/70 text-center mb-12">
          {t('home.researchDesc')}
        </p>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="research-swiper"
        >
          {paperDefs.map((p, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-4">{t(p.titleKey)}</h3>
                <p className="text-white/80 mb-6">{t(p.descKey)}</p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 rounded-full bg-white text-snpe-darker font-medium text-sm hover:bg-snpe-light transition-colors"
                >
                  {t('home.viewPaper')}
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
