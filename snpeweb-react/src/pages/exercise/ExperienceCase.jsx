import PageBanner from '../../components/common/PageBanner'
import { Quote } from 'lucide-react'

const cases = [
  {
    name: '김○○',
    age: '40대 여성',
    issue: '만성 허리 통증',
    period: '6개월',
    content: 'SNPE 2번 동작을 꾸준히 하면서 만성적이었던 허리 통증이 크게 줄었습니다. 앉아있는 시간이 긴 직장인에게 특히 추천합니다.',
  },
  {
    name: '이○○',
    age: '30대 남성',
    issue: '거북목 증후군',
    period: '3개월',
    content: 'C-MOVE 동작과 바른자세벨트를 병행하며 거북목이 많이 개선되었습니다. 목과 어깨 통증이 거의 사라졌어요.',
  },
  {
    name: '박○○',
    age: '50대 여성',
    issue: '척추측만증',
    period: '1년',
    content: 'T-MOVE와 기본동작 4번을 꾸준히 하면서 척추측만이 개선되고 있습니다. 자세 사진으로 변화를 확인할 수 있어 동기부여가 됩니다.',
  },
  {
    name: '정○○',
    age: '30대 여성',
    issue: '산후 골반 불균형',
    period: '4개월',
    content: '출산 후 골반이 틀어져 고생했는데, SNPE 3번 동작으로 골반 정렬이 많이 좋아졌습니다.',
  },
  {
    name: '최○○',
    age: '60대 남성',
    issue: '퇴행성 관절염',
    period: '8개월',
    content: '무릎 관절이 안 좋아 운동이 어려웠는데, SNPE는 도구를 활용해 무릎에 부담 없이 운동할 수 있어 좋습니다.',
  },
  {
    name: '한○○',
    age: '20대 여성',
    issue: '오다리 교정',
    period: '5개월',
    content: 'SNPE 3번 동작과 벨트 착용으로 오다리가 눈에 띄게 좋아졌어요. 자신감이 생겼습니다.',
  },
]

export default function ExperienceCase() {
  return (
    <>
      <PageBanner
        title="체험사례"
        subtitle="SNPE 운동 체험자들의 이야기"
        breadcrumb={[{ label: '운동 정보', path: '/beginnerguide' }, { label: '체험 신청' }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <article key={i} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <Quote size={24} className="text-snpe/30 mb-4" />
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  "{c.content}"
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm font-bold text-gray-900">{c.name} · {c.age}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span className="bg-snpe/10 text-snpe-dark px-2 py-0.5 rounded-full">{c.issue}</span>
                    <span>수련기간: {c.period}</span>
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
