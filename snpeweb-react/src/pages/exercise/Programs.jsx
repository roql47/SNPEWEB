import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Activity, Waves, Sparkles, User, Users, ArrowRight, Baby, GraduationCap, HeartPulse, Flower2, PersonStanding, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'

const categoryIcons = [Activity, Waves]
const lifecycleIcons = [Baby, GraduationCap, PersonStanding, Flower2, HeartPulse]
const officialCategoryIcons = [Layers, HeartPulse, Activity, Sparkles]
const programTypeIcons = [Users, User]

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
  const officialCategories = t('programsPage.official.categories', { returnObjects: true })

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
                {Array.isArray(officialBody) &&
                  officialBody.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
              </div>
            </div>
          </section>

          {/* PPTX 표형 개요: 4카테고리 · 10프로그램 */}
          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-10">
                <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">
                  {t('programsPage.official.systemTitle')}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                  {t('programsPage.official.systemSubtitle')}
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
                {Array.isArray(officialCategories) &&
                  officialCategories.map((cat, index) => {
                    const Icon = officialCategoryIcons[index] || Layers
                    return (
                      <div
                        key={cat.en}
                        className="rounded-3xl border border-gray-100 bg-gray-50/80 p-5 md:p-6 flex flex-col"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span className="w-9 h-9 rounded-full bg-snpe-darker text-white text-sm font-bold flex items-center justify-center">
                            {cat.no}
                          </span>
                          <div className="w-9 h-9 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center">
                            <Icon size={18} />
                          </div>
                        </div>
                        <p className="text-xs font-semibold tracking-[0.18em] text-snpe-dark">{cat.en}</p>
                        <h3 className="text-lg font-bold text-gray-900 mt-1">{cat.title}</h3>
                        {cat.subtitle && (
                          <p className="text-sm text-gray-500 mt-1 mb-4">{cat.subtitle}</p>
                        )}
                        <ul className="mt-auto space-y-2.5 pt-2 border-t border-gray-200/80">
                          {cat.programs.map((program) => (
                            <li key={program.en} className="text-sm">
                              <p className="font-semibold text-gray-900">{program.en}</p>
                              <p className="text-gray-500">{program.name}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
              </div>
            </div>
          </section>

          {/* 프로그램 상세 안내 */}
          <section className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
              <div className="text-center mb-12">
                <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">PROGRAM DETAIL</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                  {t('programsPage.official.detailTitle')}
                </h3>
              </div>

              <div className="space-y-12">
                {Array.isArray(officialCategories) &&
                  officialCategories.map((cat) => (
                    <div key={`detail-${cat.en}`}>
                      <div className="flex items-center gap-3 mb-5">
                        <span className="px-3 py-1 rounded-full bg-snpe-darker text-white text-xs font-bold tracking-wider">
                          {cat.en}
                        </span>
                        <h4 className="text-lg font-bold text-gray-900">
                          {cat.title}
                          {cat.subtitle ? ` · ${cat.subtitle}` : ''}
                        </h4>
                        <span className="h-px flex-1 bg-gray-200" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        {cat.programs.map((program) => (
                          <div
                            key={program.en}
                            className="bg-white rounded-2xl p-6 border border-gray-100"
                          >
                            <p className="text-xs font-semibold text-snpe-dark tracking-wide">{program.en}</p>
                            <h5 className="text-base md:text-lg font-bold text-gray-900 mt-1 mb-4">
                              {program.name}
                            </h5>
                            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                              <p>
                                <span className="font-semibold text-gray-800">
                                  {t('programsPage.official.targetLabel')}
                                </span>{' '}
                                {program.target}
                              </p>
                              <p>
                                <span className="font-semibold text-gray-800">
                                  {t('programsPage.official.effectLabel')}
                                </span>{' '}
                                {program.effect}
                              </p>
                            </div>
                            {Array.isArray(program.tags) && program.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {program.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-3 py-1 bg-mint-lighter/50 text-snpe-darker text-xs rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
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
                {Array.isArray(programTypes) &&
                  programTypes.map((p, index) => {
                    const Icon = programTypeIcons[index] || User
                    return (
                      <div key={p.en} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center mb-4">
                          <Icon size={22} />
                        </div>
                        <p className="text-xs text-snpe-dark font-semibold">{p.en}</p>
                        <h3 className="text-lg font-bold text-gray-900 mt-1">{p.title}</h3>
                        {p.subtitle && (
                          <p className="text-sm font-medium text-gray-500 mt-1 mb-3">{p.subtitle}</p>
                        )}
                        <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                        {Array.isArray(p.targets) && p.targets.length > 0 && (
                          <>
                            <p className="text-xs font-semibold text-gray-500 mt-5 mb-2">
                              {t('programsPage.official.recommendationLabel')}
                            </p>
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
