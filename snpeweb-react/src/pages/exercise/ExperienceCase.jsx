import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { dataStore } from '../../lib/dataStore'
import { Quote, MapPin } from 'lucide-react'

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

          <div className="bg-snpe-dark/5 rounded-2xl p-6 md:p-8 mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">SNPE 체험을 원하시나요?</h2>
              <p className="text-sm text-gray-600">가까운 SNPE 전문센터에서 직접 체험해 보세요.</p>
            </div>
            <Link
              to="/search-center"
              className="inline-flex items-center gap-2 bg-snpe-darker text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-snpe-dark transition-colors flex-shrink-0"
            >
              <MapPin size={16} /> 전문센터 찾기
            </Link>
          </div>

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

        </div>
      </section>
    </>
  )
}
