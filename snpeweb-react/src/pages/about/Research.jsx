import { useState, useEffect, useMemo } from 'react'
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
  { image: '/images/carousel_1.jpg' },
  { image: '/images/carousel_2.jpg' },
  { image: '/images/carousel_3.jpg' },
  { image: '/images/carousel_4.jpg' },
]

const tabs = [
  { value: '전체', key: 'researchPage.tabs.all' },
  { value: '국내', key: 'researchPage.tabs.domestic' },
  { value: '해외', key: 'researchPage.tabs.overseas' },
]

export default function Research() {
  const { t } = useTranslation()
  const [papers, setPapers] = useState([])
  const [tab, setTab] = useState(tabs[0].value)

  useEffect(() => {
    dataStore.getResearchPapers().then(setPapers)
  }, [])

  const filtered = tab === tabs[0].value ? papers : papers.filter((p) => p.category === tab)
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
      <PageBanner title={t('pages.research')} subtitle={t('pages.researchSub')} />

      <section className="bg-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 py-8 relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{ nextEl: '.research-hero-next', prevEl: '.research-hero-prev' }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            className="research-hero-swiper"
          >
            {heroSlides.map((slide, i) => (
              <SwiperSlide key={slide.image}>
                <div className="flex items-center justify-center pb-8">
                  <img
                    src={slide.image}
                    alt={t('researchPage.slideAlt', { number: i + 1 })}
                    className="w-full h-auto object-contain rounded-xl"
                    style={{ maxHeight: '420px' }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="research-hero-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors shadow">
            <ChevronLeft size={20} />
          </button>
          <button className="research-hero-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors shadow">
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              {tabs.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setTab(item.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    tab === item.value
                      ? 'bg-snpe-darker text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-snpe-dark'
                  }`}
                >
                  {t(item.key)}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500">{t('researchPage.total', { count: filtered.length })}</p>
          </div>

          <div className="space-y-10">
            {grouped.map(([year, items]) => (
              <div key={year}>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">{t('researchPage.year', { year })}</h3>
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
                                title={t('researchPage.openPaper')}
                              >
                                <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mb-1.5">{paper.authors}</p>
                          {paper.desc && <p className="text-xs text-gray-600 leading-relaxed mb-2">{paper.desc}</p>}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-xs">{paper.journal}</span>
                            <span className={`px-2 py-0.5 rounded text-xs ${paper.category === '해외' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                              {paper.category === '해외' ? t('researchPage.tabs.overseas') : t('researchPage.tabs.domestic')}
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
