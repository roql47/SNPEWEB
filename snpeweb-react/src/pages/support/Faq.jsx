import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { ChevronDown } from 'lucide-react'

const categories = ['전체', '운동', '수강신청', '강사관련', '출강관련', '기타']

const faqs = [
  { category: '운동', q: 'SNPE 운동은 어떤 도구가 필요한가요?', a: '바른자세벨트, 다나송(SNPE 전용 스트랩), 웨이브베개가 기본 도구입니다. SNPE SHOP에서 구매하실 수 있습니다.' },
  { category: '운동', q: '운동 초보자도 할 수 있나요?', a: '네, SNPE는 누구나 할 수 있는 셀프 운동법입니다. 입문자 가이드와 영상을 참고하시거나, 전문센터에서 기초부터 배우실 수 있습니다.' },
  { category: '운동', q: '디스크 환자도 SNPE 운동을 할 수 있나요?', a: '경미한 디스크 증상의 경우 도움이 될 수 있지만, 반드시 전문 의료인과 상담 후 전문 강사의 지도 아래 진행하시길 권장합니다.' },
  { category: '수강신청', q: '전문센터 수강은 어떻게 신청하나요?', a: '전문센터 검색에서 가까운 센터를 찾으신 후 직접 연락하시거나, 온라인 수강신청 페이지에서 신청하실 수 있습니다.' },
  { category: '수강신청', q: '온라인으로도 수업을 들을 수 있나요?', a: '네, 온라인 교육 플랫폼을 통해 실시간 및 녹화 수업을 수강하실 수 있습니다.' },
  { category: '강사관련', q: '인증강사가 되려면 어떻게 해야 하나요?', a: 'Level 3 입문과정부터 시작하여 Level 2, Level 1까지 단계적으로 교육과 시험을 통해 인증강사 자격을 취득하실 수 있습니다.' },
  { category: '강사관련', q: '자격시험은 언제 있나요?', a: '연 2~3회 정기적으로 시행됩니다. 공지사항에서 정확한 일정을 확인하세요.' },
  { category: '출강관련', q: '기업 출강은 어떻게 요청하나요?', a: '고객 문의 또는 전화(02-539-2925)로 기업 출강 상담을 요청하실 수 있습니다.' },
  { category: '기타', q: 'SNPE SHOP에서 어떤 제품을 구매할 수 있나요?', a: '바른자세벨트, 다나송, 웨이브베개, SNPE 서적 등 다양한 운동 도구와 교재를 구매하실 수 있습니다.' },
]

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [openIndex, setOpenIndex] = useState(null)
  const { t } = useTranslation()

  const filtered = activeCategory === '전체' ? faqs : faqs.filter((f) => f.category === activeCategory)

  return (
    <>
      <PageBanner
        title={t('pages.faq')}
        subtitle={t('pages.faqSub')}
        breadcrumb={[{ label: t('nav.support'), path: '/search-center' }, { label: t('pages.faq') }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => { setActiveCategory(c); setOpenIndex(null) }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === c ? 'bg-snpe-darker text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          <div className="space-y-3">
            {filtered.map((f, i) => (
              <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-snpe-darker text-white text-xs font-bold flex items-center justify-center">
                      Q
                    </span>
                    <span className="text-sm font-medium text-gray-800">{f.q}</span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 transition-transform flex-shrink-0 ml-4 ${openIndex === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="px-6 pb-5 flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-snpe-dark/10 text-snpe-dark text-xs font-bold flex items-center justify-center">
                      A
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
