import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { useTranslation } from 'react-i18next'
import 'swiper/css'

const partners = [
  '/images/partner_1.png',
  '/images/partner_2.png',
  '/images/partner_3.png',
  '/images/partner_4.png',
  '/images/7-1.png',
]

export default function PartnerSlider() {
  const { t } = useTranslation()

  return (
    <section className="py-6 md:py-8 bg-snpe/30 border-t border-snpe-hover/40">
      <div className="max-w-[1440px] mx-auto px-4">
        <h2 className="text-center text-lg md:text-xl font-bold text-snpe-darker uppercase tracking-widest mb-6">
          {t('home.partnersTitle')}
        </h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={32}
          slidesPerView={2}
          breakpoints={{
            544: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
        >
          {partners.map((src, i) => (
            <SwiperSlide key={i} className="flex items-center justify-center py-4">
              <div
                className="group relative p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-snpe-hover/30 cursor-pointer overflow-hidden"
                style={{ perspective: '600px' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-snpe/0 via-snpe/0 to-snpe/0 group-hover:from-snpe/10 group-hover:via-transparent group-hover:to-snpe-dark/10 transition-all duration-500" />
                <img
                  src={src}
                  alt={`Partner ${i + 1}`}
                  className="relative h-14 md:h-20 object-contain mx-auto transition-all duration-500 group-hover:[transform:rotateY(8deg)_rotateX(-4deg)] group-hover:drop-shadow-[0_8px_16px_rgba(109,146,147,0.35)]"
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 rounded-full bg-snpe-dark/0 group-hover:bg-snpe-dark/30 blur-sm transition-all duration-500 group-hover:w-1/2" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
