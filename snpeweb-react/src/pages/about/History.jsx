import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Award, Wrench, GraduationCap, Globe2, Sparkles, ArrowRight } from 'lucide-react'

const eras = [
  {
    id: 'snpe-1',
    badge: 'SNPE 1.0',
    period: '2003 – 2012',
    title: 'The Beginning of Self Recovery',
    image: '/images/history/snpe-1.png',
    summary:
      'Self Recovery 철학과 초기 움직임 교정 원리가 형성된 시기입니다. 척추와 골반 중심의 움직임 회복 접근을 바탕으로, 인체 스스로 정렬을 회복할 수 있는 운동 원리와 초기 교정 도구들이 개발되었습니다.',
    evolution: [
      'Self Recovery 철학 정립',
      '초기 움직임 교정 원리 개발',
      '바른자세벨트, 고관절교정벨트 및 초기 도구 개발',
      '척추·골반 중심 운동 시스템 구축',
      'NP Technique 기반 움직임 교정 원리 연구',
    ],
    milestones: [
      { year: '2003', event: '경기대학교 사회교육원 최초 SNPE 강의 개설' },
      { year: '2007', event: '『척추를 바로잡아야 건강이 보인다』 출간' },
      { year: '2010', event: '한림대학교대학원 SNPE 지도사 과정 개설' },
    ],
    tools: [
      '바른자세벨트',
      '골반교정벨트',
      '나무손',
      '원통형 베개',
      '초기 도자기 교정 도구',
    ],
  },
  {
    id: 'snpe-2',
    badge: 'SNPE 2.0',
    period: '2013 – 2022',
    title: 'Expansion & Systemization',
    image: '/images/history/snpe-2.png',
    // 2017년 출간 도서 — 에셋 추가 시 표시됨 (파일 미존재 시 자동 숨김)
    book: {
      image: '/images/history/book-snpe-spine.png',
      title: 'SNPE 바른자세 척추운동',
      caption: '2017 출간',
    },
    summary:
      '교육·도구·센터·콘텐츠 시스템이 본격적으로 확장된 시기입니다. SNPE는 척추 중심 운동을 넘어 발·골반·목·어깨·전신 움직임까지 확장되었으며, 전문 교육과 평가 시스템을 갖춘 통합 움직임 솔루션으로 발전하였습니다.',
    evolution: [
      '지도자 교육 체계화',
      '전국 전문센터 확대',
      '도구 기반 움직임 시스템 고도화',
      '움직임 평가 및 교육 시스템 구축',
      '온라인 콘텐츠 및 디지털 교육 도입',
    ],
    academic: [
      '스포츠·운동 분야 학술 연구 확대',
      '대학 및 산학 협력 기반 구축',
      '움직임 평가 및 교육 체계 고도화',
    ],
    milestones: [
      { year: '2013', event: '동국대학교 미래융합교육원 SNPE 지도사 과정 개설' },
      { year: '2015', event: 'PIC(Pacific InterContinental College) SNPE 전공 개설' },
      { year: '2016', event: 'SNPE 자세분석 App 런칭' },
      { year: '2017', event: '『SNPE 바른자세 척추운동』 출간' },
      { year: '2020', event: '국민대학교 스포츠산업대학원 SNPE 트랙 개설' },
    ],
    tools: [
      '바른자세벨트, 골반밴드',
      '다나손, 도자기손, 멀티다나손',
      '웨이브베개, 웨이브도자기',
      '웨이브롤러 시리즈',
      '투레일웨이브에펠',
      '도깨비손 시리즈',
      '다나볼',
      '도깨비폼롤러',
    ],
  },
  {
    id: 'snpe-3',
    badge: 'SNPE 3.0',
    period: '2023 –',
    title: 'Technology, Data & Global Vision',
    summary:
      '움직임 과학(Movement Science), 데이터(Data), AI 기술을 기반으로 더 정교하고 개인화된 움직임 솔루션을 구축하는 단계입니다. SNPE는 운동을 넘어 신체 정렬·회복·웰니스·라이프스타일을 연결하는 통합 Self Recovery Wellness Platform으로 진화하고 있습니다.',
    evolution: [
      'AI 기반 움직임 분석 시스템 개발',
      '데이터 기반 평가 플랫폼 구축',
      '디지털 교육 콘텐츠 확대',
      '글로벌 표준 교육 시스템 구축',
      'Wellness 중심 통합 플랫폼 확장',
      '전문 지도자 및 마스터 교육 시스템 구축',
    ],
    milestones: [
      { year: '2024', event: 'CHA University 스포츠의학대학원 SNPE 전공 트랙 개설' },
    ],
    tools: [
      '다나손2',
      '웨이브베개2',
      '웨이브에펠2',
      '풋밸런스',
      '풋크림',
      'C커브 경추베개',
      '인솔',
      '2in1 도깨비 폼롤러',
    ],
    future: [
      'Personalized Movement Solution 개발',
      'AI 기반 SNPE App 및 데이터 플랫폼 구축',
      'Digital Healthcare 콘텐츠 확대',
      'Wellness · Recovery · Lifestyle 통합 프로그램 개발',
      '글로벌 교육 및 콘텐츠 플랫폼 구축',
      '움직임 과학과 웰니스 연구의 확장',
    ],
    global: [
      { region: 'USA', label: '미국' },
      { region: 'Southeast Asia', label: '동남아시아' },
      { region: 'Japan', label: '일본' },
    ],
  },
]


