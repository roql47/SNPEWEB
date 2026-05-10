import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { dataStore } from '../../lib/dataStore'
import { Quote } from 'lucide-react'

export default function ExperienceCase() {
  const { t } = useTranslation()
  const [cases, setCases] = useState([])
  useEffect(() => { dataStore.getExperienceCases().then(setCases) }, [])

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
                <article key={c.id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <Quote size={24} className="text-snpe/30 mb-4" />
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    &ldquo;{c.content}&rdquo;
                  </p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm font-bold text-gray-900">{c.name} · {c.age}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span className="bg-snpe-dark/10 text-snpe-dark px-2 py-0.5 rounded-full">{c.issue}</span>
                      <span>수련기간: {c.period}</span>
                    </div>
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
    </>
  )
}
