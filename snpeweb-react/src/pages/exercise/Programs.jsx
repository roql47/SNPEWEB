import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Activity, Waves, Sparkles, User, Users, ArrowRight, Baby, GraduationCap, HeartPulse, Flower2, PersonStanding } from 'lucide-react'
import { Link } from 'react-router-dom'

const categories = [
  {
    no: '01',
    en: 'Body Alignment Programs',
    ko: '바디 밸런스 프로그램',
    icon: Activity,
    desc: '체형 불균형과 자세 정렬을 위한 프로그램입니다. 목·어깨·허리·골반·다리·발까지 전신의 움직임 패턴을 분석하고, 바른 정렬과 라인 회복을 돕습니다. 자세 습관, 좌우 밸런스, 움직임 패턴을 함께 관리하여 보다 편안하고 균형 있는 몸의 움직임을 만들어갑니다.',
    items: [
      '거북목 · 일자목 밸런스',
      '어깨 비대칭 밸런스',
      '허리 · 골반 정렬',
      '골반 라인 케어',
      '휜다리 · 다리라인 밸런스',
      '척추측만 밸런스 케어',
      '얼굴 비대칭 밸런스',
      '발 정렬 및 보행 밸런스',
      '체형 분석 & 자세 교정 프로그램',
    ],
  },
  {
    no: '02',
    en: 'Self Recovery Care',
    ko: '셀프 리커버리 케어',
    icon: Waves,
    desc: '일상 속 반복되는 긴장과 피로를 스스로 관리하고 회복하기 위한 프로그램입니다. 목·허리·골반·어깨·발 등 부위별 움직임 회복 루틴과 컨디셔닝 프로그램을 통해 보다 편안한 몸 상태와 움직임 회복을 돕습니다. SNPE 도구와 움직임 루틴을 활용하여 몸의 긴장을 이완하고 회복 습관을 만들어갈 수 있도록 구성됩니다.',
    items: [
      '목 · 어깨 Recovery',
      '허리 · 골반 Recovery',
      '하체 순환 케어',
      '근막 이완 & Release',
      '피로 회복 스트레칭',
      '움직임 컨디셔닝',
      '림프 순환 케어',
      '호흡 & Relaxation',
      'Recovery Flow',
    ],
  },
]

// 라이프 밸런스 프로그램 (Wellness Programs) — 생애주기별 5종
const lifecyclePrograms = [
  {
    icon: Baby,
    en: 'Kids & Growth',
    ko: '성장기 밸런스 프로그램',
    desc: '올바른 자세 습관과 균형 있는 성장 환경을 위한 키즈 · 청소년 프로그램',
  },
  {
    icon: GraduationCap,
    en: 'Student Balance',
    ko: '학생 자세 관리 프로그램',
    desc: '장시간 앉아있는 학습 환경 속에서 자세 균형과 건강한 움직임 습관을 돕는 프로그램',
  },
  {
    icon: PersonStanding,
    en: 'Adult Wellness',
    ko: '성인 움직임 밸런스 프로그램',
    desc: '일상 속 반복되는 자세 습관과 신체 불균형을 관리하며 건강한 움직임을 만들어가는 프로그램',
  },
  {
    icon: Flower2,
    en: 'Prenatal & Postnatal Care',
    ko: '산전 · 산후 밸런스 프로그램',
    desc: '임신과 출산 과정에서 변화하는 몸의 균형과 움직임 회복을 위한 프로그램',
  },
  {
    icon: HeartPulse,
    en: 'Senior Balance',
    ko: '시니어 밸런스 프로그램',
    desc: '건강한 노화와 독립적인 일상생활을 위한 움직임 · 균형 · 기능 관리 프로그램',
  },
]

const programTypes = [
  {
    icon: User,
    en: 'Personal Lesson',
    ko: '개인레슨',
    desc: '개인의 체형, 움직임 패턴, 생활 습관을 기반으로 진행되는 1:1 맞춤형 프로그램입니다. 체형 분석과 움직임 평가를 통해 자세 불균형, 통증 패턴, 바디라인 고민 등을 보다 집중적으로 관리합니다.',
    targets: [
      '목 · 허리 · 골반 불편함이 반복되는 경우',
      '체형 교정 및 바디라인 관리가 필요한 경우',
      '얼굴 비대칭 · 어깨 비대칭 · 휜다리 관리',
      '산전 · 산후 회복',
      '집중 체중감량 및 바디 밸런스 관리',
    ],
  },
  {
    icon: Users,
    en: 'Group Lesson',
    ko: '그룹레슨',
    desc: '소수정예 중심으로 진행되는 그룹 프로그램입니다. SNPE 움직임 원리와 도구 시스템을 기반으로 정렬, 밸런스, 회복, 컨디셔닝을 보다 체계적으로 경험할 수 있도록 구성됩니다. 함께 움직이며 동기부여를 얻고, 건강한 움직임 습관을 지속적으로 만들어갈 수 있는 프로그램입니다.',
    targets: [],
  },
]

