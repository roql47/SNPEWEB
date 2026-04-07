import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { dataStore } from '../../lib/dataStore'
import { ExternalLink } from 'lucide-react'

export default function News() {
  const { t } = useTranslation()
  const news = dataStore.getNews()

  return (
    <>
      <PageBanner
        title={t('pages.press')}
        subtitle={t('pages.pressSub')}
        breadcrumb={[{ label: t('nav.news'), path: '/notice' }, { label: t('pages.press') }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
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
                    {n.source && <>{n.source} · </>}{n.date}
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
              <div className="text-center py-12 text-gray-400">등록된 언론보도가 없습니다.</div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
