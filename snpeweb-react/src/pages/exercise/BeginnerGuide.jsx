import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Link } from 'react-router-dom'

const steps = [
  { num: '01', title: 'SNPE 알아보기', desc: 'SNPE가 무엇인지, 어떤 원리로 효과가 있는지 알아봅니다.', link: '/about' },
  { num: '02', title: '셀프 체형분석', desc: 'SNPE 앱을 통해 나의 체형 상태를 확인합니다.', link: '/snpeapp' },
  { num: '03', title: '기본동작 배우기', desc: 'SNPE 기본 4동작과 MOVE 동작을 배웁니다.', link: '/baseexercise' },
  { num: '04', title: '운동 영상 따라하기', desc: '영상을 보며 올바른 동작을 반복 연습합니다.', link: '/snpevideo' },
  { num: '05', title: '전문센터 방문', desc: '전문 강사의 지도 아래 체계적으로 배웁니다.', link: '/search-center' },
]

export default function BeginnerGuide() {
  const { t } = useTranslation()

  return (
    <>
      <PageBanner
        title={t('pages.beginnerGuide')}
        subtitle={t('pages.beginnerGuideSub')}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">SNPE 시작하기</h2>
            <p className="text-gray-600">5단계로 SNPE 바른자세 운동을 시작해 보세요.</p>
          </div>

          <div className="space-y-6">
            {steps.map((s, i) => (
              <Link
                key={i}
                to={s.link}
                className="flex items-start gap-6 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-snpe/30 transition-all group"
              >
                <span className="flex-shrink-0 text-4xl md:text-5xl font-heading font-bold text-snpe/20 group-hover:text-snpe-dark/40 transition-colors">
                  {s.num}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-snpe-dark transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