const classGroups = [
  {
    title: '입문 프로그램',
    items: [
      { no: '1', name: 'Foot', desc: '발의 정렬과 움직임 회복을 중심으로 전신 밸런스의 기초를 이해하는 프로그램' },
      { no: '2', name: 'Basic', desc: 'SNPE 기본 움직임과 도구 사용법을 익히는 입문 과정' },
    ],
  },
  {
    title: '부위별 밸런스 프로그램',
    items: [
      { no: '3', name: '목 · 어깨', desc: '목과 어깨의 긴장 완화 및 바른 정렬 회복 프로그램' },
      { no: '4', name: '등라인', desc: '등과 흉추 움직임 회복 및 바른 자세 라인 형성 프로그램' },
      { no: '5', name: '허리 · 골반', desc: '허리와 골반의 균형 회복 및 움직임 안정화 프로그램' },
      { no: '6', name: '다리 정렬', desc: '하체 정렬과 보행 밸런스를 위한 다리 움직임 프로그램' },
    ],
  },
  {
    title: '기능 안정화 프로그램',
    items: [
      { no: '7', name: 'Core Balance', desc: '코어 안정성과 전신 움직임 밸런스를 강화하는 프로그램' },
    ],
  },
  {
    title: '이완 · 회복 프로그램',
    items: [
      { no: '8', name: '하체순환', desc: '하체 긴장 완화와 순환 밸런스를 위한 회복 프로그램' },
      { no: '9', name: '근막 Release', desc: '근막 이완과 움직임 회복을 위한 컨디셔닝 프로그램' },
    ],
  },
]

const TABS = [
  { id: 'snpe', label: 'SNPE PROGRAM' },
  { id: 'official', label: 'SNPE OFFICIAL PROGRAM' },
]

