import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import 'swiper/css'

const movementDefs = [
  { numKey: 'movements.m1num', titleKey: 'movements.m1title', tagsKey: 'movements.m1tags', img: '/images/slice_icon_1.png' },
  { numKey: 'movements.m2num', titleKey: 'movements.m2title', tagsKey: 'movements.m2tags', img: '/images/slice_icon_2.png' },
  { numKey: 'movements.m3num', titleKey: 'movements.m3title', tagsKey: 'movements.m3tags', img: '/images/slice_icon_3.png' },
  { numKey: 'movements.m4num', titleKey: 'movements.m4title', tagsKey: 'movements.m4tags', img: '/images/img_c.png' },
  { numKey: 'C-MOVE', titleKey: 'movements.cmTitle', tagsKey: 'movements.cmTags', img: '/images/img_c.png' },
  { numKey: 'L-MOVE', titleKey: 'movements.lmTitle', tagsKey: 'movements.lmTags', img: '/images/img_L.png' },
  { numKey: 'T-MOVE', titleKey: 'movements.tmTitle', tagsKey: 'movements.tmTags', img: '/images/img_T.png' },
  { numKey: 'SC-MOVE', titleKey: 'movements.scTitle', tagsKey: 'movements.scTags', img: '/images/img_SC.png' },
]

export default function MovementCarousel() {
  const { t } = useTranslation()

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">
            {t('home.movementTitle')}
          </h2>
          <Link
            to="/baseexercise"
            className="text-snpe-dark text-sm font-medium hover:underline hidden sm:block"
          >
            {t('home.viewAll')}
          </Link>
        </div>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1.5}
          breakpoints={{
            544: { slidesPerView: 2.5 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
        >
          {movementDefs.map((m, i) => {
            const num = m.numKey.startsWith('movements.') ? t(m.numKey) : m.numKey
            const title = t(m.titleKey)
            const tags = t(m.tagsKey, { returnObjects: true })
            return (
              <SwiperSlide key={i}>
                <div className="bg-gray-50 rounded-2xl p-6 h-[260px] flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-snpe-darker text-white text-xs font-bold mb-3">
                      {num}
                    </span>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
                      {title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {Array.isArray(tags) && tags.map((tag) => (
                        <span key={tag} className="text-xs text-snpe-darker bg-snpe-dark/10 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <img src={m.img} alt={title} className="w-16 h-16 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}
