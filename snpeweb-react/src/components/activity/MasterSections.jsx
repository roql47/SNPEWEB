/**
 * MasterSections — SNPE MASTER COURSE 랜딩
 * docx 마스터 과정 텍스트 + Gamma 페이지 이미지(public/images/master) 구성
 */
import { Link } from 'react-router-dom'
import {
  Activity,
  Sparkles,
  HeartPulse,
  Database,
  Award,
  Medal,
  Crown,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import useReveal from '../../hooks/useReveal'

function Reveal({ children, delay = 0, className = '' }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  )
}

const whatYouLearn = [
  'SNPE 운동 원리에 대한 해부학·신경과학·운동생리학 기반 분석',
  'SNPE 동작 및 도구 활용에 대한 운동과학 기반 심화 트레이닝',
  'SNPE 지도사 과정 운영을 위한 교육 기획·강의 설계 및 실전 티칭',
  '다양한 케이스 스터디(Case Study)를 통한 SNPE 사례 연구 및 실전 적용',
  'SNPE 지도사 과정 운영을 위한 교육 설계 및 티칭 교수법 심화',
  '글로벌 SNPE 교육 활동과 해외 특강 기회 및 국제 교육 역량 강화',
]

const visionPillars = [
  { icon: Activity, title: 'Movement Science', desc: '움직임 과학 기반 분석' },
  { icon: Sparkles, title: 'Wellness', desc: '웰니스 기반 운동 응용' },
  { icon: HeartPulse, title: 'Healthcare', desc: '헬스케어 연계 관리' },
  { icon: Database, title: 'Data-Driven Program', desc: '데이터 기반 프로그램 개발' },
]

const grading = [
  {
    icon: Award,
    tier: 'BRONZE MASTER',
    color: 'text-amber-700',
    ring: 'border-amber-200',
    label: '지원 자격',
    requirements: [
      'SNPE LEVEL 3 이수자',
      'SNPE 회원 지도 경력 5년 이상',
      'SNPE 전공 석사 학위(논문) 이상 소지자',
    ],
    desc: '위 조건을 충족한 지도자가 MASTER COURSE를 이수하여 취득하는 첫 단계의 마스터강사 과정입니다. SNPE 철학과 교육 시스템을 기반으로 전문 교육자로 성장하기 위한 과정입니다.',
  },
  {
    icon: Medal,
    tier: 'SILVER MASTER',
    color: 'text-gray-500',
    ring: 'border-gray-200',
    label: '승급 기준',
    requirements: [
      'BRONZE MASTER 취득 후',
      'SNPE 지도사 교육 및 국내외 대학 출강 경력 5년 이상',
      'SILVER MASTER 승급 보수교육 이수',
    ],
    desc: '지도사 양성과 교육 시스템 운영 경험을 기반으로, 보다 심화된 교육 역량과 현장 경험을 갖춘 전문 교육자 단계입니다.',
  },
  {
    icon: Crown,
    tier: 'GOLD MASTER',
    color: 'text-yellow-600',
    ring: 'border-yellow-200',
    label: '승급 기준',
    requirements: [
      'SILVER MASTER 취득 후',
      '박사 학위 소지자',
      'SNPE 연구 경력 보유자',
      'SNPE 지도사 교육 및 전문 교육강사 활동 경력 10년 이상',
      'GOLD MASTER 승급 보수교육 이수',
    ],
    desc: 'SNPE 교육 철학과 시스템을 깊이 이해하고, 교육·연구·글로벌 활동 전반을 이끄는 최고 단계의 마스터강사입니다.',
  },
]

