import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Quote, Compass, Activity, Anchor, Repeat } from 'lucide-react'

const corePrinciples = [
  {
    no: '01',
    icon: Compass,
    en: 'Natural Posture',
    ko: '인간 본연의 정렬을 회복하다',
    body: [
      'SNPE는 인체가 본래 지녀야 할 자연스러운 정렬 상태,',
      '즉 NP(Natural Posture)를 모든 움직임의 기준으로 삼습니다.',
      '바른 정렬은 단순히 자세를 바로잡는 것에 그치지 않고,',
      '몸의 각 관절과 근육이 가장 효율적으로 기능할 수 있는 출발점이 됩니다.',
      '우리는 특정 자세를 강요하는 대신, 몸이 스스로 균형 잡힌 정렬을 찾아갈 수 있도록',
      '인체 본연의 움직임 패턴을 회복하는 데 집중합니다.',
    ].join(' '),
    quote: 'Natural Posture is not forced. It is restored through movement.',
  },
  {
    no: '02',
    icon: Activity,
    en: 'Mobility & Balance',
    ko: '움직임과 균형을 회복하다',
    body: [
      '잘못된 자세와 반복된 일상은 근육과 근막을 경직시켜 움직임의 범위를 제한합니다.',
      'SNPE는 긴장되고 굳어진 몸을 부드럽게 풀어내는 것에서 시작합니다.',
      '밴드·벨트·도구 시스템을 활용하여 신체조직의 긴장을 완화하고,',
      '관절이 가진 본래의 가동 범위를 회복하도록 돕습니다.',
      '특히 좌우 불균형을 스스로 인지하고 해소하는 과정을 통해,',
      '몸이 보다 자연스럽고 안정적인 움직임을 선택할 수 있는 환경을 조성합니다.',
    ].join(' '),
    quote: 'Restore mobility. Restore balance.',
  },
  {
    no: '03',
    icon: Anchor,
    en: 'Core Stability',
    ko: '몸의 중심 안정성을 회복하다',
    body: [
      '움직임이 자유로워졌다면, 이제 그 움직임을 안정적으로 지지할 견고한 중심이 필요합니다.',
      "SNPE가 정의하는 코어(Core)는 단순한 복부 근육의 강화가 아닌, 몸 전체를 연결하는 '중심 안정성'입니다.",
      '깊은 근육(Deep Muscle)의 활성화를 통해 바른 정렬 위에서 힘이 효율적으로 전달되도록 하며,',
      '몸의 중심과 사지가 유기적으로 협응할 수 있도록 단계별로 재학습합니다.',
    ].join(' '),
    quote: 'Restore alignment. Reconnect the core.',
  },
  {
    no: '04',
    icon: Repeat,
    en: 'Movement & Repetition',
    ko: '바른 움직임은 반복을 통해 완성된다',
    body: [
      '몸은 하루 한 시간의 운동보다 일상에서 반복하는 자세에 더 큰 영향을 받습니다.',
      '잘못된 움직임이 반복으로 굳어졌듯, 바른 움직임 또한 일상 속 실천과 반복을 통해 몸에 학습되어야 합니다.',
      'SNPE는 걷기, 앉기, 서기, 호흡하기와 같은 일상적 움직임을 변화의 핵심으로 봅니다.',
      "자신의 몸을 끊임없이 관찰하고 개선해 나가는 '지속 가능한 회복'이",
      '바로 SNPE가 추구하는 궁극적인 가치입니다.',
    ].join(' '),
    quote: 'Repetition reshapes movement.',
  },
]

const snpeMeaning = [
  { letter: 'S', word: 'Self' },
  { letter: 'N', word: 'Natural' },
  { letter: 'P', word: 'Posture' },
  { letter: 'E', word: 'Exercise' },
]

const PRINCIPLE_IMGS = [
  '/images/point_1.png',
  '/images/point_4.jpg', // 2번 ↔ 4번 이미지 맞변경 (PPT 슬라이드 3)
  '/images/point_3.jpg',
  '/images/point_2.png',
]