export default function Programs() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('snpe')

  return (
    <>
      <PageBanner title={t('pages.programs')} subtitle={t('pages.programsSub')} />

      {/* Tab navigation */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-center gap-2 md:gap-4">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 md:px-8 py-4 text-sm md:text-base font-semibold tracking-tight transition-colors ${
                  activeTab === tab.id ? 'text-snpe-dark' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-snpe-dark rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === 'snpe' && (
        <>
          {/* SNPE PROGRAMS intro */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-white to-mint-lighter/30">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">SNPE PROGRAM</p>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-5 leading-snug">
                통합적으로 변화시키는 움직임 프로그램
              </h2>
              <div className="space-y-3 text-gray-600 leading-relaxed max-w-2xl mx-auto">
                <p>
                  목·허리·골반의 반복되는 불편함부터 체형 불균형, 얼굴 비대칭, 어깨 비대칭, 휜다리, 척추측만까지.
                  SNPE는 몸의 정렬과 움직임 패턴을 바탕으로 보다 바른 자세와 균형 있는 움직임을 만들어가는 프로그램입니다.
                </p>
                <p>
                  단순 운동이 아닌, 몸의 사용 습관과 움직임 패턴을 함께 관리하여 라인, 자세, 움직임, 컨디션까지
                  통합적으로 변화시키는 것을 목표로 합니다.
                </p>
              </div>
            </div>
          </section>

          {/* Program categories 01~02 */}
          <section className="py-12 md:py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4 space-y-12">
              {categories.map((cat) => (
                <div key={cat.no} className="bg-gray-50 rounded-3xl p-7 md:p-10 border border-gray-100">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center flex-shrink-0">
                      <cat.icon size={22} />
                    </div>
                    <div>
                      <p className="text-xs text-snpe-dark font-semibold">{cat.no}. {cat.en}</p>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">{cat.ko}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">{cat.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((it) => (
                      <span key={it} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs md:text-sm text-gray-700">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 03. 라이프 밸런스 프로그램 (Wellness Programs) — 생애주기별 */}
          <section className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center flex-shrink-0">
                  <Sparkles size={22} />
                </div>
                <div>
                  <p className="text-xs text-snpe-dark font-semibold">03. Wellness Programs</p>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">라이프 밸런스 프로그램</h3>
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-8 max-w-3xl">
                SNPE는 연령과 삶의 단계에 따라 달라지는 신체 특성과 움직임 패턴을 고려하여, 각 시기에 필요한
                자세 · 움직임 · 균형 회복 프로그램을 제공합니다. 건강한 움직임 습관은 특정 시기에만 필요한 것이
                아니라, 삶의 전 과정에 걸쳐 지속적으로 관리되어야 하는 중요한 자산입니다.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {lifecyclePrograms.map((p) => (
                  <div key={p.en} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-11 h-11 rounded-xl bg-mint-lighter/60 text-snpe-dark flex items-center justify-center mb-4">
                      <p.icon size={20} />
                    </div>
                    <p className="text-xs text-snpe-dark font-semibold">{p.en}</p>
                    <h4 className="text-base font-bold text-gray-900 mb-2">{p.ko}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-sm text-gray-500 leading-relaxed bg-white border border-gray-100 rounded-2xl p-5">
                ※ 나에게 맞는 프로그램은 연령, 생활습관, 몸 상태에 따라 달라질 수 있습니다.
                자세한 상담은 가까운 SNPE 전문센터에서 안내받으실 수 있습니다.
              </p>
            </div>
          </section>
        </>
      )}

      {activeTab === 'official' && (
        <>
          {/* OFFICIAL PROGRAM intro */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-white to-mint-lighter/30">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">SNPE OFFICIAL PROGRAM</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">SNPE 전문센터 공식 프로그램</h2>
              <div className="space-y-3 text-gray-600 leading-relaxed max-w-2xl mx-auto text-left md:text-center">
                <p>
                  SNPE 전문센터에서는 오랜 현장 경험과 전문성을 갖춘 센터장 및 공식 인증강사의 지도 아래
                  체형 분석, 움직임 평가, 생활 습관 분석을 기반으로 한 맞춤형 프로그램이 진행됩니다.
                </p>
                <p>
                  단순 운동이 아닌, 개인의 자세 패턴과 움직임 습관을 분석하여 목·허리·골반의 불편함부터
                  체형 밸런스, 움직임 기능, 바디라인 관리까지 보다 체계적으로 접근합니다.
                </p>
                <p>
                  트렌디한 웰니스와 바디 컨디셔닝을 기반으로 라인 관리, 움직임 기능 향상, 회복 루틴,
                  바디 밸런스까지 통합적으로 관리할 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          {/* PROGRAM TYPE */}
          <section className="py-16 md:py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4">
              <div className="text-center mb-12">
                <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">PROGRAM TYPE</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">프로그램 진행 방식</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {programTypes.map((p) => (
                  <div key={p.en} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                    <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center mb-4">
                      <p.icon size={22} />
                    </div>
                    <p className="text-xs text-snpe-dark font-semibold">{p.en}</p>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{p.ko}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                    {p.targets.length > 0 && (
                      <>
                        <p className="text-xs font-semibold text-gray-500 mt-5 mb-2">추천 대상</p>
                        <ul className="space-y-1.5">
                          {p.targets.map((tg) => (
                            <li key={tg} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-snpe-dark flex-shrink-0" />
                              {tg}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 전문센터 대표 프로그램 */}
          <section className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
              <div className="text-center mb-12">
                <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">SNPE CENTER PROGRAMS</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">전문센터 대표 프로그램</h3>
              </div>
              <div className="space-y-10">
                {classGroups.map((g) => (
                  <div key={g.title}>
                    <h3 className="text-lg font-bold text-snpe-dark mb-4 flex items-center gap-2">
                      {g.title}
                      <span className="h-px flex-1 bg-gray-200" />
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {g.items.map((it) => (
                        <div key={it.no} className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100">
                          <span className="w-8 h-8 rounded-full bg-snpe-darker text-white text-sm flex items-center justify-center font-bold flex-shrink-0">
                            {it.no}
                          </span>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">{it.name}</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">{it.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-14 text-center">
                <Link
                  to="/search-center"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-snpe-darker text-white rounded-full font-medium hover:bg-snpe-dark transition-colors"
                >
                  전문센터 찾기 <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}
