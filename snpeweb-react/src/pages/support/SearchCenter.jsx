import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { dataStore } from '../../lib/dataStore'
import { MapPin, Phone, ExternalLink, Star } from 'lucide-react'

const regions = [
  { value: '전체', key: 'support.regions.all' },
  { value: '서울', key: 'support.regions.seoul' },
  { value: '경기', key: 'support.regions.gyeonggi' },
  { value: '인천', key: 'support.regions.incheon' },
  { value: '부산', key: 'support.regions.busan' },
  { value: '대구', key: 'support.regions.daegu' },
  { value: '대전', key: 'support.regions.daejeon' },
  { value: '광주', key: 'support.regions.gwangju' },
  { value: '충청', key: 'support.regions.chungcheong' },
  { value: '경상', key: 'support.regions.gyeongsang' },
  { value: '강원', key: 'support.regions.gangwon' },
]

const directBranches = ['강남', '대치', '신도']

export default function SearchCenter() {
  const [region, setRegion] = useState(regions[0].value)
  const [centers, setCenters] = useState([])
  const { t } = useTranslation()

  useEffect(() => { dataStore.getCenters().then(setCenters) }, [])

  const filtered = centers.filter((c) => region === regions[0].value || c.region === region)
  const isDirect = (name) => directBranches.some((b) => name.includes(b))
  const sortedFiltered = [...filtered].sort((a, b) => {
    const aD = isDirect(a.name) ? 0 : 1
    const bD = isDirect(b.name) ? 0 : 1
    if (aD !== bD) return aD - bD
    return a.name.localeCompare(b.name, 'ko')
  })

  return (
    <>
      <PageBanner title={t('pages.searchCenter')} subtitle={t('pages.searchCenterSub')} />

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('support.searchCenter.title')}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{t('support.searchCenter.desc')}</p>
          </div>

          <div className="flex gap-2 flex-wrap mb-8">
            {regions.map((r) => (
              <button
                key={r.value}
                onClick={() => setRegion(r.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  region === r.value ? 'bg-snpe-darker text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t(r.key)}
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-500 mb-4">
            {t('support.searchCenter.total', { count: sortedFiltered.length })}
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {sortedFiltered.map((c) => (
              <div key={c.id} className={`bg-white border rounded-xl p-5 hover:shadow-md transition-shadow ${isDirect(c.name) ? 'border-snpe-dark/30 ring-1 ring-snpe-dark/10' : 'border-gray-100'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-base font-bold text-gray-900 truncate">SNPE {c.name}</h3>
                      {isDirect(c.name) && (
                        <span className="flex items-center gap-0.5 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex-shrink-0">
                          <Star size={10} /> {t('support.searchCenter.direct')}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1.5 text-sm text-gray-500">
                      <p className="flex items-start gap-2"><MapPin size={14} className="text-snpe-dark flex-shrink-0 mt-0.5" /><span className="truncate">{c.address}</span></p>
                      {c.tel && <p className="flex items-center gap-2"><Phone size={14} className="text-snpe-dark flex-shrink-0" />{c.tel}</p>}
                    </div>
                  </div>
                  <a href={c.naver_url || `https://map.naver.com/v5/search/SNPE ${c.name}`} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 transition-colors">
                    <ExternalLink size={12} /> {t('support.searchCenter.map')}
                  </a>
                </div>
              </div>
            ))}
            {sortedFiltered.length === 0 && (
              <div className="col-span-2 text-center py-12 text-gray-400">
                <MapPin size={32} className="mx-auto mb-3 opacity-30" />
                <p>{t('support.searchCenter.empty')}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
