import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Quote, Compass, Activity, Anchor, Repeat } from 'lucide-react'

const principleIcons = [Compass, Activity, Anchor, Repeat]
const snpeMeaning = [
  { letter: 'S', word: 'Self' },
  { letter: 'N', word: 'Natural' },
  { letter: 'P', word: 'Posture' },
  { letter: 'E', word: 'Exercise' },
]

const PRINCIPLE_IMGS = [
  '/images/point_1.png',
  '/images/point_4.jpg',
  '/images/point_3.jpg',
  '/images/point_2.png',
]

export default function Philosophy() {
  const { t } = useTranslation()
  const introCards = t('philosophyPage.intro.cards', { returnObjects: true })
  const principles = t('philosophyPage.principles.items', { returnObjects: true })

  return (
    <>
      <PageBanner title={t('pages.philosophy')} subtitle={t('pages.philosophySub')} />

      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-mint-lighter/30">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">
            {t('philosophyPage.intro.eyebrow')}
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-5 leading-tight">
            {t('philosophyPage.intro.title')}
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
            {t('philosophyPage.intro.subtitle')}
          </p>

          <div className="mt-12 max-w-3xl mx-auto text-left bg-white rounded-3xl p-8 md:p-10 border border-mint/20 shadow-sm">
            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-5">
              {t('philosophyPage.intro.lead')}
            </p>
            <div className="grid grid-cols-3 gap-3 my-6">
              {introCards.map((item) => (
                <div key={item.en} className="bg-mint-lighter/40 rounded-2xl py-5 text-center border border-mint/10">
                  <p className="text-xs md:text-sm font-semibold text-mint-darker tracking-wide">
                    {item.en}
                  </p>
                  <p className="text-base md:text-lg font-bold text-gray-900 mt-1">
                    {item.local}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('philosophyPage.intro.body')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">
            {t('philosophyPage.meaning.eyebrow')}
          </p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-3">
            {t('philosophyPage.meaning.title')}
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
            {t('philosophyPage.meaning.body')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {snpeMeaning.map((m) => (
              <div
                key={m.letter}
                className="bg-gradient-to-br from-mint-lighter/40 to-white rounded-2xl py-8 border border-mint/20"
              >
                <p className="text-4xl md:text-5xl font-heading font-bold text-mint-darker mb-2">
                  {m.letter}
                </p>
                <p className="text-sm md:text-base text-gray-700 font-medium">{m.word}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">
              {t('philosophyPage.principles.eyebrow')}
            </p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-gray-900">
              {t('philosophyPage.principles.title')}
            </h2>
            <p className="text-sm md:text-base text-gray-500 mt-3">
              Self Recovery Through Movement
            </p>
          </div>

          <div className="space-y-12 md:space-y-16">
            {principles.map((p, idx) => {
              const Icon = principleIcons[idx]
              return (
                <article
                  key={p.no}
                  className={`grid lg:grid-cols-[1fr_1fr] gap-8 md:gap-10 items-center ${
                    idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div className="rounded-2xl overflow-hidden">
                    <img src={PRINCIPLE_IMGS[idx]} alt={p.en} className="w-full h-auto block" loading="lazy" />
                  </div>

                  <div>
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-5xl md:text-6xl font-heading font-bold text-mint/30 leading-none">
                        {p.no}
                      </span>
                      <Icon className="text-mint-darker" size={24} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-1.5">
                      {p.en}
                    </h3>
                    <p className="text-base md:text-lg text-mint-darker font-medium mb-5">
                      {p.local}
                    </p>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6">
                      {p.body}
                    </p>
                    <div className="border-l-2 border-mint pl-4">
                      <p className="text-sm md:text-base font-heading italic text-mint-darker">
                        "{p.quote}"
                      </p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-br from-mint-darker via-mint-dark to-mint text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Quote size={32} className="text-white/50 mx-auto mb-4" />
          <p className="text-2xl md:text-4xl font-heading font-bold leading-tight">
            Self Recovery Through Movement
          </p>
          <p className="mt-4 text-base md:text-lg text-white/85">
            {t('philosophyPage.closing')}
          </p>
        </div>
      </section>
    </>
  )
}
