/**
 * LevelPageContent — Level 1/2/3/Master 페이지 공통 렌더러
 * AdminLevelPage에서 저장한 page_contents 데이터를 표시
 */
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { dataStore } from '../../lib/dataStore'
import { sanitizeHtml } from '../../lib/sanitize'
import { Award, BookOpen, Users, Zap, Star, Target, Layers, Info } from 'lucide-react'

const ICON_MAP = { Award, BookOpen, Users, Zap, Star, Target, Layers, Info }

export default function LevelPageContent({ slug }) {
  const { t } = useTranslation()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dataStore.getPageContent(slug)
      .then(setContent)
      .catch(() => setContent(null))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full" />
      </div>
    )
  }

  if (!content) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center text-gray-400 text-sm">
        {t('common.contentUnavailable')}
      </div>
    )
  }

  const isMaster = slug === 'master'

  return (
    <section className="py-16 md:py-24">
      <div className={`${isMaster ? 'max-w-5xl' : 'max-w-4xl'} mx-auto px-4 space-y-14`}>

        {/* 헤더 */}
        <div className={isMaster ? 'text-center' : ''}>
          <span className="inline-block px-3 py-1 rounded-full bg-snpe-dark/10 text-snpe-dark text-xs font-bold mb-4">
            {content.label}
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.course_name}</h2>
          {/* 소개 — Rich Text 우선, 없으면 plain */}
          {content.intro_html ? (
            <div
              className="rt-content text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(content.intro_html) }}
            />
          ) : Array.isArray(content.intro) ? (
            <div className="space-y-2 text-gray-600 leading-relaxed">
              {content.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          ) : null}
        </div>

        {/* 마스터: 특징 카드 */}
        {isMaster && content.features?.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {content.features.map((f, i) => {
              const Icon = ICON_MAP[f.icon] || Award
              return (
                <div key={i} className="flex gap-4 p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center flex-shrink-0">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{f.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* 교육 목표 + 교육 대상 (LEVEL 1/2/3) */}
        {!isMaster && (content.goals?.length > 0 || content.targets?.length > 0) && (
          <div className="grid md:grid-cols-2 gap-6">
            {content.goals?.length > 0 && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">{t('common.educationGoals')}</h3>
                <ul className="space-y-2.5 text-sm text-gray-700">
                  {content.goals.map((g, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-snpe-dark mt-0.5">✓</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {content.targets?.length > 0 && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">{t('common.educationTargets')}</h3>
                <ul className="space-y-2.5 text-sm text-gray-700">
                  {content.targets.map((t, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-snpe-dark flex-shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 마스터: 커리큘럼 */}
        {isMaster && content.curriculum?.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('common.curriculum')}</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {content.curriculum.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                  <span className="w-8 h-8 rounded-full bg-snpe-darker text-white text-sm flex items-center justify-center font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-gray-800 font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 마스터: 강사진 */}
        {isMaster && content.instructors?.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('common.instructors')}</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {content.instructors.map((inst, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-full bg-snpe-dark/10 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-snpe-dark font-bold text-lg">{inst.name?.[0]}</span>
                  </div>
                  <p className="font-bold text-gray-900 text-sm">{inst.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{inst.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 요약 카드 */}
        {content.summary?.length > 0 && (
          <div className={`bg-snpe-dark/10 rounded-2xl p-6 md:p-8 ${isMaster ? 'text-center' : 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'}`}>
            {content.summary.map((s, i) => (
              <div key={i} className={isMaster ? 'mb-2 last:mb-0' : ''}>
                <p className="text-xs text-snpe-dark font-semibold mb-1">{s.label}</p>
                <p className={`text-gray-900 font-bold ${isMaster ? 'text-sm' : ''}`}>{s.value}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
