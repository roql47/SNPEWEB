import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { dataStore } from '../../lib/dataStore'
import { sanitizeHtml } from '../../lib/sanitize'
import { Quote, X, ChevronRight } from 'lucide-react'

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

      <section className="py-16 md:py-24">
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