function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function History() {
  const { t } = useTranslation()

  return (
    <>
      <PageBanner
        title={t('pages.evolution')}
        subtitle={t('pages.evolutionSub')}
      />

      {/* Hero / Intro */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-white to-mint-lighter/30">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">
            The Evolution of SNPE
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-4 leading-tight">
            Built on Self Recovery.
            <br />
            Evolving Through Movement Science.
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            SNPE는 Self Recovery 철학을 기반으로,
            움직임·정렬·도구·교육·데이터를 연결하며 지속적으로 발전하는
            <strong className="text-gray-900"> Movement Wellness System</strong>을 만들어가고 있습니다.
          </p>
          <p className="mt-3 text-sm md:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed">
            초기의 자세 회복 운동에서 시작하여, 전문 교육 시스템과 움직임 평가 체계,
            디지털 콘텐츠와 AI 기반 기술을 연결하는 글로벌 Self Recovery Wellness Platform으로 진화하고 있습니다.
          </p>
        </div>
      </section>

      {/* Evolution Overview - 1.0/2.0/3.0 카드 */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-center text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-3">
            Evolution Overview
          </h3>
          <div className="grid md:grid-cols-3 gap-5">
            {eras.map((era) => (
              <button
                key={era.id}
                onClick={() => scrollToId(era.id)}
                className="group text-left bg-gradient-to-br from-mint-lighter/40 to-white rounded-3xl p-7 border border-mint/20 hover:border-mint hover:shadow-lg transition-all flex flex-col"
              >
                <p className="text-xs font-semibold tracking-widest text-mint-darker mb-2">
                  {era.period}
                </p>
                <p className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                  {era.badge}
                </p>
                <p className="text-sm md:text-base font-medium text-mint-darker mb-3">
                  {era.title}
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-gray-500 group-hover:text-mint-darker transition-colors mt-auto">
                  자세히 보기 <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 시기별 상세 */}
      {eras.map((era, idx) => (
        <section
          key={era.id}
          id={era.id}
          className={`py-20 md:py-28 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} scroll-mt-24`}
        >
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-10 md:mb-14">
              <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-2">
                {era.period}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-2">
                {era.badge}
              </h2>
              <p className="text-lg md:text-2xl text-mint-darker font-medium mb-5">
                {era.title}
              </p>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl">
                {era.summary}
              </p>

              {era.image && (
                <div className="mt-8 grid gap-5 md:grid-cols-[1.6fr_1fr] items-center max-w-3xl">
                  <figure className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                    <img
                      src={era.image}
                      alt={`${era.badge} 도구 모음`}
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                  </figure>
                  {era.book && (
                    <figure className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm text-center">
                      <img
                        src={era.book.image}
                        alt={era.book.title}
                        className="w-full h-auto block max-h-[280px] object-contain p-3"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.closest('figure').style.display = 'none'
                        }}
                      />
                      <figcaption className="px-3 pb-3 -mt-1">
                        <p className="text-sm font-bold text-gray-900">{era.book.title}</p>
                        <p className="text-xs text-gray-500">{era.book.caption}</p>
                      </figcaption>
                    </figure>
                  )}
                </div>
              )}
            </div>

            {/* Major Evolution */}
            <div className="mb-10">
              <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-gray-900 mb-4">
                <Sparkles size={18} className="text-mint-darker" /> Major Evolution
              </h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {era.evolution.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 bg-white rounded-xl px-4 py-3 border border-gray-100"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-mint-darker flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Expansion (2.0 only) */}
            {era.academic && (
              <div className="mb-10">
                <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-gray-900 mb-4">
                  <GraduationCap size={18} className="text-mint-darker" /> Academic & Educational Expansion
                </h3>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {era.academic.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 bg-white rounded-xl px-4 py-3 border border-gray-100"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-mint-darker flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Historical Milestones */}
            {era.milestones.length > 0 && (
              <div className="mb-10">
                <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-gray-900 mb-4">
                  <Award size={18} className="text-mint-darker" /> Historical Milestones
                </h3>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  {era.milestones.map((m, mi) => (
                    <div
                      key={`${m.year}-${mi}`}
                      className="grid grid-cols-[80px_1fr] items-center px-5 py-4 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-sm md:text-base font-bold text-mint-darker">{m.year}</span>
                      <span className="text-sm md:text-base text-gray-700">{m.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tools */}
            {era.tools.length > 0 && (
              <div className="mb-10">
                <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-gray-900 mb-4">
                  <Wrench size={18} className="text-mint-darker" /> {era.id === 'snpe-1' ? 'Early Tools' : 'Tool Innovation'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {era.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-4 py-2 bg-mint-lighter/60 text-mint-darker text-sm rounded-full border border-mint/20"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Future Direction (3.0 only) */}
            {era.future && (
              <div className="mb-10">
                <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-gray-900 mb-4">
                  <ArrowRight size={18} className="text-mint-darker" /> Future Direction
                </h3>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {era.future.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 bg-gradient-to-br from-mint-lighter/40 to-white rounded-xl px-4 py-3 border border-mint/20"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-mint-darker flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Global Expansion (3.0 only) */}
            {era.global && (
              <div>
                <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-gray-900 mb-4">
                  <Globe2 size={18} className="text-mint-darker" /> Global Expansion
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {era.global.map((g) => (
                    <div
                      key={g.region}
                      className="bg-white rounded-2xl p-5 text-center border border-gray-100"
                    >
                      <p className="text-base md:text-lg font-bold text-gray-900">{g.region}</p>
                      <p className="text-xs text-gray-500 mt-1">{g.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Vision */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-mint-darker via-mint-dark to-mint text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-white/70 mb-4">
            Vision
          </p>
          <p className="text-2xl md:text-4xl font-heading font-bold leading-tight mb-4">
            미래형 Self Recovery Wellness System을 지향합니다.
          </p>
          <p className="text-sm md:text-base text-white/85 leading-relaxed">
            SNPE는 단순한 운동 브랜드가 아니라, 움직임 과학과 기술을 연결하여
            <br className="hidden md:block" />
            사람들이 스스로 자신의 몸을 이해하고 회복할 수 있도록 돕는 글로벌 움직임 시스템으로 발전합니다.
          </p>
        </div>
      </section>

    </>
  )
}
