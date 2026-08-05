import PageBanner from '../../components/common/PageBanner'

export default function About() {
  const storySections = [
    {
      title: '타인에 의한 방법의 한계를 넘어',
      body: '타인에 의존한 해결 방법은 일시적인 완화에는 도움이 될 수 있지만, 반복되는 통증과 재발을 근본적으로 해결하기에는 한계가 있었습니다. SNPE는 이 지점에서 출발해, 스스로 움직이며 본래 자세를 회복하는 방식에 집중합니다.',
      points: [
        '타인 의존형 관리의 반복과 재발 문제 인식',
        '자기 주도형 회복 운동의 필요성 확인',
        '일상에서 지속 가능한 실천 중심 접근',
      ],
      images: ['/images/main-1.png'],
    },
    {
      title: '치아 정렬 원리에서 얻은 힌트',
      body: '치아가 외력으로 바르게 정렬되는 원리를 관찰하며, 척추와 골반 정렬에도 유사한 접근이 가능하다는 아이디어를 얻었습니다. 이를 바탕으로 벨트와 도구를 활용한 운동 원리를 구체화했습니다.',
      points: [
        '정렬 원리의 인체 적용 가능성 탐색',
        '척추 및 골반 정렬을 위한 운동 프로토콜 연구',
        '실제 사례 기반 반복 검증',
      ],
      images: ['/images/main-2.png', '/images/main-3.png'],
    },
    {
      title: '바른자세벨트와 도구 개발',
      body: '비탄력/탄력 특성을 활용한 벨트와 다양한 척추운동 도구를 개발해, 혼자서도 올바른 정렬 자극을 만들 수 있도록 설계했습니다. 도구는 어렵지 않게 사용할 수 있도록 단계별 운동과 함께 구성됩니다.',
      points: [
        '바른자세벨트, 골반밴드, 척추운동 도구 개발',
        '셀프 운동에 적합한 사용성 중심 설계',
        '초급부터 적용 가능한 단계별 동작 체계',
      ],
      images: ['/images/main-4.png'],
    },
    {
      title: '임상 경험을 통한 체계화와 확장',
      body: '꾸준한 실천 사례를 통해 허리 건강을 넘어 목, 어깨, 골반, 체형 관리 등으로 적용 범위가 확대되었습니다. SNPE는 예방과 회복을 동시에 지향하는 일상형 운동법으로 발전해왔습니다.',
      points: [
        '다양한 체형·통증 사례에서의 적용 확대',
        '예방 중심 건강관리 관점 강화',
        '전문센터 교육과 개인 루틴의 연결',
      ],
      images: ['/images/main-5.png', '/images/main-6.png'],
    },
  ]

  return (
    <>
      <PageBanner
        title="개요"
        subtitle="SNPE 바른자세 척추운동을 소개합니다"
        breadcrumb={[{ label: 'SNPE 운동이란?', path: '/about' }, { label: '개요' }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              SNPE란?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              <strong className="text-snpe">S</strong>elf{' '}
              <strong className="text-snpe">N</strong>atural{' '}
              <strong className="text-snpe">P</strong>osture{' '}
              <strong className="text-snpe">E</strong>xercise
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl mx-auto">
              SNPE 바른자세 척추운동은 바른자세벨트와 다양한 도구를 활용하여
              <br />
              스스로 바른자세와 바른체형으로 회복하는
              <br />
              새로운 패러다임의 운동법입니다.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-5 text-center">SNPE 창안배경</h3>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              SNPE 창안자 故 최중기 교수는 반복되는 허리 통증을 겪으며 오랜 시간 다양한 방법을 연구했고,
              타인에 의존한 방식의 한계를 체감했습니다. 이후 스스로 움직여 본래 자세를 회복하는 운동 원리에
              집중하며 실험을 거듭했고, 치아 정렬 원리에서 착안해 벨트와 도구를 활용한 자세 회복 운동법을
              체계화했습니다.
            </p>
          </div>

          <div className="space-y-8 mb-16">
            {storySections.map((section, idx) => (
              <article
                key={section.title}
                className="grid lg:grid-cols-2 gap-6 md:gap-8 items-stretch bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100"
              >
                <div className={`${idx % 2 === 1 ? 'lg:order-2' : ''} h-full`}>
                  {section.images.length === 1 ? (
                    <img
                      src={section.images[0]}
                      alt={section.title}
                      className="w-full h-full min-h-[220px] rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="grid grid-cols-2 gap-3 h-full">
                      {section.images.map((src) => (
                        <img
                          key={src}
                          src={src}
                          alt={section.title}
                          className="w-full h-full min-h-[180px] rounded-2xl object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className={`${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{section.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-4">{section.body}</p>
                  <ul className="space-y-2">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm md:text-base text-gray-700">
                        <span className="mt-1 w-2 h-2 rounded-full bg-snpe" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="bg-snpe/5 rounded-3xl p-8 md:p-12 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">SNPE 운동의 확장</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                '바른자세벨트와 SNPE 도구를 활용한 셀프 자세 회복 운동',
                '허리 건강을 넘어 목·어깨·골반 등 전신 체형 관리로 확장',
                '휜 다리, 척추 불균형, 산후 회복 등 다양한 사례에서 활용',
                '청소년 성장기 체형 관리와 생활 속 자세 개선에 도움',
                '근골격계 예방 및 건강 증진 목적의 실천형 프로그램',
                '전문센터 교육과 일상 루틴을 연결하는 지속 가능한 운동법',
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-snpe text-white text-xs flex items-center justify-center font-bold mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden">
            <img
              src="/images/main-7.png"
              alt="SNPE 운동"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  )
}
