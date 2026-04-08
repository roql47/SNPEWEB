import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import PageBanner from '../../components/common/PageBanner'
import { dataStore } from '../../lib/dataStore'
import { FileText, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const heroSlides = [
  {
    image: '/images/research_ssci.png',
    badge: '2019년 11월호에 SSCI 게재된\nSNPE 논문이 최근에 인기있는\nTOP 10 으로 선정되었습니다.',
    title: 'SSCI : 사회과학분야의 저명한 해외 저널지',
    subtitle: 'Self-natural posture exercise and chronic pain reduction',
  },
  {
    image: '/images/research_report.png',
    badge: null,
    title: 'SNPE 연구보고서',
    subtitle: 'SNPE 효과 검증을 위한 체험사례 분석\n2006년부터 2018년의 약 1,000건의 자료를 분석',
    desc: '만성통증, 교정 치료, 생리학, 정서적/임상적, 심리학적 증상에\n효과가 있음을 검증. 또한 SNPE 도구 별, SNPE 동작 별 효과에\n대하여도 비교 분석한 결과를 알 수 있다.',
  },
  {
    image: '/images/research_banner.gif',
    badge: null,
    title: 'SNPE 국제 학술 발표',
    subtitle: 'ACSM(미국스포츠의학회) · ECSS(유럽스포츠과학회)',
    desc: '2019~2021년 ACSM, ECSS 등 세계적인 스포츠과학 학회에서\nSNPE 운동의 효과에 관한 연구를 지속적으로 발표하고 있습니다.',
  },
]

const tabs = ['전체', '국내', '해외']

export default function Research() {
  const { t } = useTranslation()
  const papers = dataStore.getResearchPapers()
  const [tab, setTab] = useState('전체')

  const filtered = tab === '전체' ? papers : papers.filter((p) => p.category === tab)

  const grouped = useMemo(() => {
    const map = new Map()
    filtered.forEach((p) => {
      if (!map.has(p.year)) map.set(p.year, [])
      map.get(p.year).push(p)
    })
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]))
  }, [filtered])

  return (
    <>
      <PageBanner
        title={t('pages.research')}
        subtitle={t('pages.researchSub')}
      />

      {/* Hero Carousel */}
      <section className="bg-gradient-to-br from-snpe-darker to-snpe-accent relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: '.research-hero-next',
              prevEl: '.research-hero-prev',
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop
            className="research-hero-swiper"
          >
            {heroSlides.map((slide, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col md:flex-row items-center min-h-[360px] md:min-h-[400px]">
                  {/* Left: Image */}
                  <div className="md:w-[45%] flex items-center justify-center p-8 md:p-12">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="max-h-[260px] md:max-h-[300px] w-auto object-contain drop-shadow-xl"
                    />
                  </div>

                  {/* Right: Text */}
                  <div className="md:w-[55%] text-white px-6 md:px-10 pb-10 md:pb-0 md:py-12">
                    {slide.badge && (
                      <div className="flex items-start gap-3 mb-5">
                        <div className="flex-shrink-0 text-center">
                          <svg viewBox="0 0 60 60" className="w-14 h-14 text-yellow-300">
                            <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <text x="30" y="22" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="bold">★★★</text>
                            <text x="30" y="32" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="bold">BEST</text>
                            <text x="30" y="42" textAnchor="middle" fill="currentColor" fontSize="5">SBP·JOURNAL</text>
                          </svg>
                        </div>
                        <p className="text-xs leading-relaxed text-white/90 whitespace-pre-line pt-1">
                          {slide.badge}
                        </p>
                      </div>
                    )}

                    <h3 className="text-xl md:text-2xl font-bold mb-3 leading-snug">{slide.title}</h3>
                    <p className="text-white/90 text-sm md:text-base whitespace-pre-line mb-2 leading-relaxed">
                      {slide.subtitle}
                    </p>
                    {slide.desc && (
                      <p className="text-white/60 text-xs md:text-sm whitespace-pre-line leading-relaxed mb-6">
                        {slide.desc}
                      </p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="research-hero-prev absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors backdrop-blur-sm">
            <ChevronLeft size={20} />
          </button>
          <button className="research-hero-next absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors backdrop-blur-sm">
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Paper List */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">

          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    tab === t
                      ? 'bg-snpe-darker text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-snpe-dark'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              총 <span className="font-bold text-gray-900">{filtered.length}</span>건
            </p>
          </div>

          <div className="space-y-10">
            {grouped.map(([year, items]) => (
              <div key={year}>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">{year}년</h3>
                <div className="space-y-4">
                  {items.map((paper) => (
                    <div key={paper.id} className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-lg bg-snpe-dark/10 text-snpe-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FileText size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-bold text-gray-900 mb-1 text-sm leading-snug">{paper.title}</h4>
                            {paper.url && (
                              <a
                                href={paper.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 w-7 h-7 rounded-lg bg-snpe-dark/10 text-snpe-dark flex items-center justify-center hover:bg-snpe-dark hover:text-white transition-colors"
                                title="원문 보러가기"
                              >
                                <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mb-1.5">{paper.authors}</p>
                          {paper.desc && (
                            <p className="text-xs text-gray-600 leading-relaxed mb-2">{paper.desc}</p>
                          )}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-xs">{paper.journal}</span>
                            <span className={`px-2 py-0.5 rounded text-xs ${paper.category === '해외' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                              {paper.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
