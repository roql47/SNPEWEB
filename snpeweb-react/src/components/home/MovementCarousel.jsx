import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const movements = [
  {
    num: '1',
    title: '손 뒤로 깍지끼고 의자 자세',
    tags: ['척추', '목 디스크', '허리 건강'],
    img: '/images/movement-1.png',
    imgClass: 'w-[42%] right-0 bottom-0',
  },
  {
    num: '2',
    title: '무릎 꿇고 다리 묶어 뒤로 눕기',
    tags: ['골반', '횡격막', '체온 상승'],
    img: '/images/movement-2.png',
    imgClass: 'w-[55%] right-2 bottom-0',
  },
  {
    num: '3',
    title: '엎드려 무릎 굽혀 다리 들기',
    tags: ['오다리', '무릎', '힙업'],
    img: '/images/movement-3.png',
    imgClass: 'w-[48%] right-2 bottom-2',
  },
  {
    num: '4',
    title: '척추 자극주며 구르기',
    tags: ['척추', '혈액순환', '복근'],
    img: '/images/movement-4.png',
    imgClass: 'w-[40%] right-2 bottom-0',
  },
]

export default function MovementCarousel() {
  return (
    <section className="py-20 md:py-28 bg-[#f9f9f9]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-5xl lg:text-[58px] font-bold text-[#111] mb-5 tracking-[-0.035em] leading-[1.1]">
            SNPE Movement System
          </h2>
          <p className="text-base md:text-xl lg:text-[26px] text-[#111] tracking-[-0.025em]">
            기본 동작을 따라하며 몸의 변화를 경험해보세요
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {movements.map((m) => (
            <article
              key={m.num}
              className="group relative bg-white rounded-[30px] aspect-[387/261] overflow-hidden hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300 cursor-pointer"
            >
              <div className="absolute top-[14%] left-[9%] right-[9%] z-10">
                <h3 className="text-xl md:text-2xl lg:text-[23px] font-bold text-[#111] tracking-[-0.02em] mb-1">
                  {m.num}번 동작
                </h3>
                <p className="text-sm md:text-base text-[#515151] tracking-[-0.025em] mb-3">
                  {m.title}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {m.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] md:text-xs text-[#757d86] bg-[#f0f1f4]/80 px-2 py-1 rounded-[10px] leading-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <img
                src={m.img}
                alt={`${m.num}번 동작`}
                className={`absolute ${m.imgClass} object-contain pointer-events-none transition-transform duration-500 group-hover:scale-105`}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </article>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-14">
          <Link
            to="/baseexercise"
            className="inline-flex items-center gap-2 bg-[#2c2c2c] text-white text-base font-medium tracking-tight rounded-full px-7 py-3.5 hover:bg-black transition-colors"
          >
            자세히 보기
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
