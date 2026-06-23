import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const movements = [
  {
    num: '1',
    titleKey: 'movements.m1title',
    tagsKey: 'movements.m1tags',
    img: '/images/position_1.png',
    imgClass: 'right-0 bottom-0 h-full',
  },
  {
    num: '2',
    titleKey: 'movements.m2title',
    tagsKey: 'movements.m2tags',
    img: '/images/position_2.png',
    imgClass: 'right-0 bottom-0 h-full',
  },
  {
    num: '3',
    titleKey: 'movements.m3title',
    tagsKey: 'movements.m3tags',
    img: '/images/position_3.png',
    imgClass: 'right-0 bottom-0 h-full',
  },
  {
    num: '4',
    titleKey: 'movements.m4title',
    tagsKey: 'movements.m4tags',
    img: '/images/position_4.png',
    imgClass: 'right-0 bottom-0 h-full',
  },
]

export default function MovementCarousel() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-28 bg-[#f9f9f9]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-5xl lg:text-[58px] font-bold text-[#111] mb-5 tracking-[-0.035em] leading-[1.1]">
            SNPE Movement System
          </h2>
          <p className="text-base md:text-xl lg:text-[26px] text-[#111] tracking-[-0.025em]">
            {t('home.movementSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {movements.map((m) => {
            const tags = t(m.tagsKey, { returnObjects: true })

            return (
            <article
              key={m.num}
              className="group relative bg-white rounded-[30px] aspect-[387/261] overflow-hidden hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300 cursor-pointer"
            >
              <div className="absolute top-[14%] left-[9%] right-[9%] z-10">
                <h3 className="text-xl md:text-2xl lg:text-[23px] font-bold text-[#111] tracking-[-0.02em] mb-1">
                  {t('movements.numbered', { number: m.num })}
                </h3>
                <p className="text-sm md:text-base text-[#515151] tracking-[-0.025em] mb-3">
                  {t(m.titleKey)}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
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
                alt={t('movements.numbered', { number: m.num })}
                className={`absolute ${m.imgClass} object-contain pointer-events-none transition-transform duration-500 group-hover:scale-105`}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </article>
            )
          })}
        </div>

        <div className="text-center mt-12 md:mt-14">
          <Link
            to="/baseexercise"
            className="inline-flex items-center gap-2 bg-[#2c2c2c] text-white text-base font-medium tracking-tight rounded-full px-7 py-3.5 hover:bg-black transition-colors"
          >
            {t('home.learnMore')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
