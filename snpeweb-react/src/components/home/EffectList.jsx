const benefits = [
  {
    icon: '/images/benefits/emotional.png',
    title: '정서 안정',
    en: 'Emotional Stability',
    desc: '우울증, 스트레스 완화로\n자존감 향상 및 정서적 안정 도움',
  },
  {
    icon: '/images/benefits/physio.png',
    title: '생리학적 개선',
    en: 'Physiological Effect',
    desc: '불면증, 팔 다리 저림, 무월경 등\n신체 기능 회복에 도움',
  },
  {
    icon: '/images/benefits/positive.png',
    title: '긍정 마인드 향상',
    en: 'Positive Mind',
    desc: '행복감 증가, 삶의 만족도 향상\n동기부여 및 대인관계 개선',
  },
  {
    icon: '/images/benefits/posture.png',
    title: '체형 교정 효과',
    en: 'Orthodontic Effect',
    desc: '휜다리, 거북목, 라운드숄더\n허리·골반 밸런스 개선',
  },
  {
    icon: '/images/benefits/pain.png',
    title: '만성 통증 완화',
    en: 'Pain Relief',
    desc: '목, 어깨, 허리 등\n근육 긴장 완화 및 통증 감소',
  },
  {
    icon: '/images/benefits/body.png',
    title: '신체 기능 개선',
    en: 'Physical Improvement',
    desc: '근력 강화, 체중 조절, 피로 개선\n전반적인 신체 컨디션 향상',
  },
]

export default function EffectList() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-mint-darker text-xs md:text-sm font-semibold uppercase tracking-[0.25em] mb-3">
            Benefits
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
            Wellness Benefits
          </h2>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            마음과 신체의 균형을 통해
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>
            일상 속 건강한 변화를 경험하세요
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 md:gap-y-16">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 mb-5 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                <img
                  src={b.icon}
                  alt={b.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 tracking-tight">
                {b.title}
              </h3>
              <p className="text-sm md:text-[15px] text-gray-500 leading-relaxed whitespace-pre-line">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
