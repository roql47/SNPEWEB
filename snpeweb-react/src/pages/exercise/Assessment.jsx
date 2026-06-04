import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Smartphone, ClipboardCheck, ArrowRight, CheckCircle2 } from 'lucide-react'

const flow = ['체형 분석', '움직임 평가', '맞춤 운동', '변화 기록']

const selfItems = [
  '기본 자세 평가',
  'SNPE 운동 자세 평가',
  '척추측만, 얼굴 비대칭',
  '고관절 변형, 휜다리, 후족부 정렬',
  '개인 맞춤 운동 추천',
]

const proSystems = [
  'SNPE 체형 및 움직임 평가 시스템',
  'SNPE 발 평가 보드 (SNPE Foot Assessment Board)',
  'Exbody 체성분 분석',
  '기능적 움직임 평가 (Functional Movement Assessment)',
  'SNPE 고유 움직임 패턴 평가',
]

const proAnalysis = [
  '신체 정렬 (Alignment)',
  '발 기능 (Foot Function)',
  '균형 능력 (Balance)',
  '움직임 패턴 (Movement Pattern)',
  '보상 움직임 (Compensation Pattern)',
  '좌우 비대칭 (Asymmetry)',
  '기능 (Function)',
]

export default function Assessment() {
  const { t } = useTranslation()
  return (
    <>
      <PageBanner title={t('pages.assessment')} subtitle={t('pages.assessmentSub')} />

      {/* Intro — 움직임을 통한 자기 회복 */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-mint-lighter/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">
            POSTURE &amp; MOVEMENT ASSESSMENT
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 leading-snug">
            움직임을 통한 자기 회복
          </h2>
          <p className="text-base md:text-lg text-mint-darker font-medium mb-8">
            Self Recovery Through Movement
          </p>

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
              SNPE는 과학적 움직임 분석과 지속적인 기록을 기반으로 하는
              움직임 기반 웰니스 시스템(Movement-Based Wellness System)을 지향합니다.
              사용자는 SNPE 앱을 통해 자신의 체형과 움직임 변화를 기록하고, 정적 자세(Static Posture)뿐 아니라
              움직임 패턴(Movement Pattern), 균형(Balance), 기능(Function)의 변화를 지속적으로 확인할 수 있습니다.
            </p>
            <p>
              꾸준한 바른자세 운동과 움직임 훈련을 반복하며 신체 정렬(Alignment), 움직임 균형(Balance),
              기능(Function)을 점진적으로 회복해가고, 잘못된 움직임 습관으로 인한 신체 부담과 불편함을 줄여
              보다 편안하고 안정적인 움직임으로 나아갈 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Self Assessment — 셀프 체형 평가 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center flex-shrink-0">
              <Smartphone size={22} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">셀프 체형 평가</h2>
              <p className="text-sm text-mint-darker font-medium">Self Assessment</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-12 items-center">
            <figure className="flex justify-center">
              <img
                src="/images/app-1-1.png"
                alt="SNPE 앱 셀프 체형 평가 화면"
                className="w-[260px] md:w-[320px] h-auto drop-shadow-xl"
                loading="lazy"
              />
            </figure>
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                집에서는 SNPE 앱을 활용하여 정면·측면·후면 체형 촬영과 기본 움직임 평가를 스스로 진행할 수 있습니다.
                체형과 움직임의 변화를 기록하고 비교하며, 자신의 몸을 이해하고 관리하는 첫 단계가 됩니다.
              </p>
              <div className="bg-gray-50 rounded-2xl p-6 md:p-7 border border-gray-100">
                <p className="text-sm font-bold text-snpe-dark mb-4">평가 항목</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {selfItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={16} className="text-snpe-dark flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-600 leading-relaxed mt-6">
                SNPE 앱은 자신의 몸 상태를 이해하고, 스스로 회복(Self Recovery)을 시작할 수 있도록 돕는
                첫 번째 평가 도구입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Assessment — 전문 체형·움직임 평가 */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center flex-shrink-0">
              <ClipboardCheck size={22} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">전문 체형 · 움직임 평가</h2>
              <p className="text-sm text-mint-darker font-medium">Professional Assessment</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            보다 전문적인 평가는 SNPE 전문센터와 인증강사를 통해 진행됩니다.
            SNPE 전문센터에서는 다음과 같은 평가 시스템을 활용하여 신체 정렬과 움직임 상태를 보다 입체적으로 분석합니다.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-6 md:p-7 border border-gray-100">
              <p className="text-sm font-bold text-snpe-dark mb-4">평가 시스템</p>
              <ul className="space-y-2.5">
                {proSystems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-snpe-dark flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-7 border border-gray-100">
              <p className="text-sm font-bold text-snpe-dark mb-4">분석 항목</p>
              <ul className="space-y-2.5">
                {proAnalysis.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-snpe-dark flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed mt-6">
            정적 체형뿐 아니라 발의 기능, 균형 능력, 움직임 보상 패턴, 좌우 비대칭 등을 종합적으로 분석하여
            개인별 운동 방향과 회복 과정을 설계합니다. 이를 통해 개인의 현재 상태를 보다 정확하게 이해하고,
            효율적인 회복 방향을 설정할 수 있습니다.
          </p>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-snpe-darker via-snpe-dark to-snpe text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
            스스로 시작하고, 전문가와 함께 발전하세요
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-6">
            Start with Self Assessment. Advance with Professional Guidance.
          </p>
          <div className="space-y-3 text-white/85 leading-relaxed max-w-2xl mx-auto">
            <p>
              앱을 통해 자신의 몸을 기록하고 이해하는 것에서 시작해 보세요. 그리고 SNPE 인증강사와 전문센터의
              체계적인 평가와 맞춤형 지도를 통해 보다 정교한 움직임 회복 과정을 경험할 수 있습니다.
            </p>
            <p>
              SNPE는 단순히 체형을 분석하는 것을 넘어, 과학적 평가와 지속적인 기록을 바탕으로
              건강한 자세와 움직임 습관을 만들어가는 자기 회복 시스템(Self Recovery System)입니다.
            </p>
          </div>
          <p className="mt-8 text-lg md:text-xl font-bold">
            기록하고(Record) · 이해하고(Understand) · 움직이고(Move) · 회복합니다(Recover)
          </p>
          <p className="mt-2 text-sm text-white/80">
            이것이 SNPE가 추구하는 움직임 기반 자기 회복의 과정입니다.
          </p>
        </div>
      </section>
    </>
  )
}