export default function Philosophy() {
  const { t } = useTranslation()

  return (
    <>
      <PageBanner
        title={t('pages.philosophy')}
        subtitle={t('pages.philosophySub')}
      />

      {/* Intro - The Philosophy of SNPE */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-mint-lighter/30">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">
            02. Philosophy & Principles
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-5 leading-tight">
            몸은 스스로 회복하는 방향으로 움직인다
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            SNPE는 몸의 움직임을 스스로 이해하고,
            <br className="hidden md:block" />
            바른 움직임 패턴을 반복 학습해가는 과정에 집중합니다.
          </p>

          <div className="mt-12 max-w-3xl mx-auto text-left bg-white rounded-3xl p-8 md:p-10 border border-mint/20 shadow-sm">
            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-5">
              SNPE의 핵심 철학은
              <strong className="text-mint-darker"> 몸은 본래 스스로 균형을 회복하려는 방향성을 가지고 있다는 믿음</strong>에서 시작됩니다.
            </p>
            <div className="grid grid-cols-3 gap-3 my-6">
              {[
                { en: 'Selection', ko: '선택' },
                { en: 'Concentration', ko: '집중' },
                { en: 'Repetition', ko: '반복' },
              ].map((item) => (
                <div key={item.en} className="bg-mint-lighter/40 rounded-2xl py-5 text-center border border-mint/10">
                  <p className="text-xs md:text-sm font-semibold text-mint-darker tracking-wide">
                    {item.en}
                  </p>
                  <p className="text-base md:text-lg font-bold text-gray-900 mt-1">
                    {item.ko}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              SNPE는 선택(Selection) · 집중(Concentration) · 반복(Repetition)의 원리를 바탕으로
              보다 자연스럽고 지속 가능한 움직임 회복을 지향합니다.
              순간적인 변화보다 몸 스스로 움직임의 원리를 이해하고 실천하며,
              바른 자세 습관을 만들어가는 과정에 더 큰 의미를 둡니다.
            </p>
          </div>
        </div>
      </section>

      {/* SNPE Meaning */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">
            The Meaning of SNPE
          </p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-3">
            인간 본연의 자세와 움직임을 스스로 회복하는 운동
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
            SNPE라는 이름은 Self · Natural · Posture · Exercise의 의미를 담고 있으며,
            인간 본연의 움직임 회복을 지향하는 철학을 기반으로 합니다.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {snpeMeaning.map((m) => (
              <div
                key={m.letter}
                className="bg-gradient-to-br from-mint-lighter/40 to-white rounded-2xl py-8 border border-mint/20"
              >
                <p className="text-4xl md:text-5xl font-heading font-bold text-mint-darker mb-2">
                  {m.letter}
                </p>
                <p className="text-sm md:text-base text-gray-700 font-medium">{m.word}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">
              Core Principles of SNPE
            </p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-gray-900">
              SNPE의 핵심 원리
            </h2>
            <p className="text-sm md:text-base text-gray-500 mt-3">
              Self Recovery Through Movement
            </p>
          </div>

          <div className="space-y-12 md:space-y-16">
            {corePrinciples.map((p, idx) => (
              <article
                key={p.no}
                className={`grid lg:grid-cols-[1fr_1fr] gap-8 md:gap-10 items-center ${
                  idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={PRINCIPLE_IMGS[idx]}
                    alt={p.en}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>

                <div>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-5xl md:text-6xl font-heading font-bold text-mint/30 leading-none">
                      {p.no}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-1.5">
                    {p.en}
                  </h3>
                  <p className="text-base md:text-lg text-mint-darker font-medium mb-5">
                    {p.ko}
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6">
                    {p.body}
                  </p>
                  <div className="border-l-2 border-mint pl-4">
                    <p className="text-sm md:text-base font-heading italic text-mint-darker">
                      "{p.quote}"
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-mint-darker via-mint-dark to-mint text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Quote size={32} className="text-white/50 mx-auto mb-4" />
          <p className="text-2xl md:text-4xl font-heading font-bold leading-tight">
            Self Recovery Through Movement
          </p>
          <p className="mt-4 text-base md:text-lg text-white/85">
            움직임을 통한 회복, SNPE의 철학입니다.
          </p>
        </div>
      </section>
    </>
  )
}
