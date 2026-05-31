/**
 * Level2Sections — SNPE 바른자세운동 전문지도사 LEVEL 2 랜딩
 * Level1Sections와 동일한 톤의 하드코딩 콘텐츠 구성
 */
import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  XCircle,
  BookOpen,
  Activity,
  Users,
  Target,
  GraduationCap,
  ClipboardCheck,
  Eye,
  ArrowRight,
} from 'lucide-react'

const stages = [
  { step: '1단계', title: '이론 교육', desc: 'SNPE 핵심 이론 및 기능해부학 학습' },
  { step: '2단계', title: 'SNPE 8 Essential Movements 실습', desc: '벨트 및 도구 운동을 통한 셀프 컨디셔닝 시스템 실습' },
  { step: '3단계', title: '티칭 훈련', desc: '그룹·개인레슨 구성 및 지도 실습' },
  { step: '4단계', title: '현장 실습', desc: '전문센터 2주 현장 실습' },
]

const philosophy = [
  { num: '1', title: 'SNPE 개론', desc: 'SNPE의 철학적 기반과 전체 시스템에 대한 깊은 이해를 형성합니다.' },
  { num: '2', title: '9가지 핵심이론', desc: '몸의 정렬, 무너짐의 원인, 회복 원리까지 체계적으로 학습합니다.' },
  { num: '3', title: '움직임 회복 원리', desc: '이론이 실제 현장 지도와 어떻게 연결되는지 실용적으로 습득합니다.' },
]

const anatomy = [
  { title: '척추와 골반', desc: '척추의 만곡과 골반의 위치가 전신 정렬에 미치는 영향을 움직임 관점에서 이해합니다.' },
  { title: '호흡과 체간 안정화', desc: '올바른 호흡 패턴이 체간 안정화와 전신 움직임에 어떻게 기여하는지 학습합니다.' },
  { title: '발과 하지 정렬', desc: '발의 아치 구조와 하지 정렬이 전신에 미치는 연쇄적 영향을 이해합니다.' },
]

const teachingSkills = [
  { title: '그룹레슨 구성법', desc: '다양한 레벨의 회원을 위한 체계적 그룹 수업 설계' },
  { title: '개인레슨 구성법', desc: '1:1 맞춤형 프로그램 설계 및 진행 방법' },
  { title: '티칭 실습', desc: '실전과 동일한 환경에서의 반복 지도 경험' },
  { title: '회원 관찰', desc: '움직임 패턴 분석 및 문제점 파악 능력 개발' },
  { title: '동작 수정', desc: '티칭과 피드백을 통한 효과적인 동작 교정 기술' },
  { title: '수업 운영 방식', desc: '시간 관리, 흐름 조절, 수업 환경 구성 능력' },
]

const groupLessons = [
  {
    img: '/images/level2/lesson-neck.png',
    title: '목 · 어깨 프로그램',
    desc: '현대인의 대표적 고통 부위인 목과 어깨의 긴장 해소 및 정렬 회복 수업 구성과 지도 실습',
  },
  {
    img: '/images/level2/lesson-back.png',
    title: '허리 · 골반 프로그램',
    desc: '허리 통증과 골반 불균형을 다루는 프로그램 구성 및 회원 맞춤 지도 방법 실습',
  },
  {
    img: '/images/level2/lesson-leg.png',
    title: '휜다리 프로그램',
    desc: '하지 정렬 문제를 다루는 수업 설계와 단계적 움직임 교정 지도 경험',
  },
]

const fieldwork = [
  { num: '01', title: '회원 응대', desc: '실제 센터 회원과의 소통 방식, 첫 상담 및 관계 형성 방법을 경험합니다.' },
  { num: '02', title: '수업 흐름 이해', desc: '전문 강사의 실제 수업을 관찰하며 수업 구성과 흐름의 원리를 체득합니다.' },
  { num: '03', title: '티칭 보조 및 큐잉', desc: '실제 수업 보조 역할을 통해 큐잉 방법과 타이밍을 현장에서 훈련합니다.' },
  { num: '04', title: '현장 피드백', desc: '전문 강사로부터 즉각적이고 구체적인 피드백을 받으며 빠르게 성장합니다.' },
  { num: '05', title: '센터 운영 방식', desc: '실제 전문센터의 운영 구조와 프로그램 관리 방식을 직접 체험합니다.' },
]

