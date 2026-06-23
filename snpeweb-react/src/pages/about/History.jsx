import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Award, Wrench, GraduationCap, Globe2, Sparkles, ArrowRight } from 'lucide-react'

const ERA_MEDIA = {
  'snpe-1': { image: '/images/history/snpe-1.png' },
  'snpe-2': {
    image: '/images/history/snpe-2.png',
    book: { image: '/images/history/book-snpe-spine.png' },
  },
}

function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function History() {
  const { t } = useTranslation()
  const eras = t('historyPage.eras', { returnObjects: true })
  const labels = t('historyPage.labels', { returnObjects: true })

  return (
    <>
      <PageBanner title={t('pages.evolution')} subtitle={t('pages.evolutionSub')} />

      <section className="py-20 md:py-24 bg-gradient-to-b from-white to-mint-lighter/30">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">The Evolution of SNPE</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-4 leading-tight whitespace-pre-line">
            {t('historyPage.hero.title')}
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">{t('historyPage.hero.desc1')}</p>
          <p className="mt-3 text-sm md:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed">{t('historyPage.hero.desc2')}</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-center text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-3">Evolution Overview</h3>
          <div className="grid md:grid-cols-3 gap-5">
            {eras.map((era) => (
              <button
                key={era.id}
                onClick={() => scrollToId(era.id)}
                className="group text-left bg-gradient-to-br from-mint-lighter/40 to-white rounded-3xl p-7 border border-mint/20 hover:border-mint hover:shadow-lg transition-all flex flex-col"
              >
                <p className="text-xs font-semibold tracking-widest text-mint-darker mb-2">{era.period}</p>
                <p className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">{era.badge}</p>
                <p className="text-sm md:text-base font-medium text-mint-darker mb-3">{era.title}</p>
                <span className="inline-flex items-center gap-1 text-xs text-gray-500 group-hover:text-mint-darker transition-colors mt-auto">
                  {labels.viewDetails} <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {eras.map((era, idx) => {
        const media = ERA_MEDIA[era.id] || {}
        return (
          <section key={era.id} id={era.id} className={`py-20 md:py-28 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} scroll-mt-24`}>
            <div className="max-w-5xl mx-auto px-4">
              <div className="mb-10 md:mb-14">
                <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-2">{era.period}</p>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-2">{era.badge}</h2>
                <p className="text-lg md:text-2xl text-mint-darker font-medium mb-5">{era.title}</p>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl">{era.summary}</p>

                {media.image && (
                  <div className={`mt-8 grid gap-5 items-center max-w-3xl ${media.book ? 'md:grid-cols-2' : ''}`}>
                    <figure className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm text-center">
                      <img
                        src={media.image}
                        alt={`${era.badge} ${labels.imageAlt}`}
                        className={media.book ? 'w-full h-auto block max-h-[280px] object-contain p-3' : 'w-full h-auto block'}
                        loading="lazy"
                      />
                    </figure>
                    {media.book && era.book && (
                      <figure className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm text-center">
                        <img
                          src={media.book.image}
                          alt={era.book.title}
                          className="w-full h-auto block max-h-[280px] object-contain p-3"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.closest('figure').style.display = 'none'
                          }}
                        />
                        <figcaption className="px-3 pb-3 -mt-1">
                          <p className="text-sm font-bold text-gray-900">{era.book.title}</p>
                          <p className="text-xs text-gray-500">{era.book.caption}</p>
                        </figcaption>
                      </figure>
                    )}
                  </div>
                )}
              </div>

              <HistoryList icon={<Sparkles size={18} className="text-mint-darker" />} title="Major Evolution" items={era.evolution} />
              {era.academic && <HistoryList icon={<GraduationCap size={18} className="text-mint-darker" />} title="Academic & Educational Expansion" items={era.academic} />}
              {era.milestones?.length > 0 && <Milestones items={era.milestones} />}
              {era.tools?.length > 0 && <Pills icon={<Wrench size={18} className="text-mint-darker" />} title={era.id === 'snpe-1' ? 'Early Tools' : 'Tool Innovation'} items={era.tools} />}
              {era.future && <HistoryList icon={<ArrowRight size={18} className="text-mint-darker" />} title="Future Direction" items={era.future} accent />}
              {era.global && <GlobalExpansion items={era.global} />}
            </div>
          </section>
        )
      })}

      <section className="py-16 md:py-20 bg-gradient-to-br from-mint-darker via-mint-dark to-mint text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-white/70 mb-4">Vision</p>
          <p className="text-2xl md:text-4xl font-heading font-bold leading-tight mb-4">{t('historyPage.vision.title')}</p>
          <p className="text-sm md:text-base text-white/85 leading-relaxed">{t('historyPage.vision.desc')}</p>
        </div>
      </section>
    </>
  )
}

function HistoryList({ icon, title, items, accent = false }) {
  return (
    <div className="mb-10">
      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-gray-900 mb-4">{icon} {title}</h3>
      <div className="grid sm:grid-cols-2 gap-2.5">
        {items.map((item) => (
          <div key={item} className={`flex items-start gap-2.5 ${accent ? 'bg-gradient-to-br from-mint-lighter/40 to-white border-mint/20' : 'bg-white border-gray-100'} rounded-xl px-4 py-3 border`}>
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-mint-darker flex-shrink-0" />
            <span className="text-sm text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Milestones({ items }) {
  return (
    <div className="mb-10">
      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-gray-900 mb-4"><Award size={18} className="text-mint-darker" /> Historical Milestones</h3>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {items.map((m, i) => (
          <div key={`${m.year}-${i}`} className="grid grid-cols-[80px_1fr] items-center px-5 py-4 border-b border-gray-100 last:border-0">
            <span className="text-sm md:text-base font-bold text-mint-darker">{m.year}</span>
            <span className="text-sm md:text-base text-gray-700">{m.event}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Pills({ icon, title, items }) {
  return (
    <div className="mb-10">
      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-gray-900 mb-4">{icon} {title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => <span key={item} className="px-4 py-2 bg-mint-lighter/60 text-mint-darker text-sm rounded-full border border-mint/20">{item}</span>)}
      </div>
    </div>
  )
}

function GlobalExpansion({ items }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-gray-900 mb-4"><Globe2 size={18} className="text-mint-darker" /> Global Expansion</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((g) => (
          <div key={g.region} className="bg-white rounded-2xl p-5 text-center border border-gray-100">
            <p className="text-base md:text-lg font-bold text-gray-900">{g.region}</p>
            <p className="text-xs text-gray-500 mt-1">{g.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
