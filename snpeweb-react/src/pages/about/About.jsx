import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import {
  Activity,
  Wind,
  Scale,
  Eye,
  Sparkles,
  Heart,
  Quote,
} from 'lucide-react'

const keyAreas = [
  {
    icon: Activity,
    en: 'Physical Alignment',
    ko: '신체 정렬과 움직임 회복',
  },
  {
    icon: Wind,
    en: 'Breathing & Nervous System Recovery',
    ko: '호흡과 신경계 회복',
  },
  {
    icon: Scale,
    en: 'Body Balance & Shape',
    ko: '바디 밸런스와 움직임 기반 체형 관리',
  },
  {
    icon: Eye,
    en: 'Embodied Awareness & Self-Efficacy',
    ko: '몸의 감각 회복과 자기 회복력',
  },
  {
    icon: Sparkles,
    en: 'Lifestyle Wellness & Movement Balance',
    ko: '라이프스타일 웰니스와 움직임 균형',
  },
  {
    icon: Heart,
    en: 'Senior Wellness & Longevity',
    ko: '시니어 웰니스와 건강한 움직임',
  },
]

const ABOUT_IMGS = [
  '/images/about/snpe-intro/image1.jpeg',
  '/images/about/snpe-intro/image2.jpeg',
  '/images/about/snpe-intro/image3.jpeg',
  '/images/about/snpe-intro/image4.jpeg',
]

