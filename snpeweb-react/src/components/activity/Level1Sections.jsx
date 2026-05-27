/**
 * Level1Sections — LEVEL 1 교육과정 전용 랜딩 섹션
 *
 * - 레이아웃/섹션 흐름·이미지는 외부 랜딩(gamma.site/snpe-level1-iwbto2c)에서 가져옴
 * - 컬러/폰트는 SNPE 홈페이지 톤(snpe-* 베이지·브라운, Pretendard)으로 통일
 * - 어드민(`page_contents` slug=level1)에서 입력한 값이 있으면 일부 섹션에 옵셔널 머지
 *
 * 추후 연결 필요 항목
 *  - ENROLL_URL : 신청 폼/페이지 URL
 *  - KAKAO_URL  : 카카오톡 채널/오픈채팅 URL
 */
import { useEffect, useState } from 'react'
import {
  Activity,
  Target,
  Repeat,
  CheckCircle2,
  CalendarDays,
  Clock,
  Wallet,
  MapPin,
  Users,
  MessageCircle,
  ClipboardList,
  GraduationCap,
  Send,
  Calendar,
} from 'lucide-react'
import { dataStore } from '../../lib/dataStore'
import { sanitizeHtml } from '../../lib/sanitize'
import useReveal from '../../hooks/useReveal'

const ENROLL_URL = 'https://www.s-ground.co.kr/course/Level-1'
const KAKAO_URL = 'https://pf.kakao.com/_Tqyxib'

const IMG = {
  hero: '/images/level1/hero.png',
  why: '/images/level1/why.png',
  philosophy: '/images/level1/philosophy.png',
  phase1: '/images/level1/phase1.png',
  phase2: '/images/level1/phase2.png',
  phase3: '/images/level1/phase3.png',
  phase4: '/images/level1/phase4.png',
  benefits: '/images/level1/benefits.jpg',
}

const INSTRUCTORS = [
  { src: '/images/level1/instructors/01-kimheeju.jpg', alt: 'SNPE LEVEL 1 강사 — 김희주 마스터' },
  { src: '/images/level1/instructors/02-banjugyeong.jpg', alt: 'SNPE LEVEL 1 강사 — 반주경 센터장' },
  { src: '/images/level1/instructors/03-jeongseonmi.jpg', alt: 'SNPE LEVEL 1 강사 — 정선미 센터장' },
  { src: '/images/level1/instructors/04-leeseomgyeol.jpg', alt: 'SNPE LEVEL 1 강사 — 이섬결 마스터' },
]

// ─────────────────────────────────────────────────────────────
// 정적 데이터
// ─────────────────────────────────────────────────────────────

const JOURNEY_STEPS = [
  {
    range: '1–4회차',
    title: '발 · 하체 기반',
    desc: '발 아치 감각 회복, 족저근막 및 하체 체인 연결, 보행 패턴 교정, 발–골반 연결 구축',
  },
  {
    range: '5–10회차',
    title: '골반 · 허리',
    desc: '골반 전후경 교정, 좌우 밸런스 회복, 고관절 가동성 향상, 중둔근 및 중심 안정화',
  },
  {
    range: '11–15회차',
    title: '등 · 어깨',
    desc: '흉추 가동성 회복, 굽은 등 패턴 개선, 견갑 안정화, 어깨·목 연결 회복',
  },
  {
    range: '16–20회차',
    title: '목 · 전신',
    desc: '경추 안정화, 목 긴장 완화, 전신 연결 루틴 완성, 개인 맞춤 루틴 정리',
  },
]

