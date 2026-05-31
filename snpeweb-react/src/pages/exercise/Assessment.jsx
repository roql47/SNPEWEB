import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Smartphone, ClipboardCheck, ArrowRight } from 'lucide-react'

const flow = ['체형 분석', '움직임 평가', '맞춤 운동', '변화 기록']

const proTools = [
  'SNPE 체형 및 움직임 평가 시스템',
  'SNPE Foot Assessment Board (발 평가 보드)',
  'Exbody 체성분 분석',
  '기능 움직임 평가 (Functional Movement Assessment)',
  'SNPE 고유 움직임 패턴 평가',
]

export default function Assessment() {
  const { t } = useTranslation()
  return (
    <>
      <PageBanner title={t('pages.assessment')} subtitle={t('pages.assessmentSub')} />

      {/* Intro */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-mint-lighter/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">
            POSTURE &amp; MOVEMENT ASSESSMENT
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-5 leading-snug">
            Self Recovery Through Movement
          </h2>

          {/* Flow */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8">
            {flow.map((f, i) => (
              <div key={f} className="flex items-center gap-2 md:gap-3">
                <span className="px-4 py-2 bg-white border border-snpe/30 rounded-full text-sm font-medium text-snpe-dark">
                  {f}
                </span>
                {i < flow.length - 1 && <ArrowRight size={16} className="text-gray-300" />}
              </div>
            ))}
          </div>

          <div className="space-y-3 text-gray-600 leading-relaxed max-w-2xl mx-auto text-left md:text-center">
            <p>
              SNPE는 몸의 변화를 단순히 '교정'하는 것이 아니라, 스스로 몸을 이해하고 움직이며
              본래의 균형을 회복해가는 과정을 중요하게 생각합니다.
            </p>
            <p>
              SNPE는 과학적 움직임 분석과 기록 기반의 Movement-Based Wellness System을 지향합니다.
              사용자는 SNPE 앱을 통해 자신의 체형과 움직임 변화를 기록하고, 정적 자세(Static Posture)뿐 아니라
              움직임 패턴(Movement Pattern), 균형(Balance), 기능(Function)의 변화를 지속적으로 확인할 수 있습니다.
            </p>
            <p>
              꾸준한 바른자세 운동과 움직임 훈련을 반복하며 몸의 정렬(Alignment), 움직임 균형(Balance),
              기능(Function)을 점진적으로 회복해가고, 잘못된 움직임 습관으로 인한 신체 부담과 불편함을 줄여
              보다 편안하고 안정적인 움직임으로 나아갈 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Self / Professional Assessment */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-3xl p-7 md:p-9 border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center mb-5">
              <Smartphone size={22} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Self Assessment</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              집에서는 SNPE 앱을 활용하여 정면·측면·후면 체형 촬영과 기본 움직임 평가를 스스로 진행할 수 있습니다.
              체형과 움직임의 변화를 기록하고 비교하며, 자신의 몸을 이해하고 관리하는 첫 단계가 됩니다.
            </p>
          </div>

          <div className="bg-gray-50 rounded-3xl p-7 md:p-9 border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center mb-5">
              <ClipboardCheck size={22} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Assessment</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              보다 전문적인 평가는 SNPE 전문센터와 인증강사를 통해 진행됩니다. SNPE 전문센터에서는 다음을 활용하여
              신체 정렬과 움직임 상태를 보다 입체적으로 분석합니다.
            </p>
            <ul className="space-y-2">
              {proTools.map((tool) => (
                <li key={tool} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-snpe-dark flex-shrink-0" />
                  {tool}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed mt-4">
              정적 체형뿐 아니라 발의 기능, 균형 능력, 움직임 보상 패턴, 좌우 비대칭 등을 종합적으로 평가하여
              개인별 운동 방향과 회복 과정을 설계합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-snpe-darker via-snpe-dark to-snpe text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-2xl md:text-4xl font-bold mb-2 leading-tight">Start with Self Assessment.</p>
          <p className="text-2xl md:text-4xl font-bold text-white/90 leading-tight mb-6">
            Advance with Professional Guidance.
          </p>
          <p className="text-white/85 leading-relaxed max-w-2xl mx-auto">
            앱으로 스스로 기록하고, SNPE 인증강사와 전문센터를 통해 보다 정교한 평가와 맞춤형 운동 지도를 받아보세요.
            SNPE는 과학적 평가와 지속적인 기록을 바탕으로 건강한 자세와 움직임 습관을 만들어가는 Self Recovery System입니다.
          </p>
        </div>
      </section>
    </>
  )
}
