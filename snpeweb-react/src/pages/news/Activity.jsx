import PageBanner from '../../components/common/PageBanner'
import { Calendar, MapPin } from 'lucide-react'

const activities = [
  {
    title: '제3회 건강한삶학회 학술대회',
    date: '2024.03.15',
    location: '서울 코엑스',
    desc: 'SNPE 운동의 과학적 효과와 최신 연구 결과를 발표하는 학술대회',
    category: '학술대회',
  },
  {
    title: 'SNPE 인증강사 워크숍',
    date: '2024.02.20',
    location: '강남 SNPE 센터',
    desc: '전국 인증강사 대상 스킬업 워크숍 및 네트워킹',
    category: '워크숍',
  },
  {
    title: '2024 SNPE 신년회',
    date: '2024.01.20',
    location: '강남 SNPE 센터',
    desc: '전국 센터 대표 및 인증강사 신년 모임',
    category: '행사',
  },
  {
    title: 'SNPE × 서울시 건강증진 캠페인',
    date: '2023.11.25',
    location: '서울광장',
    desc: '시민 대상 무료 바른자세 체험 및 체형분석 이벤트',
    category: '캠페인',
  },
  {
    title: 'Global SNPE Summit 2023',
    date: '2023.10.10',
    location: '서울 JW메리어트',
    desc: '해외 파트너 대학 및 글로벌 강사진과 함께하는 서밋',
    category: '국제행사',
  },
]

export default function Activity() {
  return (
    <>
      <PageBanner
        title="활동 소식"
        subtitle="SNPE의 다양한 활동과 이벤트"
        breadcrumb={[{ label: '소식', path: '/notice' }, { label: '활동 소식' }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            {activities.map((a, i) => (
              <article key={i} className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-snpe/10 text-snpe-dark text-xs font-medium mb-3">
                      {a.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{a.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{a.desc}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {a.date}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {a.location}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
