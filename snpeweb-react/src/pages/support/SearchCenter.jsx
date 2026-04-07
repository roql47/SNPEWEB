import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { dataStore } from '../../lib/dataStore'
import { Search, MapPin, Phone, Mail, ExternalLink } from 'lucide-react'

const regions = ['전체', '서울', '경기', '인천', '부산', '대구', '대전', '광주', '충청', '경상', '강원']

export default function SearchCenter() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('searchText') || '')
  const [region, setRegion] = useState('전체')
  const { t } = useTranslation()

  const centers = dataStore.getCenters()

  const filtered = centers.filter((c) => {
    const matchQuery = !query || c.name.includes(query) || c.address.includes(query)
    const matchRegion = region === '전체' || c.region === region
    return matchQuery && matchRegion
  })

  return (
    <>
      <PageBanner
        title={t('pages.searchCenter')}
        subtitle={t('pages.searchCenterSub')}
        breadcrumb={[{ label: t('nav.support'), path: '/search-center' }, { label: t('pages.searchCenter') }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="센터명 또는 지역을 입력하세요"
                  className="w-full h-12 pl-4 pr-10 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe"
                />
                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {regions.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRegion(r)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      region === r ? 'bg-snpe-darker text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-snpe-dark'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            총 <span className="font-bold text-gray-900">{filtered.length}</span>개 센터
          </p>

          <div className="space-y-4">
            {filtered.map((c) => (
              <div key={c.id} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">SNPE {c.name}</h3>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p className="flex items-center gap-2"><MapPin size={14} className="text-snpe-dark flex-shrink-0" /> {c.address}</p>
                      {c.tel && <p className="flex items-center gap-2"><Phone size={14} className="text-snpe-dark flex-shrink-0" /> {c.tel}</p>}
                      {c.email && <p className="flex items-center gap-2"><Mail size={14} className="text-snpe-dark flex-shrink-0" /> <a href={`mailto:${c.email}`} className="text-snpe-dark hover:underline">{c.email}</a></p>}
                    </div>
                  </div>
                  <a
                    href={c.naverUrl || `https://map.naver.com/v5/search/SNPE ${c.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <ExternalLink size={12} />
                    네이버 지도
                  </a>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <p>검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