export default function About() {
  const { t } = useTranslation()

  return (
    <>
      <PageBanner
        title={t('pages.about')}
        subtitle={t('pages.aboutSub')}
      />

      {/* 1) What is SNPE? */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-mint-lighter/30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">
              01. What is SNPE?
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              Built on Self Recovery
            </h2>
            <p className="text-xl md:text-2xl text-mint-darker font-medium">
              스스로 회복할 수 있다는 자신감
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img src={ABOUT_IMGS[0]} alt="SNPE 소개" className="w-full h-auto block" loading="lazy" />
            </div>
            <div className="space-y-5 text-gray-700 leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-gray-900">SNPE</strong>(Self Natural Posture Exercise)는
                인체 본연의 정렬과 움직임을 회복하도록 돕는
                자기 주도형 움직임 회복 시스템(Self Recovery Movement System)입니다.
              </p>
              <p className="text-gray-600">
                단순히 근육을 강화하거나 특정 부위를 반복적으로 사용하는 운동이 아니라,
                잘못된 자세 습관과 움직임 패턴으로 인해 무너진 몸의 균형을
                스스로 인지하고 회복하도록 설계된 통합 움직임 시스템입니다.
              </p>
              <p className="text-gray-600">
                SNPE는 척추 중심의 자세 회복 개념에서 출발하였지만,
                현재는 발·골반·호흡·움직임 체인(Kinetic Chain),
                그리고 일상 속 움직임 습관까지 연결하는
                보다 통합적이고 과학적인 움직임 시스템으로 발전하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2) The Beginning of SNPE */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">
              The Beginning of SNPE
            </p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-gray-900">
              반복되는 만성 허리 통증에 대한 고민에서 시작된 SNPE
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-center mb-10">
            <div className="rounded-2xl overflow-hidden">
              <img src={ABOUT_IMGS[1]} alt="SNPE의 시작" className="w-full h-auto block" loading="lazy" />
            </div>
            <div className="space-y-5 text-gray-700 leading-relaxed text-sm md:text-base">
              <p>
                SNPE는 반복되는 척추 불균형과 움직임 문제에 대한
                오랜 연구와 현장 경험 속에서 시작되었습니다.
              </p>
              <p>
                초기 SNPE 철학은 <em className="text-gray-900 font-semibold">"누군가에게 의존하지 않고 스스로 회복할 수 있는 움직임은 가능한가?"</em>라는 질문에서 출발했습니다.
              </p>
              <p>
                SNPE 창안자 故 최중기 교수는 반복되는 허리 통증과 움직임 제한을 경험하며,
                신체의 정렬과 움직임 회복의 원리를 오랫동안 연구해왔습니다.
                이후 카이로프랙틱, 운동치료, 자세교정 이론과 움직임 관찰 경험을 바탕으로
                SNPE는 자기 주도형(Self Recovery) 움직임 시스템으로 발전해왔습니다.
              </p>
            </div>
          </div>

          <div className="bg-mint-lighter/40 rounded-3xl p-8 md:p-10 mb-10 border border-mint/20 space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              특히 SNPE는 장시간에 걸쳐 치아가 점진적으로 정렬되는 원리에서 영감을 받아,
              반복적이고 올바른 움직임 학습을 통해 신체의 정렬과 움직임 균형이 회복될 수 있도록 설계되었습니다.
              이는 순간적인 교정보다 지속적인 움직임 습관과 감각 인지를 중요하게 바라보는
              SNPE의 핵심 철학 중 하나입니다.
            </p>
            <p>
              또한 굳어지고 제한된 깊은 근육과 움직임 패턴을 보다 부드럽게 회복하기 위해,
              손가락의 압력과 인체역학 원리에서 영감을 받은 SNPE만의 고유한 운동 도구들이 함께 개발되었습니다.
            </p>
          </div>

          <blockquote className="relative max-w-3xl mx-auto text-center px-6">
            <Quote size={32} className="text-mint/40 mx-auto mb-3" />
            <p className="text-lg md:text-xl text-gray-800 font-heading leading-relaxed italic">
              "정렬은 억지로 만드는 것이 아니라,
              <br />
              올바른 움직임의 반복 속에서 회복된다."
            </p>
          </blockquote>
        </div>
      </section>

      {/* 3) Expanding Beyond Posture */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-mint-lighter/30 to-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">
              Expanding Beyond Posture
            </p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-gray-900">
              움직임 기반 웰니스로의 확장
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
            <div className="space-y-5 text-gray-700 leading-relaxed text-sm md:text-base">
              <p>
                현재 SNPE는 단순한 자세 교정이나 근골격계 통증 관리에 머물지 않고,
                <strong className="text-gray-900"> 몸의 정렬과 움직임 회복을 기반으로
                삶의 균형과 웰니스를 함께 바라보는 움직임 시스템</strong>으로 확장되고 있습니다.
              </p>
              <p>
                반복되는 생활 습관과 움직임 패턴 속에서 발생하는
                만성적인 통증과 불편감, 긴장과 움직임 제한을 통합적으로 바라보며,
                보다 자연스럽고 지속 가능한 움직임 회복을 중요하게 생각합니다.
              </p>
              <p>
                SNPE는 신체 정렬과 움직임 기능 회복을 넘어,
                호흡과 신경계 회복, 바디 밸런스와 체형 관리,
                몸의 감각 회복과 자기 효능감(Self-Efficacy),
                그리고 Healthy Aging과 Longevity 관점의 웰니스까지 연결하며
                보다 통합적인 움직임 경험을 연구하고 있습니다.
              </p>
              <p className="text-gray-600">
                또한 성장기 유소년부터 성인, 시니어까지
                다양한 연령과 라이프스타일 속에서 누구나 자신의 몸을 이해하고
                스스로 움직임의 균형을 회복할 수 있도록 돕는
                지속 가능한 움직임 시스템을 지향합니다.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img src={ABOUT_IMGS[2]} alt="SNPE 웰니스" className="w-full h-auto block" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 4) Key Areas of SNPE */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">
              Key Areas of SNPE
            </p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              SNPE가 지향하는 움직임 기반 웰니스
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {keyAreas.map((area) => (
              <div
                key={area.en}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-mint/40 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-mint-lighter/60 text-mint-darker flex items-center justify-center mb-5">
                  <area.icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1.5 leading-snug">
                  {area.en}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{area.ko}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center bg-white rounded-3xl p-8 md:p-10 border border-mint/20">
            <p className="text-lg md:text-2xl font-heading text-mint-darker italic">
              "Wellness for Better Movement & Longevity"
            </p>
            <p className="mt-2 text-sm md:text-base text-gray-600">
              더 오래, 더 건강하게 움직이기 위한 웰니스
            </p>
          </div>
        </div>
      </section>

      {/* 5) The Future of SNPE */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">
              The Future of SNPE
            </p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-gray-900">
              움직임의 미래를 연구하다
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div className="space-y-5 text-gray-700 leading-relaxed text-sm md:text-base">
              <p>
                SNPE는 단순한 운동 프로그램을 넘어,
                <strong className="text-gray-900"> 사람의 움직임과 삶의 균형을 연구하는
                통합 움직임 시스템</strong>으로 발전하고 있습니다.
              </p>
              <p>
                AI와 디지털 기술이 빠르게 발전하는 시대 속에서
                SNPE는 움직임 데이터와 평가 시스템을 기반으로
                보다 정교하고 개인화된 움직임 환경을 만들어가고 있습니다.
              </p>
              <p>
                또한 움직임 과학(Movement Science), 웰니스, 디지털 헬스케어 기술을 연결하며
                사람마다 다른 움직임 특성과 회복 과정을
                더 깊이 이해하는 방향으로 발전하고 있습니다.
              </p>
              <p className="text-gray-600">
                앞으로 SNPE는 AI 기반 움직임 분석과 글로벌 교육 시스템을 연결하며,
                건강한 움직임을 삶 속에서 지속할 수 있도록 돕는
                글로벌 움직임 브랜드로 발전해가고자 합니다.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img src={ABOUT_IMGS[3]} alt="SNPE의 미래" className="w-full h-auto block" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 6) Closing tagline */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-mint-darker via-mint-dark to-mint text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-3xl md:text-5xl font-heading font-bold mb-3 leading-tight">
            Built on Self Recovery
          </p>
          <p className="text-xl md:text-3xl font-heading text-white/90 leading-tight">
            Evolving Through Movement Science
          </p>
        </div>
      </section>
    </>
  )
}
