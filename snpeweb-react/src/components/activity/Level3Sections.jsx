/**
 * Level3Sections — SNPE 바른자세운동 전문지도사 LEVEL 3 랜딩
 * Gamma(snpe-level3-hw1sahx.gamma.site) 구성을 기반으로 한 하드코딩 콘텐츠
 */
import {
  CheckCircle2,
  XCircle,
  Eye,
  Link2,
  UserCog,
  Activity,
  Sparkles,
  Layers,
  Repeat,
  ClipboardList,
  Bone,
  Brain,
  Footprints,
  GraduationCap,
  ClipboardCheck,
  ArrowRight,
} from 'lucide-react'
import useReveal from '../../hooks/useReveal'
import useLevelSchedule, { mergeSchedule } from '../../hooks/useLevelSchedule'

// 외부 신청/문의 링크 (PPT 슬라이드 15·18)
const LEVEL3_APPLY_URL = 'https://www.s-ground.co.kr/InstructorCourse'
const KAKAO_CHAT_URL = 'http://pf.kakao.com/_Tqyxib/chat'

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

const goals = [
  { icon: Eye, title: '움직임 이해', desc: '자세를 넘어 움직임 그 자체를 이해하고 분석하는 시각을 갖춥니다.' },
  { icon: Link2, title: '연결성 관찰', desc: '움직임의 연결성과 신체 균형을 체계적으로 관찰하고 평가합니다.' },
  { icon: UserCog, title: '개인별 설계', desc: '회원별 움직임 회복 방향을 개인화하여 전략적으로 설계합니다.' },
  { icon: Activity, title: '변화 역량', desc: '실제 변화 사례를 만들어낼 수 있는 현장 중심의 지도 역량을 구축합니다.' },
  { icon: Sparkles, title: '전문 지도력', desc: 'SNPE 전문가로서의 관찰력과 코칭 지도력을 심화 발전시킵니다.' },
]

const curriculum = [
  {
    en: 'Alignment & Movement',
    ko: '정렬과 움직임의 연결성',
    desc: '신체 정렬이 어떻게 전체 움직임 체계에 영향을 미치는지 심층적으로 분석합니다. 구조적 정렬과 기능적 움직임 간의 상호작용을 이해하고 임상적 적용 능력을 개발합니다.',
    icon: Layers,
  },
  {
    en: 'Movement Pattern Analysis',
    ko: '움직임 패턴 이해',
    desc: '보행, 자세 전환, 일상 동작 속에 숨겨진 움직임 패턴을 체계적으로 평가하고 분류합니다. 보상 패턴과 기능적 제한을 식별하는 전문적 관찰 체계를 확립합니다.',
    icon: Eye,
  },
  {
    en: 'Recovery Through Movement',
    ko: '움직임 기반 회복 전략',
    desc: '수동적 치료에서 능동적 움직임 회복으로 전환하는 전략을 학습합니다. 개인의 회복 단계에 맞는 맞춤형 움직임 처방 원리를 체계적으로 습득합니다.',
    icon: Repeat,
  },
  {
    en: 'Program Design & Coaching',
    ko: '변화를 만드는 지도',
    desc: '데이터에 기반한 프로그램 설계와 결과 중심의 코칭 전략을 통합합니다. 단기 교정을 넘어 장기적인 움직임 변화를 이끌어내는 전문 지도 체계를 구축합니다.',
    icon: UserCog,
  },
  {
    en: 'Case Study',
    ko: '실제 변화 사례 연구',
    desc: '현장에서 수집된 실제 회원 사례를 분석하고, 움직임 회복 과정을 비판적으로 검토합니다. 자신만의 전문 사례 포트폴리오를 구축하는 역량을 개발합니다.',
    icon: ClipboardList,
  },
]

const integration = [
  { title: '연결성 이해', desc: '인체는 고립된 부위의 집합이 아닌 하나의 통합 시스템' },
  { title: '패턴 분석', desc: '각 신체 영역의 연결이 움직임 전체에 미치는 영향 파악' },
  { title: '전문가적 시각', desc: 'SNPE 운동을 심화 활용하는 전문가 역량 개발' },
]

const requirements = [
  { title: 'SNPE Level 2 수료', desc: 'Level 2 과정 정식 수료자' },
  { title: '현장 지도 경험', desc: '실제 회원 지도 경험 보유자' },
  { title: '전문성 확장 의지', desc: '움직임 과학 심화 학습 의지' },
]

const specialists = [
  { icon: Bone, title: 'Spine Movement Specialist', desc: '척추의 정렬과 움직임 패턴을 분석하고, 바른 자세와 균형 잡힌 움직임을 위한 개인별 체형 특성에 맞는 SNPE 솔루션을 제공합니다.' },
  { icon: Brain, title: 'Neck Movement Specialist', desc: '목과 어깨 움직임의 연결성을 분석하고, 개인별 습관에 맞춰 편안한 움직임과 자연스러운 정렬 회복을 위한 SNPE 솔루션을 제공합니다.' },
  { icon: Activity, title: 'Pelvis Movement Specialist', desc: '골반과 몸의 중심 균형을 평가하고, 안정적인 자세와 움직임을 위한 개인 맞춤형 SNPE 솔루션을 제공합니다.' },
  { icon: Footprints, title: 'Foot Movement Specialist', desc: '개인의 발의 구조와 보행 패턴을 분석하고, 신체 균형의 시작점인 발의 기능 회복을 위한 SNPE 솔루션을 제공합니다.' },
]