export default function MasterSections() {
  return (
    <>
      {/* INTRO — 마스터강사란? / MASTER COURSE */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-mint-lighter/30">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-snpe-dark/10 text-snpe-dark text-xs font-bold mb-4">
                MASTER COURSE
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">마스터강사란?</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>
                  SNPE 마스터강사는 SNPE의 철학과 움직임 원리를 깊이 이해하고, 지도사 교육 및 전문 교육을 수행할 수 있는
                  최고 단계의 전문 교육자입니다. 국내외 대학, 본사 지도사 과정, 전문 교육 프로그램에서 SNPE를 교육할 수 있는
                  교수급 교육 인재를 목표로 하며, 연구·교육·실전 지도 역량을 함께 갖춘 전문가 과정입니다.
                </p>
                <p>
                  <strong className="text-gray-900">SNPE MASTER COURSE</strong>는 LEVEL 3 이후 더 깊은 전문성과 교육 역량을
                  쌓고자 하는 지도자를 위한 최고 심화 과정입니다. 기능해부학, 신경해부학, 웰니스 기반 운동 응용,
                  고급 티칭 스킬 및 실전 워크숍까지 폭넓게 다루며, SNPE 철학과 이론을 보다 전문적으로 연구하고 교육할 수
                  있는 역량을 강화합니다.
                </p>
                <p className="text-gray-500">
                  차의과학대학교·국민대학교 출신 석·박사급 전문 강사진과 국내외 대학 교수진이 직접 교육하며, 단순한 운동
                  지도자를 넘어 교육·연구·글로벌 웰니스 산업을 이끌 수 있는 전문 인재 양성을 목표로 합니다.
                </p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-md">
              <img src="/images/master/intro.png" alt="SNPE MASTER COURSE" className="w-full h-auto block" loading="lazy" />
            </div>
          </div>
          </Reveal>
        </div>
      </section>

      {/* What You Will Learn */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
            <div className="rounded-3xl overflow-hidden shadow-md order-last lg:order-first">
              <img src="/images/master/learn.png" alt="What You Will Learn" className="w-full h-auto block" loading="lazy" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">WHAT YOU WILL LEARN</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">무엇을 배우나요</h2>
              <ul className="space-y-3">
                {whatYouLearn.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-snpe-dark flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </Reveal>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
          <div className="rounded-3xl overflow-hidden shadow-md mb-12 max-h-[420px]">
            <img src="/images/master/vision.png" alt="SNPE MASTER COURSE Vision" className="w-full h-full object-cover" loading="lazy" />
          </div>
          </Reveal>
          <Reveal delay={100}>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">VISION</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
              미래 교육 시스템과 글로벌 웰니스를 이끄는 전문 교육자
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                SNPE MASTER COURSE는 교육·연구·현장 경험을 기반으로 SNPE의 미래 교육 시스템과 글로벌 웰니스 산업을
                함께 이끌어갈 전문 교육자를 양성합니다.
              </p>
              <p>
                마스터강사는 향후 SNPE LEVEL 2 · LEVEL 3 지도사 과정의 전문 교육강사로 활동할 수 있으며,
                국내외 대학 및 대학원 과정, 학술·교육 분야, 웰니스·헬스케어 산업 전반에서 SNPE를 전문적으로 교육하고
                연구하는 핵심 인재로 성장하게 됩니다.
              </p>
            </div>
          </div>
          </Reveal>
          <Reveal delay={150}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {visionPillars.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center mx-auto mb-4">
                  <p.icon size={22} />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{p.title}</h4>
                <p className="text-xs text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
          </Reveal>
        </div>
      </section>

      {/* MASTER GRADING SYSTEM */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">MASTER GRADING SYSTEM</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">마스터 등급 체계</h2>
          </div>
          </Reveal>
          <Reveal delay={120}>
          <div className="grid md:grid-cols-3 gap-6">
            {grading.map((g) => (
              <div key={g.tier} className={`bg-gray-50 rounded-2xl p-7 border ${g.ring}`}>
                <div className="flex items-center gap-3 mb-4">
                  <g.icon size={28} className={g.color} />
                  <h3 className="text-lg font-bold text-gray-900">{g.tier}</h3>
                </div>
                <p className="text-xs font-semibold text-snpe-dark mb-2">{g.label}</p>
                <ul className="space-y-2 mb-4">
                  {g.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-snpe-dark flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-200 pt-4">{g.desc}</p>
              </div>
            ))}
          </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-snpe-darker via-snpe-dark to-snpe text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Reveal>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
            SNPE의 미래를 함께 이끄는 마스터강사
          </h2>
          <p className="text-white/85 leading-relaxed mb-8 max-w-2xl mx-auto">
            교육·연구·글로벌 웰니스 산업을 연결하여 보다 전문적이고 미래지향적인 SNPE 교육 생태계를 구축해 나갑니다.
          </p>
          <Link
            to="/customerinquiry"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-snpe-darker rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            과정 문의하기 <ArrowRight size={16} />
          </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