const PHASE_GROUPS = [
  {
    sectionTag: 'PHASE 1 · 2',
    sectionTitle: '발과 골반에서 시작되는 변화',
    items: [
      {
        range: '1–4회차',
        title: '발 · 하체 기반',
        body: '모든 변화의 시작점인 발의 감각과 정렬을 회복합니다. 족저근막 및 하체 체인을 연결하고 보행 패턴을 교정하며 발–골반 연결을 구축합니다.',
        quote: '"몸의 기초는 발에서 시작됩니다."',
        image: IMG.phase1,
      },
      {
        range: '5–10회차',
        title: '골반 · 허리',
        body: '몸의 중심인 골반과 고관절 사용 패턴을 안정적으로 다시 세웁니다. 좌우 밸런스를 회복하고 중둔근 및 중심 안정화를 통해 몸의 중심이 안정되기 시작하는 구간입니다.',
        quote: null,
        image: IMG.phase2,
      },
    ],
  },
  {
    sectionTag: 'PHASE 3 · 4',
    sectionTitle: '허리부터 전신 통합까지',
    items: [
      {
        range: '11–15회차',
        title: '등 · 어깨',
        body: '굳어 있는 상체를 열고 긴장 패턴을 줄여나갑니다. 흉추 가동성 회복, 굽은 등 패턴 개선, 견갑 안정화를 통해 상체 움직임이 부드럽게 연결되기 시작합니다.',
        quote: null,
        image: IMG.phase3,
      },
      {
        range: '16–20회차',
        title: '목 · 전신',
        body: '경추 안정화와 목 긴장 완화를 통해 몸 전체를 하나의 흐름으로 연결하는 마지막 통합 단계입니다. 1회차와 비교했을 때의 변화를 직접 확인하게 됩니다.',
        quote: null,
        image: IMG.phase4,
      },
    ],
  },
]

const EXPERIENCE_CARDS = [
  {
    Icon: Activity,
    title: '긴장 패턴 인식',
    desc: '몸의 긴장 패턴을 인식하고 보행과 자세 변화를 직접 체감합니다.',
  },
  {
    Icon: Target,
    title: '움직임 개선',
    desc: '허리 · 어깨 · 목 움직임이 개선되고 몸 전체 연결감이 회복됩니다.',
  },
  {
    Icon: Repeat,
    title: '습관 형성',
    desc: '바른 움직임 습관이 형성되고 일상 속 움직임 효율이 향상됩니다.',
  },
]

const DEFAULT_TARGETS = [
  '자세를 바로잡고 건강하고 품격 있는 삶을 만들고 싶은 분',
  '반복되는 허리 · 어깨 · 목 통증에서 벗어나고 싶은 분',
  '운동과 치료를 반복해도 다시 불편함이 돌아오는 분',
  '내 몸을 스스로 관리하는 방법을 배우고 싶은 분',
  '웰니스 라이프스타일과 바른 움직임 습관에 관심 있는 분',
  'SNPE 지도사 과정(LEVEL 2) 및 전문 강사 교육에 관심 있는 분',
]

const SCHEDULE_INFO = [
  { Icon: CalendarDays, label: '개강', value: '6월 24일(수) 개강 / 10주 과정 (주2회 / 총 40시간)' },
  { Icon: Clock, label: '수업 시간', value: '매주 수요일 (19:00~21:00) / 일요일 (10:00~12:00)' },
  { Icon: Wallet, label: '수강료', value: '180만원' },
  { Icon: MapPin, label: '수련 장소', value: 'SNPE 강남본원' },
]

const ENROLLMENT_INFO = [
  { Icon: Calendar, label: '접수 시작', value: '5월 26일(화)' },
  { Icon: Users, label: '모집 정원', value: '20명 한정 운영 (선착순 마감)' },
  { Icon: Send, label: '신청 방법', value: '하단 신청하기 링크 참조' },
]

const COURSE_RESULT = [
  { Icon: ClipboardList, label: '과정 유형', value: '수료 과정' },
  { Icon: GraduationCap, label: '이수 결과', value: '교육 이수 시 LEVEL 1 수료' },
]

// ─────────────────────────────────────────────────────────────
// 공용 작은 컴포넌트
// ─────────────────────────────────────────────────────────────

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

function SectionLabel({ children, light = false }) {
  return (
    <p
      className={`text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-3 ${
        light ? 'text-white/70' : 'text-snpe-dark'
      }`}
    >
      {children}
    </p>
  )
}

