import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MapPin, Sparkles, HeartPulse, Activity } from 'lucide-react'
import PageBanner from '../../components/common/PageBanner'

const HIGHLIGHTS = [
  {
    icon: Sparkles,
    title: '체형의 변화',
    desc: '굳어 있던 근막이 풀리고 골반·척추 정렬이 회복되는 과정을 직접 느낄 수 있습니다.',
  },
  {
    icon: HeartPulse,
    title: '통증의 완화',
    desc: '거북목·요통·골반 비틀림 등 일상 속 만성 통증이 줄어드는 변화를 경험합니다.',
  },
  {
    icon: Activity,
    title: '몸의 균형',
    desc: '바른자세벨트와 도구를 활용한 SNPE 동작으로 좌우 균형과 코어 안정성이 향상됩니다.',
  },
]

export default function SnpeExperience() {
  const { t } = useTranslation()

  return (
    <>
      <PageBanner
        title={t('pages.snpeExperience')}
        subtitle={t('pages.snpeExperienceSub')}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              SNPE를 직접 경험한 사람들의 이야기
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
              운동을 시작한 지 며칠 만에 변화를 느끼는 분, 수개월간 꾸준히 수련하며 통증에서 자유로워진 분.
              <br className="hidden md:block" />
              SNPE 운동을 통해 몸이 회복되는 경험은 사람마다 다르지만, 변화의 흐름은 닮아 있습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.title}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-mint-lighter/60 flex items-center justify-center mb-4">
                  <h.icon size={22} className="text-mint-darker" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{h.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-mint-lighter/40 rounded-2xl p-8 md:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                몸이 달라지는 경험, 직접 느껴보고 싶다면
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                가까운 SNPE 전문센터에서 체험해보세요.
              </p>
            </div>
            <Link
              to="/search-center"
              className="inline-flex items-center gap-2 bg-mint-darker text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-mint-dark transition-colors flex-shrink-0"
            >
              <MapPin size={16} /> 전문센터 찾기
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
