import { useState } from 'react'
import PageBanner from '../../components/common/PageBanner'
import { Pin } from 'lucide-react'

const notices = [
  { id: 1, title: '[공지] 2024년 SNPE 인증강사 자격시험 일정 안내', date: '2024-01-15', pinned: true },
  { id: 2, title: '[공지] 설 연휴 전문센터 운영시간 안내', date: '2024-01-10', pinned: true },
  { id: 3, title: '2024년 상반기 온라인 교육 과정 오픈', date: '2024-01-08', pinned: false },
  { id: 4, title: 'SNPE APP 업데이트 안내 (v3.5)', date: '2024-01-05', pinned: false },
  { id: 5, title: '제3회 건강한삶학회 학술대회 참가 신청 안내', date: '2023-12-20', pinned: false },
  { id: 6, title: '2023년 SNPE 올해의 인증강사 선정 결과 발표', date: '2023-12-15', pinned: false },
  { id: 7, title: '겨울철 SNPE 운동 시 주의사항 안내', date: '2023-12-10', pinned: false },
  { id: 8, title: '12월 문화센터 특별 프로모션 안내', date: '2023-12-01', pinned: false },
]

export default function Notice() {
  const [page] = useState(1)

  return (
    <>
      <PageBanner
        title="공지사항"
        subtitle="SNPE의 중요 소식을 확인하세요"
        breadcrumb={[{ label: '소식', path: '/notice' }, { label: '공지사항' }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="hidden md:grid grid-cols-[1fr_120px] bg-gray-50 text-sm font-medium text-gray-500 px-6 py-3 border-b">
              <span>제목</span>
              <span className="text-center">날짜</span>
            </div>
            {notices.map((n) => (
              <button
                key={n.id}
                className="w-full grid grid-cols-1 md:grid-cols-[1fr_120px] px-6 py-4 border-b border-gray-100 last:border-0 hover:bg-snpe/5 transition-colors text-left"
              >
                <span className="flex items-center gap-2">
                  {n.pinned && <Pin size={14} className="text-snpe flex-shrink-0" />}
                  <span className={`text-sm ${n.pinned ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                    {n.title}
                  </span>
                </span>
                <span className="text-xs text-gray-400 md:text-center mt-1 md:mt-0">{n.date}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  p === page ? 'bg-snpe text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
