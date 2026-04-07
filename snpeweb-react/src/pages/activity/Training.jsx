import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'

const levels = [
  {
    level: 'Level 3',
    title: '입문 과정',
    duration: '40시간',
    desc: 'SNPE 기본동작과 이론을 학습하는 입문 단계',
    topics: ['SNPE 기본동작 1~4번', 'C/L/T/SC MOVE', '자세분석 기초', '바른자세벨트 활용법'],
  },
  {
    level: 'Level 2',
    title: '심화 과정',
    duration: '80시간',
    desc: '전문 강사로서의 역량을 갖추는 심화 단계',
    topics: ['응용 동작 심화', '대상별 프로그램 설계', '그룹 수업 운영법', '자세분석 APP 활용'],
  },
  {
    level: 'Level 1',
    title: '전문가 과정',
    duration: '120시간',
    desc: '최고 수준의 SNPE 전문가를 양성하는 과정',
    topics: ['전문 센터 운영', '1:1 개인 레슨', '특수 대상 프로그램', '연구 및 논문 참여'],
  },
]

export default function Training() {
  const { t } = useTranslation()

  return (
    <>
      <PageBanner
        title={t('pages.training')}
        subtitle={t('pages.trainingSub')}
        breadcrumb={[{ label: t('nav.education'), path: '/degree' }, { label: t('pages.training') }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">SNPE 인증강사 교육 과정</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              체계적인 교육 커리큘럼을 통해 SNPE 전문 강사를 양성합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {levels.map((l, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-snpe-darker to-snpe-dark text-white p-6">
                  <span className="text-sm font-medium text-white/70">{l.level}</span>
                  <h3 className="text-xl font-bold mt-1">{l.title}</h3>
                  <p className="text-snpe-light text-sm mt-1">{l.duration}</p>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-4">{l.desc}</p>
                  <ul className="space-y-2">
                    {l.topics.map((t, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-snpe-dark flex-shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a href="/online" className="inline-block px-8 py-3 bg-snpe-darker text-white rounded-full font-medium hover:bg-snpe-dark transition-colors">
              수강 신청하기 →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
