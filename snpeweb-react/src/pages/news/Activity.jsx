import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Calendar, MapPin } from 'lucide-react'
import { dataStore } from '../../lib/dataStore'

export default function Activity() {
  const { t } = useTranslation()
  const activities = dataStore.getActivities()

  return (
    <>
      <PageBanner
        title={t('pages.activity')}
        subtitle={t('pages.activitySub')}
        breadcrumb={[{ label: t('nav.news'), path: '/notice' }, { label: t('pages.activity') }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            {activities.map((a) => (
              <article key={a.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                {a.imageUrl && (
                  <div className="w-full h-48 md:h-56">
                    <img src={a.imageUrl} alt={a.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6 md:p-8">
                  <span className="inline-block px-3 py-1 rounded-full bg-snpe-dark/10 text-snpe-dark text-xs font-medium mb-3">
                    {a.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{a.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{a.desc}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {a.date}</span>
                    {a.location && <span className="flex items-center gap-1"><MapPin size={12} /> {a.location}</span>}
                  </div>
                </div>
              </article>
            ))}
            {activities.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <p>등록된 활동내역이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
