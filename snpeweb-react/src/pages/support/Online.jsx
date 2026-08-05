import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Monitor, Calendar, Clock } from 'lucide-react'

const courses = [
  { id: 'intro', type: 'live' },
  { id: 'intensive', type: 'live' },
  { id: 'care', type: 'vod' },
  { id: 'level3', type: 'live' },
]

const tabs = [
  { value: 'all', key: 'support.online.tabs.all' },
  { value: 'live', key: 'support.online.tabs.live' },
  { value: 'vod', key: 'support.online.tabs.vod' },
]

export default function Online() {
  const [selectedType, setSelectedType] = useState('all')
  const { t } = useTranslation()
  const filtered = selectedType === 'all' ? courses : courses.filter((c) => c.type === selectedType)

  return (
    <>
      <PageBanner title={t('pages.online')} subtitle={t('pages.onlineSub')} />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-3 justify-center mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedType(tab.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === tab.value ? 'bg-snpe-darker text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.value === 'live' && <Monitor size={14} className="inline mr-1" />}
                {t(tab.key)}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((c) => (
              <div key={c.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${c.type === 'live' ? 'bg-snpe-dark/10 text-snpe-dark' : 'bg-purple-100 text-purple-700'}`}>
                      {t(c.type === 'live' ? 'support.online.badges.live' : 'support.online.badges.vod')}
                    </span>
                    <span className="text-lg font-bold text-snpe-dark">{t(`support.online.courses.${c.id}.price`)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t(`support.online.courses.${c.id}.title`)}</h3>
                  <p className="text-sm text-gray-600 mb-4">{t(`support.online.courses.${c.id}.desc`)}</p>
                  <div className="space-y-2 text-xs text-gray-400">
                    <p className="flex items-center gap-2"><Calendar size={12} /> {t(`support.online.courses.${c.id}.schedule`)}</p>
                    <p className="flex items-center gap-2"><Clock size={12} /> {t(`support.online.courses.${c.id}.duration`)}</p>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <button className="w-full h-10 bg-snpe-darker text-white rounded-lg text-sm font-medium hover:bg-snpe-dark transition-colors">
                    {t('support.online.apply')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
