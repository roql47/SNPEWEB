import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Link } from 'react-router-dom'
import { toolGroups, getToolsByGroup } from '../../data/tools'

const steps = [
  {
    num: '01',
    title: 'SNPE 알아보기',
    desc: 'SNPE가 어떤 원리로 움직임과 자세 균형을 관리하는지 이해합니다. 목·허리·골반의 반복되는 불편함부터 체형 불균형, 휜다리, 거북목, 자세 습관까지 왜 몸의 정렬과 움직임 패턴이 중요한지 알아봅니다.',
    link: '/about',
  },
  {
    num: '02',
    title: '셀프 체형분석',
    desc: 'SNPE 앱과 셀프 체크를 통해 현재 나의 체형과 움직임 상태를 확인합니다. 어깨 높이 차이, 골반 밸런스, 다리 정렬, 자세 습관 등을 점검하며 나에게 필요한 움직임 방향을 이해할 수 있습니다.',
    link: '/snpeapp',
  },
  {
    num: '03',
    title: '기본동작 배우기',
    desc: 'SNPE 기본 벨트운동과 도구 MOVE 동작을 배우며 몸의 바른 정렬 감각을 익혀갑니다. 발부터 시작되는 움직임 원리와 SNPE 도구 사용법, 기본 자세, 호흡과 움직임 연결 방법을 단계적으로 경험합니다.',
    link: '/baseexercise',
  },
  {
    num: '04',
    title: '운동 영상 따라하기',
    desc: '운동 영상을 보며 반복적으로 움직임을 연습합니다. 짧은 루틴이라도 꾸준히 반복하며 몸의 움직임 패턴과 자세 습관을 자연스럽게 변화시켜 나갑니다. 홈트레이닝, Recovery 루틴, 부위별 프로그램 등 라이프스타일에 맞춰 다양하게 활용할 수 있습니다.',
    link: '/snpevideo',
  },
  {
    num: '05',
    title: '전문센터 방문',
    desc: '보다 체계적인 관리가 필요하다면 SNPE 전문센터에서 전문적인 지도를 받아보세요. 오랜 경험을 갖춘 센터장과 공식 인증강사가 체형 평가와 움직임 분석을 기반으로 나에게 맞는 맞춤형 프로그램을 제안합니다. 개인레슨과 소수정예 그룹레슨을 통해 보다 정확한 움직임과 바디 밸런스를 경험할 수 있습니다.',
    link: '/search-center',
  },
]

function ToolCard({ tool, t }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-snpe/30 transition-all group">
      <div className="aspect-square w-full bg-gray-50 overflow-hidden">
        <img
          src={tool.img}
          alt={t(tool.nameKey)}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h4 className="text-base md:text-lg font-bold text-gray-900 mb-2 group-hover:text-snpe-dark transition-colors">
          {t(tool.nameKey)}
        </h4>
        <p className="text-sm text-gray-500 leading-relaxed">
          {t(tool.descKey)}
        </p>
      </div>
    </div>
  )
}

export default function BeginnerGuide() {
  const { t } = useTranslation()

  return (
    <>
      <PageBanner
        title={t('pages.beginnerGuide')}
        subtitle={t('pages.beginnerGuideSub')}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">처음 시작하는 분들을 위한 SNPE 가이드</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              처음부터 어렵게 시작하지 않아도 됩니다. SNPE는 내 몸의 상태를 이해하고, 바른 움직임을 하나씩 익혀가는 과정입니다.
              아래 5단계를 따라 나의 자세와 움직임 습관을 점검하고, 건강한 바디 밸런스를 시작해보세요.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((s, i) => (
              <Link
                key={i}
                to={s.link}
                className="flex items-start gap-6 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-snpe/30 transition-all group"
              >
                <span className="flex-shrink-0 text-4xl md:text-5xl font-heading font-bold text-snpe/20 group-hover:text-snpe-dark/40 transition-colors">
                  {s.num}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-snpe-dark transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('pages.tools.sectionTitle')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('pages.tools.intro')}
            </p>
          </div>

          {toolGroups.map((group) => {
            const items = getToolsByGroup(group.id)
            return (
              <div key={group.id} className="mb-16 last:mb-0">
                <div className="mb-8 md:mb-10">
                  <h3 className="text-2xl font-bold text-snpe-dark mb-2">
                    {t(group.titleKey)}
                  </h3>
                  <p className="text-sm md:text-base text-gray-500">
                    {t(group.subKey)}
                  </p>
                  <div className="mt-3 h-1 w-12 bg-snpe rounded-full" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                  {items.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} t={t} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
