import { useTranslation } from 'react-i18next'

const effectKeys = [
  { icon: '/images/main_icon1.png', titleKey: 'home.effectEmotional', en: 'Emotional Stability' },
  { icon: '/images/main_icon2.png', titleKey: 'home.effectPhysio', en: 'Physiological Effect' },
  { icon: '/images/main_icon3.png', titleKey: 'home.effectPositive', en: 'Positive Mind' },
  { icon: '/images/main_icon4.png', titleKey: 'home.effectCorrect', en: 'Orthodontic Effect' },
  { icon: '/images/main_icon5.png', titleKey: 'home.effectPain', en: 'Pain Relief' },
  { icon: '/images/main_icon6.png', titleKey: 'home.effectPhysical', en: 'Physical Improvement' },
]

export default function EffectList() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <p className="text-mint-darker text-xs md:text-sm font-semibold uppercase tracking-[0.25em] mb-3">
            Benefits
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Wellness Benefits
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            SNPE 셀프 운동으로 얻을 수 있는 6가지 건강 효과
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6">
          {effectKeys.map((e, i) => {
            const title = t(e.titleKey)
            return (
              <div
                key={i}
                className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white hover:bg-mint-lighter transition-all duration-300"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-mint-lighter group-hover:bg-white flex items-center justify-center mb-4 transition-colors duration-300">
                  <img src={e.icon} alt={title} className="w-12 h-12 md:w-14 md:h-14 object-contain" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-gray-800 mb-1">{title}</h3>
                <p className="text-[11px] md:text-xs text-mint-darker font-medium uppercase tracking-wider">
                  {e.en}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