const coreSkills = [
  '체형 평가 심화',
  '움직임 분석 심화',
  '통증 및 기능 문제 접근',
  '회원 맞춤 프로그램 설계',
  '사례 관리 및 변화 기록',
]

const careerFields = [
  'SNPE 마스터강사',
  'SNPE 전문센터 운영 및 핵심 강사',
  'SNPE STUDIO 운영 및 핵심 강사',
  '외부 출강 (기업 · 학교 · 관공서 · 문화 · 체육센터 등)',
  'SNPE Ambassador (홍보 및 판매파트너)',
]

const schedule = [
  { label: '개강', value: '미정 (추후 공지)' },
  { label: '과정', value: '총 6주 · 주 1회 · 총 36시간 (현장실습 14시간 포함)' },
  { label: '수업시간', value: '금/토 10:00–17:00 (휴게 1시간 포함)' },
  { label: '수강료', value: '300만원' },
  { label: '장소', value: 'SNPE 강남본원 (서울시 강남구 선릉로 823, 한양타운 3층)' },
  { label: '모집정원', value: '24명 한정 (선착순 마감)' },
]

const SCHEDULE_LABEL_MAP = {
  '개강': 'schedule_open',
  '과정': 'course_period',
  '수업시간': 'class_time',
  '수강료': 'tuition',
  '장소': 'location',
  '모집정원': 'capacity_note',
}