function PrimaryButton({ href, children, full = false }) {
  return (
    <a
      href={href}
      target={href === '#' ? undefined : '_blank'}
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-snpe-darker text-white font-semibold text-sm md:text-base hover:bg-snpe-accent transition-colors shadow-sm hover:shadow-md ${
        full ? 'w-full sm:w-auto' : ''
      }`}
    >
      {children}
    </a>
  )
}

function SecondaryButton({ href, children, onDark = false }) {
  if (onDark) {
    return (
      <a
        href={href}
        target={href === '#' ? undefined : '_blank'}
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/70 text-white font-semibold text-sm md:text-base hover:bg-white/10 transition-colors"
      >
        <MessageCircle size={16} />
        {children}
      </a>
    )
  }
  return (
    <a
      href={href}
      target={href === '#' ? undefined : '_blank'}
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-snpe-darker text-snpe-darker font-semibold text-sm md:text-base hover:bg-snpe transition-colors"
    >
      <MessageCircle size={16} />
      {children}
    </a>
  )
}

// ─────────────────────────────────────────────────────────────
// 메인
// ─────────────────────────────────────────────────────────────

export default function Level1Sections() {
  const [admin, setAdmin] = useState(null)
  useEffect(() => {
    dataStore.getPageContent('level1').then(setAdmin).catch(() => setAdmin(null))
  }, [])

  const targets = admin?.targets?.length > 0 ? admin.targets : DEFAULT_TARGETS
  const introHtml = admin?.intro_html || null

  return (
    <div className="bg-white">
      {/* ── INTRO (PageBanner 아래의 간단한 도입부 + CTA) ─── */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-snpe-light/60 via-white to-white">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <Reveal>
            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-snpe-dark mb-4 uppercase">
              SNPE LEVEL 1
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-snpe-darker leading-[1.25]">
              내 몸의 기준을<br className="md:hidden" /> 다시 만드는 <span className="text-snpe-accent">10주</span>
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-6 text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              발부터 시작해 골반 · 허리 · 등 · 어깨 · 목 · 전신까지<br className="hidden md:block" />
              몸 전체를 순서대로 다시 연결하는 <strong className="text-snpe-darker">10주 통합 움직임 프로그램</strong>입니다.
              <br />
              빠른 변화보다, “돌아가지 않는 변화”를 만드는 것 — 그것이 LEVEL 1의 시작입니다.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <PrimaryButton href={ENROLL_URL}>신청하기</PrimaryButton>
              <SecondaryButton href={KAKAO_URL}>카카오톡 문의</SecondaryButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHY LEVEL 1 (image left, cards right) ────────── */}
      <section id="level1-why" className="py-24 md:py-32 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14 md:mb-16">
              <SectionLabel>Why Level 1</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-snpe-darker leading-snug">
                왜 좋아졌다가 다시 돌아올까요?
              </h2>
            </div>
          </Reveal>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            <Reveal>
              <div className="relative rounded-2xl overflow-hidden shadow-md w-[160px] md:w-[170px] aspect-square flex-shrink-0 mx-auto md:mx-0">
                <img src={IMG.why} alt="" className="w-full h-full object-cover block" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-tr from-snpe-darker/15 via-transparent to-white/10 pointer-events-none" />
              </div>
            </Reveal>

            <div className="flex-1 min-w-0 space-y-6">
              <Reveal delay={120}>
                <div className="bg-snpe-light/60 rounded-3xl border border-snpe-dark/10 p-8">
                  <p className="text-xs font-semibold tracking-widest text-snpe-dark uppercase mb-3">
                    반복되는 패턴
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    허리가 좋아지면 어깨가 아프고, 어깨가 좋아지면 다시 목이 불편해지는 경험.
                    문제는 특정 부위 자체보다 몸이 익숙하게 사용하는 <strong className="text-snpe-darker">움직임 패턴</strong>에 있습니다.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={220}>
                <div className="bg-snpe-light/60 rounded-3xl border border-snpe-dark/10 p-8">
                  <p className="text-xs font-semibold tracking-widest text-snpe-dark uppercase mb-3">
                    SNPE의 접근
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    몸은 원래 익숙한 방식으로 다시 돌아가려 합니다.
                    SNPE LEVEL 1은 몸 전체의 연결 구조를 다시 학습하며
                    <strong className="text-snpe-darker"> 새로운 움직임 기준</strong>을 몸에 정착시키는 과정입니다.
                  </p>
                </div>
              </Reveal>

              {introHtml && (
                <Reveal delay={320}>
                  <div
                    className="rt-content text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(introHtml) }}
                  />
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY (image background quote band) ─────── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMG.philosophy})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-snpe-darker/85 via-snpe-darker/70 to-snpe-darker/50" aria-hidden="true" />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 text-white">
          <Reveal>
            <SectionLabel light>Program Philosophy</SectionLabel>
          </Reveal>
          <Reveal delay={120}>
            <blockquote className="border-l-4 border-snpe-light pl-6 md:pl-10 py-2 text-2xl md:text-3xl lg:text-4xl font-bold leading-snug max-w-3xl">
              문제는 ‘부위’가 아니라<br />
              ‘몸을 사용하는 방식’입니다.
            </blockquote>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 text-white/85 leading-relaxed md:text-lg max-w-3xl">
              치료를 받아도 다시 돌아오고, 운동을 해도 익숙한 자세로 되돌아가는 이유 —
              몸이 그렇게 사용하는 방법을 이미 기억하고 있기 때문입니다.
              SNPE LEVEL 1은 단순한 운동 프로그램이 아니라, 반복 · 감각 인식 · 움직임 학습을 통해
              몸 스스로 바른 움직임을 기억하도록 설계된 <strong className="text-white">Self Recovery 기반 프로그램</strong>입니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── JOURNEY TIMELINE ─────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14 md:mb-20">
              <SectionLabel>10 Week Journey</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-snpe-darker leading-snug">
                10주, 이렇게 변화합니다
              </h2>
            </div>
          </Reveal>

          <ol className="relative border-l-2 border-snpe-dark/20 ml-5 md:ml-10 space-y-10 md:space-y-14">
            {JOURNEY_STEPS.map((step, i) => (
              <Reveal key={i} delay={i * 100}>
                <li className="relative pl-8 md:pl-12">
                  <span className="absolute -left-[22px] md:-left-[26px] top-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-snpe-darker text-white text-sm md:text-base font-bold flex items-center justify-center shadow-md">
                    {i + 1}
                  </span>
                  <div className="bg-snpe-light/50 border border-snpe-dark/10 rounded-2xl p-6 md:p-7">
                    <span className="inline-block text-xs md:text-sm font-semibold text-snpe-dark tracking-wider uppercase mb-2">
                      {step.range}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-snpe-darker mb-2">{step.title}</h3>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">{step.desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── PHASE DETAILS (4 cards in 2 sections) ────────── */}
      {PHASE_GROUPS.map((group, gi) => (
        <section
          key={gi}
          className={`py-24 md:py-32 ${gi % 2 === 0 ? 'bg-snpe-light/50' : 'bg-white'}`}
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <Reveal>
              <div className="text-center mb-14 md:mb-20">
                <SectionLabel>{group.sectionTag}</SectionLabel>
                <h2 className="text-3xl md:text-4xl font-bold text-snpe-darker leading-snug">
                  {group.sectionTitle}
                </h2>
              </div>
            </Reveal>

            <div className="space-y-16 md:space-y-24">
              {group.items.map((p, i) => {
                const reverse = i % 2 === 1
                return (
                  <Reveal key={i} delay={60}>
                    <div className={`flex flex-col-reverse md:items-center gap-5 md:gap-8 ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block px-3 py-1 rounded-full bg-snpe-darker text-white text-xs font-bold tracking-wider mb-4">
                          {p.range}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-snpe-darker mb-4 leading-snug">
                          {p.title}
                        </h3>
                        <div className="space-y-2 text-gray-700 leading-relaxed md:text-lg">
                          {p.body.split('. ').map((sentence, si, arr) => (
                            <p key={si}>{si < arr.length - 1 ? sentence + '.' : sentence}</p>
                          ))}
                        </div>
                        {p.quote && (
                          <p className="mt-5 italic text-snpe-accent border-l-2 border-snpe-dark/30 pl-4">
                            {p.quote}
                          </p>
                        )}
                      </div>

                      <div className="relative w-[160px] md:w-[170px] aspect-square flex-shrink-0 rounded-2xl overflow-hidden bg-white border border-snpe-dark/10 shadow-md mx-auto md:mx-0">
                        <img
                          src={p.image}
                          alt={p.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-snpe-darker/10 via-transparent to-white/15 pointer-events-none" />
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
      ))}

      {/* ── WHAT YOU EXPERIENCE ──────────────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14 md:mb-16">
              <SectionLabel>What You Experience</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-snpe-darker leading-snug">
                LEVEL 1에서 경험하게 되는 변화
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {EXPERIENCE_CARDS.map((c, i) => {
              const Icon = c.Icon
              return (
                <Reveal key={i} delay={i * 120}>
                  <div className="h-full bg-snpe-light/40 border border-snpe-dark/10 rounded-3xl p-8 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-snpe-dark/10 text-snpe-dark mb-5">
                      <Icon size={26} />
                    </div>
                    <h3 className="text-lg font-bold text-snpe-darker mb-3">{c.title}</h3>
                    <p className="text-gray-700 leading-relaxed text-sm">{c.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={400}>
            <p className="mt-14 text-center text-gray-600 md:text-lg max-w-2xl mx-auto">
              SNPE LEVEL 1은 단순히 “운동을 배우는 과정”이 아니라
              <br />
              <strong className="text-snpe-darker">몸의 기준을 다시 세우는 여정</strong>입니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── INSTRUCTORS — 강사진 카드뉴스 ─────────────────── */}
      <section className="py-24 md:py-32 bg-snpe-light/60">
        <div className="max-w-[1100px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <SectionLabel>Expert-Led Program</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-snpe-darker leading-snug">
                전문 강사진
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-7">
            {INSTRUCTORS.map((p, i) => (
              <Reveal key={p.src} delay={120 + i * 100}>
                <div className="relative rounded-3xl overflow-hidden shadow-lg bg-white">
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENROLLMENT INFO ──────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14 md:mb-16">
              <SectionLabel>Enrollment</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-snpe-darker leading-snug">
                LEVEL 1 모집 요강
              </h2>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
            <Reveal delay={80} className="lg:col-span-3">
              <div className="h-full bg-snpe-light/70 rounded-3xl p-8 md:p-12 border border-snpe-dark/10 flex flex-col">
                <p className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-snpe-dark mb-3">
                  For You
                </p>
                <h3 className="text-snpe-darker font-bold text-2xl md:text-3xl mb-3 leading-snug">
                  수강 대상
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-8 md:mb-10 leading-relaxed">
                  이런 분들에게 SNPE LEVEL 1을 추천합니다.
                </p>
                <ul className="space-y-4 md:space-y-5 flex-1">
                  {targets.map((t, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 text-gray-800 leading-relaxed text-base md:text-lg font-medium"
                    >
                      <span className="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-snpe-darker text-white flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={16} strokeWidth={2.2} />
                      </span>
                      <span className="pt-1">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={180} className="lg:col-span-2">
              <div className="h-full bg-snpe-darker text-white rounded-3xl p-8 md:p-10 space-y-8">
                <div>
                  <h3 className="font-bold text-lg mb-5">교육 일정</h3>
                  <ul className="space-y-5">
                    {SCHEDULE_INFO.map((s, i) => {
                      const Icon = s.Icon
                      return (
                        <li key={i} className="flex gap-3">
                          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-white flex-shrink-0">
                            <Icon size={16} />
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs text-white/70 font-semibold tracking-wider uppercase mb-0.5">
                              {s.label}
                            </p>
                            <p className="text-sm md:text-[15px] leading-relaxed">{s.value}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div className="pt-6 border-t border-white/15">
                  <h3 className="font-bold text-lg mb-5">접수 및 마감 정보</h3>
                  <ul className="space-y-5">
                    {ENROLLMENT_INFO.map((s, i) => {
                      const Icon = s.Icon
                      return (
                        <li key={i} className="flex gap-3">
                          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-white flex-shrink-0">
                            <Icon size={16} />
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs text-white/70 font-semibold tracking-wider uppercase mb-0.5">
                              {s.label}
                            </p>
                            <p className="text-sm md:text-[15px] leading-relaxed">{s.value}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div className="pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {COURSE_RESULT.map((s, i) => {
                    const Icon = s.Icon
                    return (
                      <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                        <div className="flex items-center gap-2 mb-1.5 text-white/70">
                          <Icon size={14} />
                          <p className="text-xs font-semibold tracking-wider uppercase">
                            {s.label}
                          </p>
                        </div>
                        <p className="text-sm md:text-[15px] font-semibold">
                          {s.value}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          {/* 수강 혜택 카드뉴스 */}
          <Reveal delay={260}>
            <div className="mt-10 rounded-3xl overflow-hidden shadow-lg bg-white">
              <img
                src={IMG.benefits}
                alt="SNPE LEVEL 1 수강 혜택 카드뉴스"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-8 bg-snpe rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-wider text-snpe-darker uppercase mb-1">
                  접수 안내
                </p>
                <p className="text-snpe-darker font-bold text-base md:text-lg">
                  접수 시작 5월 26일(화) · 20명 한정 선착순 마감
                </p>
              </div>
              <div className="flex gap-3">
                <PrimaryButton href={ENROLL_URL}>신청하기</PrimaryButton>
                <SecondaryButton href={KAKAO_URL}>카카오톡 문의</SecondaryButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
