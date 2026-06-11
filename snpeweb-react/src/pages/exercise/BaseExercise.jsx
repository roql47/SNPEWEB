import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Play, ArrowUpRight } from 'lucide-react'

const mainExercises = [
  {
    num: '1번 동작',
    title: '손 뒤로 깍지 끼고 의자 자세',
    desc: '바른자세벨트를 착용하고 양 손을 뒤로 깍지 끼고 의자 자세로 앉습니다. 척추 정렬과 목 디스크 예방에 효과적입니다.',
    tags: ['척추', '목 디스크', '허리 건강'],
    image: '/images/position_5.png',
    videoUrl: 'https://www.youtube.com/watch?v=w-jiKlSevuY&t=1s',
  },
  {
    num: '2번 동작',
    title: '무릎 꿇고 다리 묶어 뒤로 눕기',
    desc: '바른자세벨트로 다리를 묶고 무릎을 꿇은 상태에서 뒤로 눕습니다. 골반 교정과 횡격막 스트레칭에 효과적입니다.',
    tags: ['골반', '횡격막', '체온 상승'],
    image: '/images/position_2.png',
    videoUrl: 'https://www.youtube.com/watch?v=9lUfciyCkvE',
  },
  {
    num: '3번 동작',
    title: '엎드려 무릎 굽혀 다리 들기',
    desc: '엎드린 상태에서 무릎을 굽혀 다리를 들어올립니다. 휜다리 교정과 힙업에 효과적입니다.',
    tags: ['휜다리', '무릎', '힙업'],
    image: '/images/position_3.png',
    videoUrl: 'https://www.youtube.com/watch?v=BhuQEqhFMCE',
  },
  {
    num: '4번 동작',
    title: '척추 자극주며 구르기',
    desc: '바닥에 누워 무릎을 가슴으로 당기고 전후로 구릅니다. 척추 마사지와 혈액순환에 도움됩니다.',
    tags: ['척추', '혈액순환', '복근'],
    image: '/images/position_6.png',
    videoUrl: 'https://www.youtube.com/watch?v=YtDH2NKSBpw',
  },
]

const moveExercises = [
  {
    code: 'C-MOVE',
    title: 'Cervical Movement',
    titleKo: '경추',
    desc: '경추(목뼈) 부위의 움직임을 회복하는 동작',
    tags: ['경추', '거북목', '목 통증'],
    image: '/images/C-move.png',
    videoUrl: 'https://www.youtube.com/watch?v=ovm52F2v7a4',
  },
  {
    code: 'T-MOVE',
    title: 'Thoracic Movement',
    titleKo: '흉추',
    desc: '흉추(등뼈) 부위의 움직임 개선',
    tags: ['어깨 통증', '척추측만증', '등 통증'],
    image: '/images/T-move.png',
    videoUrl: 'https://www.youtube.com/@SNPElife/search?query=t%20move',
  },
  {
    code: 'L-MOVE',
    title: 'Lumbar Movement',
    titleKo: '요추',
    desc: '요추(허리뼈) 부위의 정상적인 커브 회복',
    tags: ['요추', '일자허리', '허리 통증'],
    image: '/images/L-move.png',
    videoUrl: 'https://www.youtube.com/watch?v=euNrnJ4Z4Fc',
  },
  {
    code: 'SC-MOVE',
    title: 'Sacrum Coccygeal Movement',
    titleKo: '천골(엉치뼈)·미추(꼬리뼈)',
    desc: '천골(엉치뼈)·미추(꼬리뼈) 부위의 정렬 교정',
    tags: ['골반', '미추', '하체 순환'],
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
                기본 동작을 따라하며 몸의 변화를 경험해보세요
              </p>
            </div>
            <a
              href="https://www.youtube.com/@SNPElife"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 border border-gray-900 rounded-full px-4 py-2 hover:bg-gray-900 hover:text-white transition-colors"
            >
              자세히 보기
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            {mainExercises.map((ex, i) => (
              <a
                key={i}
                href={ex.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-3xl bg-[#f6f8f5] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative z-10 px-6 pt-6 pb-32">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{ex.num}</h3>
                  <p className="text-sm text-gray-700 font-medium mb-4 leading-snug">
                    {ex.title}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {ex.tags.map((tag) => (
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
                  alt={ex.title}
                  className="absolute bottom-0 right-0 h-[160px] md:h-[190px] w-auto object-contain object-bottom pointer-events-none select-none"
                />

                {/* 호버 시 재생 오버레이 */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-white/0 group-hover:bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <Play size={22} className="text-gray-900 ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </a>
            ))}
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
              부위별 움직임 회복
            </h2>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed">
              척추 부위별 특화 프로그램으로
              <br className="hidden md:block" />
              <span className="md:hidden"> </span>
              더 깊은 자세 회복을 경험하세요
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {moveExercises.map((ex, i) => (
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
                    alt={ex.titleKo}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 right-4 inline-block px-2.5 py-1 rounded-full bg-mint-darker text-white text-[11px] font-bold tracking-wider shadow-sm">
                    {ex.code}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">
                    {ex.titleKo}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-mint-darker font-semibold mb-3">
                    {ex.title}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                    {ex.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                    {ex.tags.map((tag) => (
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
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
