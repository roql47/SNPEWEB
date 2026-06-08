import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { dataStore } from '../../lib/dataStore'
import { sanitizeHtml } from '../../lib/sanitize'
import { Quote, X, ChevronRight, Sparkles, HeartPulse, Activity, MapPin } from 'lucide-react'

// 상단 'SNPE 운동 경험' 하이라이트
const HIGHLIGHTS = [
  {
    icon: Sparkles,
    title: '체형의 변화',
    desc: '굳어 있던 근막이 풀리고 골반·척추 정렬이 회복되는 과정을 직접 느낄 수 있습니다.',
  },
  {
    icon: HeartPulse,
    title: '통증의 완화',
    desc: '거북목·요통·골반 비틀림 등 일상 속 만성 통증이 줄어드는 변화를 경험합니다.',
  },
  {
    icon: Activity,
    title: '몸의 균형',
    desc: '바른자세벨트와 도구를 활용한 SNPE 동작으로 좌우 균형과 코어 안정성이 향상됩니다.',
  },
]

export default function ExperienceCase() {
  const { t } = useTranslation()
  const [cases, setCases] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => { dataStore.getExperienceCases().then(setCases) }, [])

  const hasDetail = (c) => !!(c.detail || c.image_url)

  return (
    <>
      <PageBanner
        title={t('pages.experienceCase')}
        subtitle={t('pages.experienceCaseSub')}
      />

      {/* 1) SNPE 운동 경험 — 상단 */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-mint-lighter/30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">
              SNPE EXPERIENCE
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              SNPE를 직접 경험한 사람들의 이야기
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
              운동을 시작한 지 며칠 만에 변화를 느끼는 분, 수개월간 꾸준히 수련하며 통증에서 자유로워진 분.
              <br className="hidden md:block" />
              SNPE 운동을 통해 몸이 회복되는 경험은 사람마다 다르지만, 변화의 흐름은 닮아 있습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.title}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-mint-lighter/60 flex items-center justify-center mb-4">
                  <h.icon size={22} className="text-mint-darker" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{h.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2) 체험사례 — 하단 */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark">
              RECOVERY STORIES
            </p>
          </div>

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
                        <span>수련기간: {c.period}</span>
                      </div>
                    </div>
                    {hasDetail(c) && (
                      <span className="flex items-center gap-0.5 text-xs text-snpe-dark font-medium flex-shrink-0">
                        자세히 <ChevronRight size={14} />
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
                실제 체험사례 콘텐츠를 준비 중입니다. 곧 다양한 회복 이야기로 찾아뵙겠습니다.
              </p>
            </div>
          )}

          {/* 전문센터 CTA */}
          <div className="mt-14 bg-mint-lighter/40 rounded-2xl p-8 md:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                몸이 달라지는 경험, 직접 느껴보고 싶다면
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                가까운 SNPE 전문센터에서 체험해보세요.
              </p>
            </div>
            <Link
              to="/search-center"
              className="inline-flex items-center gap-2 bg-mint-darker text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-mint-dark transition-colors flex-shrink-0"
            >
              <MapPin size={16} /> 전문센터 찾기
            </Link>
          </div>
        </div>
      </section>

      {/* 상세 모달 */}
      {selected && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div>
                <p className="font-bold text-gray-900">{selected.name} · {selected.age}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span className="bg-snpe-dark/10 text-snpe-dark px-2 py-0.5 rounded-full">{selected.issue}</span>
                  <span>수련기간: {selected.period}</span>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* 대표 이미지 */}
            {selected.image_url && (
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={selected.image_url}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* 요약 인용구 */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
              <Quote size={20} className="text-snpe/30 mb-2" />
              <p className="text-gray-600 leading-relaxed italic">
                &ldquo;{selected.content}&rdquo;
              </p>
            </div>

            {/* 상세 본문 */}
            {selected.detail ? (
              <div
                className="rt-content px-6 py-6 text-sm text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(selected.detail) }}
              />
            ) : (
              <div className="px-6 py-6 text-sm text-gray-400 text-center">
                상세 내용이 없습니다.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
