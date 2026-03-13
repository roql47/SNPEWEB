import { useState } from 'react'
import PageBanner from '../../components/common/PageBanner'
import { Search, User, Award } from 'lucide-react'

const teachers = [
  { name: '김○○', level: 'Level 1', region: '서울', center: 'SNPE 강남 센트럴센터', specialty: '척추측만증, 만성통증' },
  { name: '이○○', level: 'Level 1', region: '서울', center: 'SNPE 잠실센터', specialty: '산후교정, 골반교정' },
  { name: '박○○', level: 'Level 2', region: '경기', center: 'SNPE 분당센터', specialty: '거북목, 어깨통증' },
  { name: '정○○', level: 'Level 2', region: '부산', center: 'SNPE 해운대센터', specialty: '허리디스크, 요통' },
  { name: '최○○', level: 'Level 1', region: '대구', center: 'SNPE 대구센터', specialty: '오다리교정, 체형교정' },
  { name: '한○○', level: 'Level 2', region: '대전', center: 'SNPE 대전센터', specialty: '기업특강, 그룹수업' },
]

export default function CertTeacher() {
  const [query, setQuery] = useState('')

  const filtered = teachers.filter((t) =>
    !query || t.name.includes(query) || t.region.includes(query) || t.center.includes(query)
  )

  return (
    <>
      <PageBanner
        title="인증강사 검색"
        subtitle="SNPE 인증강사를 찾아보세요"
        breadcrumb={[{ label: '고객지원', path: '/search-center' }, { label: '인증강사 검색' }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative max-w-lg mx-auto mb-12">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="강사명, 지역, 센터명으로 검색"
              className="w-full h-12 pl-4 pr-10 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe"
            />
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((t, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <User size={24} className="text-gray-400" />
                </div>
                <h3 className="font-bold text-gray-900">{t.name}</h3>
                <span className="inline-flex items-center gap-1 text-xs text-snpe font-medium mt-1">
                  <Award size={12} /> {t.level}
                </span>
                <p className="text-sm text-gray-500 mt-2">{t.center}</p>
                <p className="text-xs text-gray-400 mt-1">{t.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