const aims = [
  { icon: Target, title: '기준을 세운다', desc: '몸을 바라보는 명확한 분석 기준과 관점을 갖춘 전문가로 성장합니다.' },
  { icon: Eye, title: '움직임을 이해한다', desc: '사람의 움직임 패턴을 읽고, 그 원인을 파악하는 깊은 이해력을 개발합니다.' },
  { icon: Activity, title: '변화를 만든다', desc: '이론과 실습이 통합된 역량으로 회원의 실질적이고 지속적인 변화를 이끕니다.' },
]

const recommendations = [
  '몸을 더 깊이 이해하고 싶은 분 — 표면적 동작 너머, 몸이 왜 그렇게 움직이는지 근본 원리를 알고 싶은 분',
  '운동을 원리 중심으로 배우고 싶은 분 — 외우는 교육이 아닌, 이해하고 응용할 수 있는 진정한 지식을 원하는 분',
  '회원을 제대로 지도하고 싶은 분 — 일대일 혹은 그룹 지도에서 실질적인 변화를 만들어내고 싶은 운동강사',
  '필라테스·요가·피트니스 전문성을 확장하고 싶은 분 — 기존 전문 분야에 SNPE의 움직임을 더하고 싶은 분',
  'SNPE 강사로 성장하고 싶은 분 — 전문센터에서 활동하거나 독립적으로 활동하고 싶은 분',
]

const schedule = [
  { label: '개강', value: '미정 (추후 공지)' },
  { label: '과정', value: '총 12주 · 주 1회 · 총 84시간 (현장실습 14시간 포함)' },
  { label: '수업시간', value: '금/토 10:00–18:00 (휴게 1시간 포함)' },
  { label: '수강료', value: '650만원' },
  { label: '장소', value: 'SNPE 강남본원 (서울시 강남구 선릉로 823, 한양타운 3층)' },
  { label: '모집정원', value: '24명 한정 (선착순 마감)' },
]

