import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Calendar, MapPin } from 'lucide-react'
import { dataStore } from '../../lib/dataStore'

export default function Activity() {
  const { t } = useTranslation()
  const [activities, setActivities] = useState([])
  useEffect(() => { dataStore.getActivities().then(setActivities) }, [])

  const years = useMemo(() => {
    const set = new Set(activities.map((a) => a.date.slice(0, 4)))
    return ['전체', ...Array.from(set).sort((a, b) => b.localeCompare(a))]
  }, [activities])

  const [selectedYear, setSelectedYear] = useState('전체')

  const filtered = selectedYear === '전체'
    ? activities
    : activities.filter((a) => a.date.startsWith(selectedYear))

  const grouped = useMemo(() => {
    const map = new Map()
    filtered.forEach((a) => {
      const year = a.date.slice(0, 4)
      if (!map.has(year)) map.set(year, [])
      map.get(year).push(a)
    })
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]))
  }, [filtered])

  return (
    <>
      <PageBanner
        title={t('pages.activity')}
        subtitle={t('pages.activitySub')}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">

          <div className="flex gap-2 flex-wrap mb-8">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedYear === y
                    ? 'bg-snpe-darker text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-snpe-dark'
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          <div className="space-y-12">
            {grouped.map(([year, items]) => (
              <div key={year}>
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">{year}년</h3>
                <div className="space-y-4">
                  {items.map((a) => (
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
                </div>
              </div>
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
