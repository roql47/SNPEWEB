import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Play, ArrowUpRight } from 'lucide-react'

const mainExercises = [
  {
    numKey: 'movements.numbered',
    titleKey: 'movements.m1title',
    descKey: 'baseExercisePage.main.1.desc',
    tagsKey: 'movements.m1tags',
    number: '1',
    image: '/images/position_5.png',
    videoUrl: 'https://www.youtube.com/watch?v=w-jiKlSevuY&t=1s',
  },
  {
    numKey: 'movements.numbered',
    titleKey: 'movements.m2title',
    descKey: 'baseExercisePage.main.2.desc',
    tagsKey: 'movements.m2tags',
    number: '2',
    image: '/images/position_2.png',
    videoUrl: 'https://www.youtube.com/watch?v=9lUfciyCkvE',
  },
  {
    numKey: 'movements.numbered',
    titleKey: 'movements.m3title',
    descKey: 'baseExercisePage.main.3.desc',
    tagsKey: 'movements.m3tags',
    number: '3',
    image: '/images/position_3.png',
    videoUrl: 'https://www.youtube.com/watch?v=BhuQEqhFMCE',
  },
  {
    numKey: 'movements.numbered',
    titleKey: 'movements.m4title',
    descKey: 'baseExercisePage.main.4.desc',
    tagsKey: 'movements.m4tags',
    number: '4',
    image: '/images/position_6.png',
    videoUrl: 'https://www.youtube.com/watch?v=YtDH2NKSBpw',
  },
]

const moveExercises = [
  {
    code: 'C-MOVE',
    title: 'Cervical Movement',
    localTitleKey: 'baseExercisePage.core.c.title',
    descKey: 'baseExercisePage.core.c.desc',
    tagsKey: 'baseExercisePage.core.c.tags',
    image: '/images/C-move.png',
    videoUrl: 'https://www.youtube.com/watch?v=ovm52F2v7a4',
  },
  {
    code: 'T-MOVE',
    title: 'Thoracic Movement',
    localTitleKey: 'baseExercisePage.core.t.title',
    descKey: 'baseExercisePage.core.t.desc',
    tagsKey: 'baseExercisePage.core.t.tags',
    image: '/images/T-move.png',
    videoUrl: 'https://www.youtube.com/@SNPElife/search?query=t%20move',
  },
  {
    code: 'L-MOVE',
    title: 'Lumbar Movement',
    localTitleKey: 'baseExercisePage.core.l.title',
    descKey: 'baseExercisePage.core.l.desc',
    tagsKey: 'baseExercisePage.core.l.tags',
    image: '/images/L-move.png',
    videoUrl: 'https://www.youtube.com/watch?v=euNrnJ4Z4Fc',
  },
  {
    code: 'SC-MOVE',
    title: 'Sacrum Coccygeal Movement',
    localTitleKey: 'baseExercisePage.core.sc.title',
    descKey: 'baseExercisePage.core.sc.desc',
    tagsKey: 'baseExercisePage.core.sc.tags',
    image: '/images/SC-move.png',
    videoUrl: 'https://www.youtube.com/watch?v=I3BiBiw1LVE',
  },
]

export default function BaseExercise() {
  const { t } = useTranslation()

  return (
    <>
      <PageBanner
        title={t('pages.baseExercise')}
        subtitle={t('pages.baseExerciseSub')}
      />

      {/* SNPE Movement System - 기본 4동작 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                SNPE Movement System
              </h2>
              <p className="mt-3 text-gray-600">
                {t('home.movementSubtitle')}
              </p>
            </div>
            <a
              href="https://www.youtube.com/@SNPElife"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 border border-gray-900 rounded-full px-4 py-2 hover:bg-gray-900 hover:text-white transition-colors"
            >
              {t('home.learnMore')}
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            {mainExercises.map((ex, i) => {
              const tags = t(ex.tagsKey, { returnObjects: true })
              const title = t(ex.titleKey)

              return (
              <a
                key={i}
                href={ex.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-3xl bg-[#f6f8f5] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative z-10 px-6 pt-6 pb-32">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{t(ex.numKey, { number: ex.number })}</h3>
                  <p className="text-sm text-gray-700 font-medium mb-4 leading-snug">
                    {title}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block text-[11px] px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 포즈 이미지 - 우측 하단에 배치, 카드 바닥에서 살짝 넘침 */}
                <img
                  src={ex.image}
                  alt={title}
                  className="absolute bottom-0 right-0 h-[160px] md:h-[190px] w-auto object-contain object-bottom pointer-events-none select-none"
                />

                {/* 호버 시 재생 오버레이 */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-white/0 group-hover:bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <Play size={22} className="text-gray-900 ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Core Movement - C/L/T/SC */}
      <section className="py-20 md:py-28 bg-[#fafbf9]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <p className="text-mint-darker text-xs md:text-sm font-semibold uppercase tracking-[0.25em] mb-3">
              Core Movement
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
              {t('baseExercisePage.coreTitle')}
            </h2>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed">
              {t('baseExercisePage.coreIntroLine1')}
              <br className="hidden md:block" />
              <span className="md:hidden"> </span>
              {t('baseExercisePage.coreIntroLine2')}
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {moveExercises.map((ex, i) => {
              const tags = t(ex.tagsKey, { returnObjects: true })
              const localTitle = t(ex.localTitleKey)

              return (
              <a
                key={i}
                href={ex.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-mint-darker/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative bg-gray-50 aspect-[5/4] overflow-hidden">
                  <img
                    src={ex.image}
                    alt={localTitle}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 right-4 inline-block px-2.5 py-1 rounded-full bg-mint-darker text-white text-[11px] font-bold tracking-wider shadow-sm">
                    {ex.code}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">
                    {localTitle}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-mint-darker font-semibold mb-3">
                    {ex.title}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                    {t(ex.descKey)}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
