import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { dataStore } from '../../lib/dataStore'
import { sanitizeHtml } from '../../lib/sanitize'
import { Quote, X, ChevronRight, Sparkles, HeartPulse, Activity, MapPin } from 'lucide-react'

const highlightIcons = [Sparkles, HeartPulse, Activity]

export default function ExperienceCase() {
  const { t } = useTranslation()
  const [cases, setCases] = useState([])
  const [selected, setSelected] = useState(null)
  const highlights = t('experienceCasePage.highlights', { returnObjects: true })

  useEffect(() => { dataStore.getExperienceCases().then(setCases) }, [])

  const hasDetail = (c) => !!(c.detail || c.image_url)

  return (
    <>
      <PageBanner
        title={t('pages.experienceCase')}
        subtitle={t('pages.experienceCaseSub')}
      />

      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-mint-lighter/30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">
              SNPE EXPERIENCE
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t('experienceCasePage.heroTitle')}
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
              {t('experienceCasePage.heroDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((h, index) => {
              const Icon = highlightIcons[index] || Sparkles
              return (
                <div
                  key={h.title}
                  className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-mint-lighter/60 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-mint-darker" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{h.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{h.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          {cases.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((c) => (
                <article
                  key={c.id}
                  onClick={() => hasDetail(c) && setSelected(c)}
                  className={`bg-white border border-gray-100 rounded-2xl p-6 transition-all ${
                    hasDetail(c)
                      ? 'hover:shadow-lg hover:-translate-y-0.5 cursor-pointer'
                      : ''
                  }`}
                >
                  <Quote size={24} className="text-snpe/30 mb-4" />
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-4">
                    &ldquo;{c.content}&rdquo;
                  </p>
                  <div className="border-t border-gray-100 pt-4 flex items-end justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{c.name} · {c.age}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <span className="bg-snpe-dark/10 text-snpe-dark px-2 py-0.5 rounded-full">{c.issue}</span>
                        <span>{t('experienceCasePage.periodLabel')}: {c.period}</span>
                      </div>
                    </div>
                    {hasDetail(c) && (
                      <span className="flex items-center gap-0.5 text-xs text-snpe-dark font-medium flex-shrink-0">
                        {t('experienceCasePage.readMore')} <ChevronRight size={14} />
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Quote size={36} className="text-snpe/20 mx-auto mb-4" />
              <p className="text-gray-500 text-sm md:text-base">
                {t('experienceCasePage.empty')}
              </p>
            </div>
          )}

          <div className="mt-14 bg-mint-lighter/40 rounded-2xl p-8 md:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                {t('experienceCasePage.ctaTitle')}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                {t('experienceCasePage.ctaDesc')}
              </p>
            </div>
            <Link
              to="/search-center"
              className="inline-flex items-center gap-2 bg-mint-darker text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-mint-dark transition-colors flex-shrink-0"
            >
              <MapPin size={16} /> {t('experienceCasePage.ctaButton')}
            </Link>
          </div>
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div>
                <p className="font-bold text-gray-900">{selected.name} · {selected.age}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span className="bg-snpe-dark/10 text-snpe-dark px-2 py-0.5 rounded-full">{selected.issue}</span>
                  <span>{t('experienceCasePage.periodLabel')}: {selected.period}</span>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
                aria-label={t('common.close')}
              >
                <X size={18} />
              </button>
            </div>

            {selected.image_url && (
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={selected.image_url}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
              <Quote size={20} className="text-snpe/30 mb-2" />
              <p className="text-gray-600 leading-relaxed italic">
                &ldquo;{selected.content}&rdquo;
              </p>
            </div>

            {selected.detail ? (
              <div
                className="rt-content px-6 py-6 text-sm text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(selected.detail) }}
              />
            ) : (
              <div className="px-6 py-6 text-sm text-gray-400 text-center">
                {t('experienceCasePage.noDetail')}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