export default function Level3Sections() {
  // 어드민 "교육과정 일정 관리"(level3)의 값으로 교육일정 표를 덮어쓴다(없으면 기본값 유지)
  const edu = useLevelSchedule('level3')
  const scheduleRows = mergeSchedule(schedule, edu, SCHEDULE_LABEL_MAP)

  return (
    <>
      {/* INTRO */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-mint-lighter/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <span className="inline-block px-3 py-1 rounded-full bg-snpe-dark/10 text-snpe-dark text-xs font-bold mb-5">
              SNPE LEVEL 3 · Advanced SNPE Specialist
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              움직임을 이해하는 지도사에서
              <br />
              변화의 방향을 설계하는 전문가로
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed max-w-2xl mx-auto">
              <p>
                LEVEL 3는 단순히 운동을 지도하는 과정을 넘어, 회원의 자세와 움직임을 관찰하고,
                몸의 연결성과 움직임 패턴을 이해하며, 실제 변화를 만들어낼 수 있는 전문 지도자로 성장하는 과정입니다.
              </p>
              <p>
                SNPE는 몸을 부분적으로 바라보지 않습니다. 발에서 골반, 척추, 호흡, 그리고 일상 속 움직임 습관까지
                연결된 하나의 움직임 시스템으로 이해합니다. LEVEL 3는 회원의 현재 상태를 보다 깊이 이해하고,
                움직임 회복의 방향을 설계할 수 있는 전문가를 양성합니다.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={LEVEL3_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 bg-snpe-darker text-white rounded-full font-medium hover:bg-snpe-dark transition-colors"
              >
                LEVEL 3 신청하기
              </a>
              <a
                href={KAKAO_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-medium hover:border-snpe-dark transition-colors"
              >
                문의하기
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY LEVEL 3 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">WHY LEVEL 3</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">왜 LEVEL 3는 다를까요?</h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">일반적인 운동 지도</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  운동 방법을 설명하고 정해진 프로그램을 적용하는 데 집중합니다.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  {['운동 처방 중심', '프로그램 적용 중심', '단기 결과 중심'].map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <XCircle size={16} className="text-gray-300 flex-shrink-0" /> {it}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-mint-lighter/40 rounded-2xl p-7 border border-snpe/20">
                <h3 className="font-bold text-snpe-dark mb-3">SNPE LEVEL 3</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  회원이 왜 그렇게 움직이는지, 왜 같은 운동을 해도 결과가 다른지, 왜 변화가 반복되거나 멈추는지를
                  이해하는 것에서 시작합니다.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {['움직임 패턴 이해', '변화의 원인 관찰', '개인별 회복 방향 설계'].map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-snpe-dark flex-shrink-0" /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-center text-gray-500 mt-8 text-sm">
              몸의 움직임을 바라보는 기준이 달라질 때, 회원의 변화도 달라집니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 교육 목표 */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">EDUCATION GOALS</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">LEVEL 3 교육 목표</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                전문 지도자로서 갖추어야 할 핵심 역량 다섯 가지를 체계적으로 개발합니다.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {goals.map((g) => (
                <div key={g.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center mb-4">
                    <g.icon size={22} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{g.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CORE CURRICULUM */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">CORE CURRICULUM</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">5대 핵심 커리큘럼</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                임상 기반의 움직임 과학을 중심으로 구성된 LEVEL 3 전문 교육 과정입니다.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-4">
              {curriculum.map((c, i) => (
                <div key={c.en} className="flex flex-col sm:flex-row gap-5 bg-gray-50 rounded-2xl p-6 md:p-7 border border-gray-100">
                  <div className="flex items-start gap-4 sm:w-64 flex-shrink-0">
                    <span className="w-10 h-10 rounded-full bg-snpe-darker text-white text-sm flex items-center justify-center font-bold flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-xs text-snpe-dark font-semibold">{c.en}</p>
                      <h4 className="font-bold text-gray-900">{c.ko}</h4>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{c.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 통합 움직임 시스템 */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">INTEGRATED MOVEMENT SYSTEM</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">전문 영역 — 통합 움직임 시스템</h2>
              <p className="text-gray-600 leading-relaxed">
                인체는 고립된 부위의 집합이 아니라, 하나의 통합된 움직임 시스템입니다. LEVEL 3는 각 신체 영역의
                연결성을 읽고 SNPE 운동을 보다 심화 있게 활용하는 시각을 개발합니다.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid md:grid-cols-3 gap-5">
              {integration.map((it) => (
                <div key={it.title} className="bg-white rounded-2xl p-7 border border-gray-100 text-center">
                  <h4 className="font-bold text-gray-900 mb-2">{it.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{it.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-center text-snpe-dark font-medium mt-8">
              이 연결성을 읽는 것이 바로 SNPE LEVEL 3 전문가의 시작입니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* LEVEL 2 vs LEVEL 3 + 요건 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">LEVEL 2 vs. LEVEL 3</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">LEVEL 3 수강 요건</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                LEVEL 3는 SNPE LEVEL 2 수료자를 대상으로 하며, 현장 지도 경험이 있는 전문가에게 최적화되어 있습니다.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid sm:grid-cols-3 gap-5">
              {requirements.map((r) => (
                <div key={r.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <CheckCircle2 size={20} className="text-snpe-dark mb-3" />
                  <h4 className="font-bold text-gray-900 mb-1">{r.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Career Path / 전문 영역 */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">LEVEL 3 CAREER PATH</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">변화를 만들어내는 전문 지도사</h2>
              <p className="text-gray-600 leading-relaxed">
                회원의 실제 변화를 만들어내는 전문 지도사 과정입니다. LEVEL 3는 단순히 동작을 가르치는 강사가 아닌,
                체형과 움직임을 분석하고 실질적인 Before &amp; After 사례를 만들어낼 수 있는 전문 지도사를 양성합니다.
                통증 및 기능 문제에 접근하며, 장기 회원 코칭과 맞춤 프로그램 설계 능력을 갖추게 됩니다.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {specialists.map((s) => (
                <div key={s.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center mb-4">
                    <s.icon size={22} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">{s.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-7 border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4">핵심 역량</h4>
                <ul className="space-y-2.5">
                  {coreSkills.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={16} className="text-snpe-dark flex-shrink-0 mt-0.5" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-7 border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4">활동 분야</h4>
                <ul className="space-y-2.5">
                  {careerFields.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-snpe-dark flex-shrink-0" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 교육일정 안내 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-10">
              <GraduationCap size={32} className="text-snpe-dark mx-auto mb-3" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">LEVEL 3 교육일정 안내</h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
              {scheduleRows.map((s) => (
                <div key={s.label} className="flex flex-col sm:flex-row sm:items-center px-6 py-4">
                  <span className="w-32 flex-shrink-0 text-sm font-bold text-snpe-dark flex items-center gap-2">
                    <ClipboardCheck size={14} /> {s.label}
                  </span>
                  <span className="text-sm text-gray-700">{s.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CLOSING */}
      <section className="py-16 md:py-24 bg-snpe-darker text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.3em] text-white/70 mb-4">CLOSING</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
              지금, 전문가로의 전환을 시작하십시오
            </h2>
            <div className="space-y-3 text-white/85 leading-relaxed max-w-2xl mx-auto mb-8">
              <p>
                LEVEL 3는 동작을 가르치는 과정을 넘어, 회원 개개인의 움직임을 이해하고 변화를 설계하는 전문가 과정입니다.
                단순한 기술 향상이 아닌, 전문가로서의 사고 체계와 임상적 역량을 완성하는 과정입니다.
              </p>
              <p>당신의 전문성이 회원의 삶을 바꿉니다.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={LEVEL3_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white text-snpe-darker rounded-full font-medium hover:bg-white/90 transition-colors inline-flex items-center gap-2"
              >
                LEVEL 3 과정 신청하기 <ArrowRight size={16} />
              </a>
              <a
                href={KAKAO_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-white/40 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                문의하기
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
