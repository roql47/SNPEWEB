import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'
import { dataStore } from '../../lib/dataStore'

const TABS = [
  { value: 'activity', labelKey: 'activityPage.tabs.activity' },
  { value: 'press', labelKey: 'activityPage.tabs.press' },
]

export default function Activity() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialTab = searchParams.get('tab') === 'press' ? 'press' : 'activity'
  const [tab, setTab] = useState(initialTab)

  const [activities, setActivities] = useState([])
  const [news, setNews] = useState([])

  useEffect(() => { dataStore.getActivities().then(setActivities) }, [])
  useEffect(() => { dataStore.getNews().then(setNews) }, [])

  // URL ↔ 탭 동기화 (탭 변경 시 ?tab=... 갱신, URL 변경 시 탭 반영)
  useEffect(() => {
    const urlTab = searchParams.get('tab') === 'press' ? 'press' : 'activity'
    if (urlTab !== tab) setTab(urlTab)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const changeTab = (next) => {
    setTab(next)
    const params = new URLSearchParams(searchParams)
    if (next === 'press') params.set('tab', 'press')
    else params.delete('tab')
    setSearchParams(params, { replace: true })
  }

  // 활동소식 — 연도 필터 / 그룹핑
  const years = useMemo(() => {
    const set = new Set(activities.map((a) => a.date.slice(0, 4)))
    return ['all', ...Array.from(set).sort((a, b) => b.localeCompare(a))]
  }, [activities])
  const [selectedYear, setSelectedYear] = useState('all')

  const filtered = selectedYear === 'all'
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

          {/* 탭 — 활동소식 / 언론보도 */}
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-2xl p-1 mb-8 w-fit mx-auto">
            {TABS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => changeTab(opt.value)}
                className={`px-5 py-2 text-sm font-medium rounded-xl transition-colors ${
                  tab === opt.value
                    ? 'bg-snpe-darker text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {t(opt.labelKey)}
              </button>
            ))}
          </div>

          {tab === 'activity' && (
            <>
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
                    {y === 'all' ? t('activityPage.all') : y}
                  </button>
                ))}
              </div>

              <div className="space-y-12">
                {grouped.map(([year, items]) => (
                  <div key={year}>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">{t('activityPage.year', { year })}</h3>
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
                    <p>{t('activityPage.emptyActivity')}</p>
                  </div>
                )}
              </div>
            </>
          )}

          {tab === 'press' && (
            <div className="space-y-4">
              {news.map((n) => (
                <article
                  key={n.id}
                  className="flex items-start justify-between gap-4 bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow group"
                >
                  <div>
                    <h4 className="font-medium text-gray-800 group-hover:text-snpe-dark transition-colors mb-1">
                      {n.url ? (
                        <a href={n.url} target="_blank" rel="noopener noreferrer">{n.title}</a>
                      ) : (
                        n.title
                      )}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {n.source && <>{n.source}{t('activityPage.separator')}</>}{n.date}
                    </p>
                    {n.summary && <p className="text-sm text-gray-500 mt-2">{n.summary}</p>}
                  </div>
                  {n.url && (
                    <a href={n.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} className="text-gray-300 group-hover:text-snpe-dark transition-colors flex-shrink-0 mt-1" />
                    </a>
                  )}
                </article>
              ))}
              {news.length === 0 && (
                <div className="text-center py-12 text-gray-400">{t('activityPage.emptyPress')}</div>
              )}
            </div>
          )}

        </div>
      </section>
    </>
  )
}
