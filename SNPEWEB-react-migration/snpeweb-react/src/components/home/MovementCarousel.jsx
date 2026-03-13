import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Link } from 'react-router-dom'
import 'swiper/css'

const movements = [
  { num: '1번', title: '손 뒤로 깍지 끼고 의자 자세', tags: ['척추', '목 디스크', '허리 건강'], img: '/images/slice_icon_1.png' },
  { num: '2번', title: '무릎 꿇고 다리 묶어 뒤로 눕기', tags: ['골반', '횡격막', '체온 상승'], img: '/images/slice_icon_2.png' },
  { num: '3번', title: '엎드려 무릎 굽혀 다리 들기', tags: ['오다리', '무릎', '힙업'], img: '/images/slice_icon_3.png' },
  { num: '4번', title: '척추 자극주며 구르기', tags: ['척추', '혈액순환', '복근'], img: '/images/img_c.png' },
  { num: 'C-MOVE', title: 'Cervical Movement', tags: ['목', '거북목'], img: '/images/img_c.png' },
  { num: 'L-MOVE', title: 'Lumbar Movement', tags: ['요추 디스크', '일자허리'], img: '/images/img_L.png' },
  { num: 'T-MOVE', title: 'Thoracic Movement', tags: ['어깨', '척추측만증'], img: '/images/img_T.png' },
  { num: 'SC-MOVE', title: 'Sacrum Coccygeal Movement', tags: ['골반', '미추'], img: '/images/img_SC.png' },
]

export default function MovementCarousel() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">
            SNPE main movements
          </h2>
          <Link
            to="/baseexercise"
            className="text-snpe text-sm font-medium hover:underline hidden sm:block"
          >
            전체 보기 →
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
          {movements.map((m, i) => (
            <SwiperSlide key={i}>
              <div className="bg-gray-50 rounded-2xl p-6 h-[260px] flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-snpe text-white text-xs font-bold mb-3">
                    {m.num}
                  </span>
                  <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
                    {m.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {m.tags.map((tag) => (
                      <span key={tag} className="text-xs text-snpe-dark bg-snpe/10 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <img src={m.img} alt={m.title} className="w-16 h-16 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
