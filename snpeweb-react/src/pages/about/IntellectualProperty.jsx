import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { FileCheck, ChevronLeft, ChevronRight, Shield, Lightbulb, PenTool } from 'lucide-react'

const catalogPages = [
  {
    title: '바른자세벨트 관련 특허',
    icon: Shield,
    items: [
      { name: '바른자세벨트 (비탄력) 구조 및 사용방법', type: '특허', status: '등록' },
      { name: '바른자세벨트 (탄력) 구조 및 사용방법', type: '특허', status: '등록' },
      { name: '바른자세벨트 조절 장치', type: '특허', status: '등록' },
      { name: '골반밴드 구조 및 교정 보조 장치', type: '특허', status: '등록' },
    ],
    description: 'SNPE 바른자세벨트는 비탄력·탄력 2종의 특허 구조로, 사용자의 자세 교정을 과학적으로 지원합니다.',
  },
  {
    title: '척추운동 도구 특허',
    icon: Lightbulb,
    items: [
      { name: '웨이브베개 (다날 척추베개)', type: '특허', status: '등록' },
      { name: 'SNPE 다날 도구 시리즈', type: '특허', status: '등록' },
      { name: 'SNPE 풋밸런스', type: '특허', status: '등록' },
      { name: 'SNPE 롤러', type: '특허', status: '등록' },
      { name: 'SNPE 척추 정렬 보조 기구', type: '특허', status: '등록' },
    ],
    description: 'SNPE 전용 도구들은 각각 독자적인 특허를 보유하고 있으며, 운동 효과를 극대화하도록 설계되었습니다.',
  },
  {
    title: '운동 방법 특허',
    icon: FileCheck,
    items: [
      { name: 'SNPE 바른자세 척추운동법', type: '특허', status: '등록' },
      { name: 'SNPE 셀프 자세 교정 운동 시스템', type: '특허', status: '등록' },
      { name: 'SNPE 도구 활용 운동 프로토콜', type: '특허', status: '등록' },
    ],
    description: 'SNPE 운동법 자체가 특허로 보호되며, 도구와 결합한 독자적인 운동 프로토콜을 갖추고 있습니다.',
  },
  {
    title: '디자인 등록',
    icon: PenTool,
    items: [
      { name: '바른자세벨트 외관 디자인', type: '디자인', status: '등록' },
      { name: '웨이브베개 외관 디자인', type: '디자인', status: '등록' },
      { name: '다날 도구 시리즈 디자인', type: '디자인', status: '등록' },
      { name: 'SNPE 운동 도구 패키지 디자인', type: '디자인', status: '등록' },
    ],
    description: 'SNPE 도구의 외관과 패키지 디자인은 특허청에 등록되어 있습니다.',
  },
]

export default function IntellectualProperty() {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(0)
  const page = catalogPages[currentPage]
  const Icon = page.icon

  return (
    <>
      <PageBanner
        title={t('pages.intellectualProperty')}
        subtitle={t('pages.intellectualPropertySub')}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">

          <div className="text-center mb-12">
            <p className="text-3xl font-bold text-gray-900 mb-2">144+</p>
            <p className="text-sm text-gray-500">특허 및 디자인 등록 건수</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-snpe-darker to-snpe-dark text-white p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs text-white/60">
                    {currentPage + 1} / {catalogPages.length}
                  </p>
                  <h2 className="text-xl md:text-2xl font-bold">{page.title}</h2>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">{page.description}</p>
            </div>

            <div className="p-6 md:p-8">
              <div className="space-y-3">
                {page.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-gray-50 rounded-xl px-5 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-snpe-dark/10 text-snpe-dark text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-700 font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-snpe-dark/10 text-snpe-dark px-2.5 py-0.5 rounded-full">
                        {item.type}
                      </span>
                      <span className="text-xs bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} /> 이전
              </button>

              <div className="flex gap-2">
                {catalogPages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      i === currentPage ? 'bg-snpe-dark' : 'bg-gray-200 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(catalogPages.length - 1, p + 1))}
                disabled={currentPage === catalogPages.length - 1}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                다음 <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
