import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { dataStore } from '../../lib/dataStore'
import { Search, User, Award, X, Star } from 'lucide-react'

export default function CertTeacher() {
  const [query, setQuery] = useState('')
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [teachers, setTeachers] = useState([])
  const [featured, setFeatured] = useState([])
  const { t } = useTranslation()

  useEffect(() => {
    dataStore.getTeachers().then(setTeachers)
    dataStore.getFeaturedTeachers().then(setFeatured)
  }, [])

  const filtered = teachers.filter(
    (teacher) => !query || teacher.name.includes(query) || teacher.region.includes(query) || teacher.level.includes(query)
  )

  return (
    <>
      <PageBanner
        title={t('pages.certTeacher')}
        subtitle={t('pages.certTeacherSub')}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">

          <div className="bg-snpe-dark/5 rounded-2xl p-8 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-3">SNPE 인증강사란?</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              SNPE 인증강사는 SNPE 바른자세 척추운동 전문 교육과정(LEVEL 1~3)을 이수하고,
              엄격한 평가를 통해 인증받은 전문 강사입니다. 인증강사는 정기적인 보수교육과
              자격 갱신을 통해 전문성을 유지하며, SNPE 본사의 관리 하에 활동하고 있습니다.
            </p>
          </div>

          {featured.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-2 mb-6">
                <Star size={20} className="text-amber-500" />
                <h2 className="text-xl font-bold text-gray-900">우수 강사</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featured.slice(0, 6).map((teacher) => (
                  <button
                    key={teacher.id}
                    onClick={() => setSelectedTeacher(teacher)}
                    className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow text-center text-left"
                  >
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                      {teacher.photo_url ? (
                        <img src={teacher.photo_url} alt={teacher.name} className="w-full h-full object-cover" />
                      ) : (
                        <User size={32} className="text-gray-400" />
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900">{teacher.name}</h3>
                    <span className="inline-flex items-center gap-1 text-xs text-snpe-dark font-medium mt-1">
                      <Award size={12} /> {teacher.level}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">전체 인증강사</h2>

            <div className="relative max-w-lg mb-8">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="강사명, 지역, 레벨로 검색"
                className="w-full h-12 pl-4 pr-10 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe"
              />
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <p className="text-sm text-gray-500 mb-4">
              총 <span className="font-bold text-gray-900">{filtered.length}</span>명
            </p>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-[1fr_auto_auto] bg-gray-50 text-sm font-medium text-gray-600 px-6 py-3 border-b">
                <span>이름</span>
                <span className="w-20 text-center">레벨</span>
                <span className="w-16 text-center">지역</span>
              </div>
              {filtered.map((teacher) => (
                <button
                  key={teacher.id}
                  onClick={() => setSelectedTeacher(teacher)}
                  className="w-full grid grid-cols-[1fr_auto_auto] px-6 py-3.5 border-b border-gray-100 last:border-0 text-sm hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="text-gray-900 font-medium">{teacher.name}</span>
                  <span className="w-20 text-center text-xs text-snpe-dark font-medium">{teacher.level}</span>
                  <span className="w-16 text-center text-xs text-gray-500">{teacher.region}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="px-6 py-8 text-center text-gray-400 text-sm">검색 결과가 없습니다.</div>
              )}
            </div>
          </div>

        </div>
      </section>

      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedTeacher(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedTeacher(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <X size={20} />
            </button>
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                {selectedTeacher.photo_url ? (
                  <img src={selectedTeacher.photo_url} alt={selectedTeacher.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={36} className="text-gray-400" />
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{selectedTeacher.name}</h3>
              <span className="inline-flex items-center gap-1 text-sm text-snpe-dark font-medium mt-1">
                <Award size={14} /> {selectedTeacher.level}
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">지역</span>
                <span className="text-gray-900 font-medium">{selectedTeacher.region}</span>
              </div>
              {selectedTeacher.intro && (
                <div className="py-2">
                  <span className="text-gray-500 block mb-1">소개</span>
                  <p className="text-gray-700">{selectedTeacher.intro}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
