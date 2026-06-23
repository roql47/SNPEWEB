import { useTranslation } from 'react-i18next'

const benefits = [
  {
    icon: '/images/benefits/emotional.png',
    titleKey: 'home.benefits.emotional.title',
    descKey: 'home.benefits.emotional.desc',
  },
  {
    icon: '/images/benefits/physio.png',
    titleKey: 'home.benefits.physio.title',
    descKey: 'home.benefits.physio.desc',
  },
  {
    icon: '/images/benefits/positive.png',
    titleKey: 'home.benefits.positive.title',
    descKey: 'home.benefits.positive.desc',
  },
  {
    icon: '/images/benefits/posture.png',
    titleKey: 'home.benefits.posture.title',
    descKey: 'home.benefits.posture.desc',
  },
  {
    icon: '/images/benefits/pain.png',
    titleKey: 'home.benefits.pain.title',
    descKey: 'home.benefits.pain.desc',
  },
  {
    icon: '/images/benefits/body.png',
    titleKey: 'home.benefits.body.title',
    descKey: 'home.benefits.body.desc',
  },
]

export default function EffectList() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-mint-darker text-xs md:text-sm font-semibold uppercase tracking-[0.25em] mb-3">
            Benefits
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
            Wellness Benefits
          </h2>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            {t('home.benefitsIntroLine1')}
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>
            {t('home.benefitsIntroLine2')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 md:gap-y-16">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 mb-5 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                <img
                  src={b.icon}
                  alt={t(b.titleKey)}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 tracking-tight">
                {t(b.titleKey)}
              </h3>
              <p className="text-sm md:text-[15px] text-gray-500 leading-relaxed whitespace-pre-line">
                {t(b.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
