import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageBanner from '../../components/common/PageBanner'
import { Search, MapPin, Phone, Clock } from 'lucide-react'

const centers = [
  { name: 'SNPE 강남 센트럴센터', region: '서울', address: '서울 강남구 봉은사로 68길 8, 4층', tel: '02-539-2925', hours: '평일 10:00-21:00 / 토 10:00-17:00' },
  { name: 'SNPE 잠실센터', region: '서울', address: '서울 송파구 올림픽로 300', tel: '02-000-0000', hours: '평일 10:00-21:00' },
  { name: 'SNPE 분당센터', region: '경기', address: '경기 성남시 분당구 서현로 200', tel: '031-000-0000', hours: '평일 10:00-21:00' },
  { name: 'SNPE 해운대센터', region: '부산', address: '부산 해운대구 해운대해변로 100', tel: '051-000-0000', hours: '평일 10:00-21:00' },
  { name: 'SNPE 대구센터', region: '대구', address: '대구 수성구 범어로 100', tel: '053-000-0000', hours: '평일 10:00-21:00' },
  { name: 'SNPE 대전센터', region: '대전', address: '대전 서구 둔산로 100', tel: '042-000-0000', hours: '평일 10:00-21:00' },
]

export default function SearchCenter() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('searchText') || '')
  const [region, setRegion] = useState('전체')

  const regions = ['전체', '서울', '경기', '부산', '대구', '대전']

  const filtered = centers.filter((c) => {
    const matchQuery = !query || c.name.includes(query) || c.address.includes(query)
    const matchRegion = region === '전체' || c.region === region
    return matchQuery && matchRegion
  })

  return (
    <>
      <PageBanner
        title="전문센터 검색"
        subtitle="가까운 SNPE 전문센터를 찾아보세요"
        breadcrumb={[{ label: '고객지원', path: '/search-center' }, { label: '전문센터(가맹점) 검색' }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          {/* Search */}
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      region === r ? 'bg-snpe text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-snpe'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {filtered.map((c, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{c.name}</h3>
                <div className="space-y-2 text-sm text-gray-500">
                  <p className="flex items-center gap-2"><MapPin size={14} className="text-snpe" /> {c.address}</p>
                  <p className="flex items-center gap-2"><Phone size={14} className="text-snpe" /> {c.tel}</p>
                  <p className="flex items-center gap-2"><Clock size={14} className="text-snpe" /> {c.hours}</p>
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