export default function Level2Sections() {
  return (
    <>
      {/* INTRO */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-mint-lighter/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-snpe-dark/10 text-snpe-dark text-xs font-bold mb-5">
            SNPE LEVEL 2
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            몸의 움직임을 이해하는 사람에서
            <br />
            사람의 변화를 이끄는 전문가로
          </h2>
          <div className="space-y-3 text-gray-600 leading-relaxed max-w-2xl mx-auto">
            <p>
              LEVEL 2는 단순히 운동 동작을 배우는 과정이 아닙니다. 몸의 정렬과 움직임을 이해하고,
              사람의 통증과 자세를 바라보는 기준을 배우며, 실제 현장에서 회원을 지도할 수 있는 역량을 만드는 전문가 과정입니다.
            </p>
            <p>
              SNPE LEVEL 2는 '운동을 가르치는 사람' 이전에, 사람의 몸을 이해하는 사람을 만드는 교육을 지향합니다.
            </p>
          </div>
          <p className="mt-6 text-snpe-dark font-bold">10주 교육 + 2주 현장실습 = 12주 과정</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/online"
              className="px-7 py-3 bg-snpe-darker text-white rounded-full font-medium hover:bg-snpe-dark transition-colors"
            >
              과정 신청하기
            </Link>
            <Link
              to="/customerinquiry"
              className="px-7 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-medium hover:border-snpe-dark transition-colors"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>

      {/* WHY LEVEL 2 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">WHY LEVEL 2</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">왜 LEVEL 2는 다를까요?</h2>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-md mb-10 max-h-[420px]">
            <img src="/images/level2/why.png" alt="SNPE LEVEL 2 지도 장면" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3">일반 운동 교육</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                동작을 외우고 따라 하는 방식에 집중합니다. 정해진 순서대로 반복하며 형태를 익히는 데 그칩니다.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                {['동작 암기 중심', '획일화된 지도 방식', '표면적 결과에 집중'].map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <XCircle size={16} className="text-gray-300 flex-shrink-0" /> {it}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-mint-lighter/40 rounded-2xl p-7 border border-snpe/20">
              <h3 className="font-bold text-snpe-dark mb-3">SNPE LEVEL 2</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                왜 몸이 무너지는지, 왜 통증이 반복되는지, 왜 같은 운동을 해도 결과가 달라지는지를 이해하는 것에서 시작합니다.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                {['몸의 정렬과 움직임 원리 이해', '개인 맞춤형 지도 역량 개발', '근본적 변화를 이끄는 기준 정립'].map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-snpe-dark flex-shrink-0" /> {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 12 WEEK PROGRAM */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">12 WEEK PROGRAM</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">12주 핵심 교육 과정</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              LEVEL 2의 교육은 단순 실습 반복이 아닌, 이론 · 움직임 이해 · 티칭 · 현장 적용까지 단계적으로 연결됩니다.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {stages.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                <span className="w-9 h-9 rounded-full bg-snpe-darker text-white text-sm flex items-center justify-center font-bold mb-4">
                  {i + 1}
                </span>
                <p className="text-xs text-snpe-dark font-semibold mb-1">{s.step}</p>
                <h4 className="font-bold text-gray-900 mb-2 text-sm">{s.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { big: '10주', title: '교육 과정', desc: '이론부터 실습까지 체계적 커리큘럼' },
              { big: '2주', title: '현장실습', desc: '전문센터 실전 경험' },
              { big: '12주', title: '총 교육 기간', desc: '완성된 지도자 양성을 위한 집중 과정' },
            ].map((c, i) => (
              <div key={i} className="bg-snpe-dark/10 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-snpe-dark mb-1">{c.big}</p>
                <p className="font-bold text-gray-900 text-sm">{c.title}</p>
                <p className="text-xs text-gray-500 mt-1">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM PHILOSOPHY */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center mb-12">
            <div className="rounded-3xl overflow-hidden shadow-md">
              <img src="/images/level2/philosophy.png" alt="SNPE 핵심 이론과 척추 모델" className="w-full h-auto block" loading="lazy" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">PROGRAM PHILOSOPHY</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">SNPE 핵심 이론과 움직임의 이해</h2>
              <p className="text-gray-600 leading-relaxed">
                SNPE 개론과 9가지 핵심이론을 통해 몸의 정렬과 움직임 회복 원리를 학습합니다.
                단순히 '자세를 바르게 만든다'가 아니라, 몸이 왜 틀어지고 무너지는지를 이해하는 과정입니다.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {philosophy.map((p) => (
              <div key={p.num} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <span className="w-9 h-9 rounded-full bg-snpe-dark/10 text-snpe-dark text-sm flex items-center justify-center font-bold mb-4">
                  {p.num}
                </span>
                <h4 className="font-bold text-gray-900 mb-2">{p.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONLINE CURRICULUM */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">ONLINE CURRICULUM</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">기능해부학 기반의 움직임 교육</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              온라인 기능해부학 과정이 함께 진행됩니다. 단순 암기식 해부학이 아니라, 실제 회원의 움직임을 이해하기 위한
              기능 중심 해부학 교육입니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {anatomy.map((a) => (
              <div key={a.title} className="bg-white rounded-2xl p-6 border border-gray-100 flex gap-4">
                <BookOpen size={22} className="text-snpe-dark flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">{a.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SNPE 8 Essential Movements */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">SNPE 8 ESSENTIAL MOVEMENTS</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">셀프 컨디셔닝 시스템</h2>
          <p className="text-gray-600 mb-10">
            목 · 어깨 · 허리 · 골반 · 하지 정렬까지, SNPE의 다양한 움직임 시스템을 통해 몸의 균형 회복과
            움직임 재교육 방법을 학습합니다.
          </p>
          <div className="grid sm:grid-cols-2 gap-5 text-left">
            <div className="bg-mint-lighter/40 rounded-2xl p-6 border border-snpe/20">
              <h4 className="font-bold text-snpe-dark mb-2">SNPE 벨트 운동</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                SNPE 전용 벨트를 활용한 척추 정렬 및 자세 교정 운동 시스템. 목, 허리, 골반 각 부위별 프로토콜을 습득합니다.
              </p>
            </div>
            <div className="bg-mint-lighter/40 rounded-2xl p-6 border border-snpe/20">
              <h4 className="font-bold text-snpe-dark mb-2">SNPE 도구 운동</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                다양한 SNPE 전용 도구를 활용하여 몸의 불균형을 효과적으로 회복시키는 운동 방법을 학습하고 실습합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 티칭과 수업 구성 훈련 */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">TEACHING TRAINING</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">티칭과 수업 구성 훈련</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              좋은 지도자는 동작만 설명하는 사람이 아닙니다. 회원의 움직임을 관찰하고, 필요한 정보를 전달하며,
              변화를 이끌어낼 수 있어야 합니다.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teachingSkills.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                <Users size={20} className="text-snpe-dark mb-3" />
                <h4 className="font-bold text-gray-900 mb-2 text-sm">{s.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 실전 그룹레슨 실습 */}
      <section className="py-16 md:py-24 bg-mint-lighter/20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">GROUP LESSON PRACTICE</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">실전 그룹레슨 실습</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              실제 회원 프로그램을 기반으로 그룹레슨 실습이 진행됩니다. 단순히 배우는 것에서 끝나는 것이 아니라,
              실제로 설명하고 지도하는 경험까지 연결됩니다. 실습 후 강사의 세밀한 피드백을 통해 지도 역량을 빠르게 성장시킵니다.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {groupLessons.map((g) => (
              <div key={g.title} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img src={g.img} alt={g.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-gray-900 mb-2">{g.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2주 전문센터 현장실습 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">FIELD PRACTICE</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">2주 전문센터 현장실습</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              교육 이후에는 SNPE 전문센터 현장실습이 진행됩니다. 실제 수업 환경 속에서 지도자로서의 감각과 태도를
              몸으로 익히는 시간입니다.
            </p>
          </div>
          <div className="space-y-3">
            {fieldwork.map((f) => (
              <div key={f.num} className="flex items-start gap-5 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <span className="text-2xl font-bold text-snpe/30 flex-shrink-0">{f.num}</span>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{f.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEVEL 2가 지향하는 것 */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">LEVEL 2가 지향하는 것</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              SNPE LEVEL 2는 단순한 자격증 취득을 목표로 하지 않습니다. 몸을 바라보는 기준을 배우고,
              사람의 움직임을 이해하며, 현장에서 실제 변화를 만들어낼 수 있는 지도자를 양성합니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {aims.map((a) => (
              <div key={a.title} className="bg-white rounded-2xl p-7 border border-gray-100 text-center">
                <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center mx-auto mb-4">
                  <a.icon size={22} />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{a.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 추천 대상 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">이런 분들에게 추천합니다</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              SNPE LEVEL 2는 특정 배경이나 경력보다, 사람의 몸을 진심으로 이해하고 싶은 분을 위한 과정입니다.
            </p>
          </div>
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
            <div className="rounded-3xl overflow-hidden shadow-md">
              <img src="/images/level2/recommend.png" alt="SNPE LEVEL 2 회원 지도 장면" className="w-full h-auto block" loading="lazy" />
            </div>
            <ul className="space-y-3">
              {recommendations.map((r, i) => (
                <li key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <CheckCircle2 size={18} className="text-snpe-dark flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 교육일정 안내 */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/level2/schedule.png)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <GraduationCap size={32} className="text-snpe-dark mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">LEVEL 2 교육일정 안내</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
            {schedule.map((s) => (
              <div key={s.label} className="flex flex-col sm:flex-row sm:items-center px-6 py-4">
                <span className="w-32 flex-shrink-0 text-sm font-bold text-snpe-dark flex items-center gap-2">
                  <ClipboardCheck size={14} /> {s.label}
                </span>
                <span className="text-sm text-gray-700">{s.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center bg-snpe-dark/10 rounded-3xl p-8">
            <p className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              몸의 변화는 누군가의 삶을 바꾸는 시작이 됩니다
            </p>
            <p className="text-sm text-gray-600 mb-6 max-w-xl mx-auto">
              LEVEL 2는 당신의 변화를 전문성으로 확장하는 과정입니다. 당신의 전문성이 누군가의 삶을 바꾸는 힘이 됩니다.
            </p>
            <Link
              to="/online"
              className="inline-flex items-center gap-2 px-8 py-3 bg-snpe-darker text-white rounded-full font-medium hover:bg-snpe-dark transition-colors"
            >
              LEVEL 2 과정 신청하기 <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
