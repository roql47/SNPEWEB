import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Quote, Compass, Activity, Anchor, Repeat, ImageIcon } from 'lucide-react'

const corePrinciples = [
  {
    no: '01',
    icon: Compass,
    en: 'Natural Posture',
    ko: '인간 본연의 정렬을 회복하다',
    body: [
      'SNPE는 인체가 본래 가지고 있는 자연스러운 정렬 상태,',
      '즉 NP(Natural Posture)를 중요한 기준으로 설정합니다.',
      '이는 단순히 좋은 자세를 억지로 유지하는 개념이 아니라,',
      '몸이 보다 자연스럽고 효율적인 움직임을 선택할 수 있도록',
      '움직임 패턴과 몸의 사용 방식을 함께 회복해가는 과정에 가깝습니다.',
    ].join(' '),
    quote: 'Natural Posture is not forced. It is restored through movement.',
  },
  {
    no: '02',
    icon: Activity,
    en: 'Mobility & Balance',
    ko: '움직임과 균형을 회복하다',
    body: [
      '반복된 생활 습관과 긴장 속에서 몸의 깊은 근육과 근막(Fascia)은 점차 굳어지고,',
      '움직임의 범위와 신체 균형 역시 제한되기 쉽습니다.',
      'SNPE는 먼저 굳어 있는 깊은 근육과 근막을 부드럽게 이완하고,',
      '몸이 보다 자연스럽게 움직일 수 있는 상태를 만드는 과정에 집중합니다.',
      '특히 SNPE의 밴드·벨트·도구 시스템은 몸의 좌우 균형과 움직임 변화를 보다 쉽게 느낄 수 있도록 돕고,',
      '바른 정렬과 움직임 패턴을 반복적으로 경험할 수 있도록 설계되었습니다.',
      '이는 단순한 근력 강화보다 움직임의 흐름과 신체 협응을 회복하고,',
      '신경근 재교육(Neuromuscular Re-education)을 통해 몸이 올바른 움직임을 다시 학습할 수 있도록 돕는',
      'SNPE만의 움직임 접근 방식입니다.',
    ].join(' '),
    quote: 'Restore mobility. Restore balance.',
  },
  {
    no: '03',
    icon: Anchor,
    en: 'Core Stability',
    ko: '몸의 중심 안정성을 회복하다',
    body: [
      'SNPE는 단순히 겉근육을 강화하는 접근보다,',
      '긴장되고 제한된 깊은 근육(Deep Muscle)의 움직임 회복과',
      '코어 안정성(Core Stability)의 균형을 중요하게 다룹니다.',
      'SNPE는 먼저 굳어 있는 움직임 패턴과 깊은 근육의 긴장을 부드럽게 회복한 뒤,',
      '바른 정렬 상태에서 코어 근육이 안정적으로 활성화될 수 있도록',
      '움직임을 단계적으로 재학습하도록 설계되었습니다.',
      '또한 SNPE의 밴드·벨트·도구 시스템은 몸의 중심 감각과 움직임 연결을 보다 쉽게 경험할 수 있도록 돕고,',
      '효율적인 코어 활성화와 움직임 협응으로 이어질 수 있도록 구성되어 있습니다.',
    ].join(' '),
    quote: 'Restore alignment. Reconnect the core.',
  },
  {
    no: '04',
    icon: Repeat,
    en: 'Movement & Repetition',
    ko: '바른 움직임은 반복 속에서 완성된다',
    body: [
      'SNPE는 운동하는 짧은 시간보다 일상 속 반복되는 자세와 움직임 습관이',
      '몸의 균형에 더 큰 영향을 준다고 설명합니다.',
      '잘못된 자세와 움직임 역시 반복을 통해 만들어지듯,',
      '바른 움직임 또한 반복과 습관을 통해 몸에 학습될 수 있습니다.',
      'SNPE는 운동하는 순간뿐 아니라 걷기, 앉기, 서기, 호흡하기와 같은',
      '일상의 움직임까지 연결된 회복 과정을 중요하게 다룹니다.',
      '또한 자신의 몸 상태와 움직임 변화를 스스로 관찰하고 이해하는 과정 역시',
      '움직임 회복의 중요한 일부로 설명합니다.',
      '꾸준한 반복과 생활 속 실천이 쌓일 때 몸의 움직임은 조금씩 변화할 수 있으며,',
      'SNPE는 그 점진적인 변화의 과정을 중요하게 여깁니다.',
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

function ImagePlaceholder({ aspect = 'aspect-[4/3]', label = '이미지 추후 추가 예정' }) {
  return (
    <div className={`${aspect} w-full rounded-2xl bg-gradient-to-br from-mint-lighter/40 via-white to-gray-50 border border-dashed border-mint/30 flex flex-col items-center justify-center text-gray-400`}>
      <ImageIcon size={36} strokeWidth={1.4} className="mb-2 text-mint/60" />
      <span className="text-xs">{label}</span>
    </div>
  )
}

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
                <ImagePlaceholder />

                <div>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-5xl md:text-6xl font-heading font-bold text-mint/30 leading-none">
                      {p.no}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-mint-lighter/60 text-mint-darker flex items-center justify-center flex-shrink-0">
                      <p.icon size={22} strokeWidth={1.8} />
                    </div>
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
