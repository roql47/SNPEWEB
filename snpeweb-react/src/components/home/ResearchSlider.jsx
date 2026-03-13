import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const papers = [
  {
    title: '[논문] 경추와 어깨 통증 완화에 탁월한 SNPE 운동',
    desc: 'SNPE 운동이 경추 및 어깨 통증 감소에 미치는 효과에 관한 연구',
    link: 'https://www.kci.go.kr',
  },
  {
    title: '[논문] 스트레스와 통증 감소에 탁월한 SNPE 운동',
    desc: 'SNPE 운동이 스트레스 지표 및 만성 통증에 미치는 영향',
    link: 'https://www.kci.go.kr',
  },
  {
    title: '[논문] SNPE 2번, 3번 동작이 잘 될수록 허리, 골반 통증이 감소된다',
    desc: 'SNPE 기본동작 수행도와 요통/골반통의 상관관계 연구',
    link: 'https://www.kci.go.kr',
  },
]

export default function ResearchSlider() {
  return (
    <section className="py-20 md:py-28 bg-snpe">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Our research value
        </h2>
        <p className="text-white/70 text-center mb-12">
          SNPE 운동의 과학적 효과를 입증하는 연구논문
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
          {papers.map((p, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-4">{p.title}</h3>
                <p className="text-white/80 mb-6">{p.desc}</p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 rounded-full bg-snpe-research text-snpe-darker font-medium text-sm hover:bg-white transition-colors"
                >
                  논문 보기 →
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
