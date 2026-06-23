import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { dataStore } from '../../lib/dataStore'
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react'

export default function Studio() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [studios, setStudios] = useState([])

  useEffect(() => { dataStore.getStudios().then(setStudios) }, [])
  const filtered = studios.filter((s) => !query || s.name.includes(query) || s.address.includes(query))

  return (
    <>
      <PageBanner title={t('pages.studio')} subtitle={t('pages.studioSub')} />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('support.studio.title')}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{t('support.studio.desc')}</p>
          </div>

          <div className="mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('support.studio.placeholder')}
              className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe"
            />
          </div>

          <p className="text-sm text-gray-500 mb-4">{t('support.studio.total', { count: filtered.length })}</p>

          <div className="space-y-4">
            {filtered.map((s) => (
              <div key={s.id} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">SNPE STUDIO {s.name}</h3>
                    <p className="text-xs text-gray-400 mb-3">{t('support.studio.owner', { owner: s.owner })}</p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p className="flex items-center gap-2"><MapPin size={14} className="text-snpe-dark flex-shrink-0" /> {s.address}</p>
                      <p className="flex items-center gap-2"><Phone size={14} className="text-snpe-dark flex-shrink-0" /> {s.tel}</p>
                      <p className="flex items-center gap-2"><Mail size={14} className="text-snpe-dark flex-shrink-0" /> <a href={`mailto:${s.email}`} className="text-snpe-dark hover:underline">{s.email}</a></p>
                    </div>
                  </div>
                  <a href={s.naverUrl || `https://map.naver.com/v5/search/SNPE STUDIO ${s.name}`} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 transition-colors">
                    <ExternalLink size={12} /> {t('support.studio.map')}
                  </a>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div className="text-center py-12 text-gray-400"><p>{t('support.studio.empty')}</p></div>}
          </div>
        </div>
      </section>
    </>
  )
}
