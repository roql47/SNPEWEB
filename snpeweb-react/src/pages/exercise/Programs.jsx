import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Activity, Waves, Sparkles, User, Users, ArrowRight, Baby, GraduationCap, HeartPulse, Flower2, PersonStanding } from 'lucide-react'
import { Link } from 'react-router-dom'

const categoryIcons = [Activity, Waves]
const lifecycleIcons = [Baby, GraduationCap, PersonStanding, Flower2, HeartPulse]
const programTypeIcons = [User, Users]

const TABS = [
  { id: 'snpe', key: 'programsPage.tabs.snpe' },
  { id: 'official', key: 'programsPage.tabs.official' },
]

export default function Programs() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('snpe')
  const categories = t('programsPage.snpe.categories', { returnObjects: true })
  const introBody = t('programsPage.snpe.introBody', { returnObjects: true })
  const lifecyclePrograms = t('programsPage.snpe.lifecycle.items', { returnObjects: true })
  const officialBody = t('programsPage.official.introBody', { returnObjects: true })
  const programTypes = t('programsPage.official.types', { returnObjects: true })
  const classGroups = t('programsPage.official.classGroups', { returnObjects: true })

  return (
    <>
      <PageBanner title={t('pages.programs')} subtitle={t('pages.programsSub')} />

      <div className="sticky top-16 lg:top-20 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-center gap-2 md:gap-4">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 md:px-8 py-4 text-sm md:text-base font-semibold tracking-tight transition-colors ${
                  activeTab === tab.id ? 'text-snpe-dark' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {t(tab.key)}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-snpe-dark rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === 'snpe' && (
        <>
          <section className="py-16 md:py-24 bg-gradient-to-b from-white to-mint-lighter/30">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">SNPE PROGRAM</p>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-5 leading-snug">
                {t('programsPage.snpe.introTitle')}
              </h2>
              <div className="space-y-3 text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {introBody.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4 space-y-12">
              {categories.map((cat, index) => {
                const Icon = categoryIcons[index] || Activity
                return (
                  <div key={cat.no} className="bg-gray-50 rounded-3xl p-7 md:p-10 border border-gray-100">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center flex-shrink-0">
                        <Icon size={22} />
                      </div>
                      <div>
                        <p className="text-xs text-snpe-dark font-semibold">{cat.no}. {cat.en}</p>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{cat.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">{cat.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((it) => (
                        <span key={it} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs md:text-sm text-gray-700">
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center flex-shrink-0">
                  <Sparkles size={22} />
                </div>
                <div>
                  <p className="text-xs text-snpe-dark font-semibold">03. Wellness Programs</p>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">{t('programsPage.snpe.lifecycle.title')}</h3>
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-8 max-w-3xl">
                {t('programsPage.snpe.lifecycle.desc')}
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {lifecyclePrograms.map((p, index) => {
                  const Icon = lifecycleIcons[index] || Sparkles
                  return (
                    <div key={p.en} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="w-11 h-11 rounded-xl bg-mint-lighter/60 text-snpe-dark flex items-center justify-center mb-4">
                        <Icon size={20} />
                      </div>
                      <p className="text-xs text-snpe-dark font-semibold">{p.en}</p>
                      <h4 className="text-base font-bold text-gray-900 mb-2">{p.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                    </div>
                  )
                })}
              </div>

              <p className="mt-8 text-sm text-gray-500 leading-relaxed bg-white border border-gray-100 rounded-2xl p-5">
                {t('programsPage.snpe.lifecycle.note')}
              </p>
            </div>
          </section>
        </>
      )}

      {activeTab === 'official' && (
        <>
          <section className="py-16 md:py-24 bg-gradient-to-b from-white to-mint-lighter/30">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">SNPE OFFICIAL PROGRAM</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">{t('programsPage.official.introTitle')}</h2>
              <div className="space-y-3 text-gray-600 leading-relaxed max-w-2xl mx-auto text-left md:text-center">
                {officialBody.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4">
              <div className="text-center mb-12">
                <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">PROGRAM TYPE</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">{t('programsPage.official.typeTitle')}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {programTypes.map((p, index) => {
                  const Icon = programTypeIcons[index] || User
                  return (
                    <div key={p.en} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                      <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center mb-4">
                        <Icon size={22} />
                      </div>
                      <p className="text-xs text-snpe-dark font-semibold">{p.en}</p>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{p.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                      {p.targets.length > 0 && (
                        <>
                          <p className="text-xs font-semibold text-gray-500 mt-5 mb-2">{t('programsPage.official.recommendationLabel')}</p>
                          <ul className="space-y-1.5">
                            {p.targets.map((tg) => (
                              <li key={tg} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-snpe-dark flex-shrink-0" />
                                {tg}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
              <div className="text-center mb-12">
                <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">SNPE CENTER PROGRAMS</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">{t('programsPage.official.centerTitle')}</h3>
              </div>
              <div className="space-y-10">
                {classGroups.map((g) => (
                  <div key={g.title}>
                    <h3 className="text-lg font-bold text-snpe-dark mb-4 flex items-center gap-2">
                      {g.title}
                      <span className="h-px flex-1 bg-gray-200" />
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {g.items.map((it) => (
                        <div key={it.no} className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100">
                          <span className="w-8 h-8 rounded-full bg-snpe-darker text-white text-sm flex items-center justify-center font-bold flex-shrink-0">
                            {it.no}
                          </span>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">{it.name}</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">{it.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-14 text-center">
                <Link
                  to="/search-center"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-snpe-darker text-white rounded-full font-medium hover:bg-snpe-dark transition-colors"
                >
                  {t('programsPage.official.findCenter')} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}
