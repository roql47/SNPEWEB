import { useTranslation } from 'react-i18next'

const effectKeys = [
  { icon: '/images/main_icon1.png', titleKey: 'home.effectEmotional' },
  { icon: '/images/main_icon2.png', titleKey: 'home.effectPhysio' },
  { icon: '/images/main_icon3.png', titleKey: 'home.effectPositive' },
  { icon: '/images/main_icon4.png', titleKey: 'home.effectCorrect' },
  { icon: '/images/main_icon5.png', titleKey: 'home.effectPain' },
  { icon: '/images/main_icon6.png', titleKey: 'home.effectPhysical' },
]

export default function EffectList() {
  const { t } = useTranslation()

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {effectKeys.map((e, i) => {
            const title = t(e.titleKey)
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 bg-white rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full bg-snpe-light/30 flex items-center justify-center mb-4">
                  <img src={e.icon} alt={title} className="w-12 h-12 object-contain" />
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">{title}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
