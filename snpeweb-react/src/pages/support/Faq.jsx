import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { dataStore } from '../../lib/dataStore'
import { ChevronDown } from 'lucide-react'

const categories = ['전체', '운동', '수강신청', '강사관련', '출강관련', '기타']

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [openIndex, setOpenIndex] = useState(null)
  const [faqs, setFaqs] = useState([])
  const { t } = useTranslation()

  useEffect(() => {
    dataStore.getFaqs().then(setFaqs)
  }, [])

  const filtered = activeCategory === '전체' ? faqs : faqs.filter((f) => f.category === activeCategory)

  return (
    <>
      <PageBanner
        title={t('pages.faq')}
        subtitle={t('pages.faqSub')}
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
            {filtered.map((f) => (
              <div key={f.id} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === f.id ? null : f.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-snpe-darker text-white text-xs font-bold flex items-center justify-center">
                      Q
                    </span>
                    <span className="text-sm font-medium text-gray-800">{f.question}</span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 transition-transform flex-shrink-0 ml-4 ${openIndex === f.id ? 'rotate-180' : ''}`}
                  />
                </button>
                <div className={`grid transition-all duration-300 ${openIndex === f.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-snpe-dark/10 text-snpe-dark text-xs font-bold flex items-center justify-center">
                        A
                      </span>
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{f.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="border border-gray-100 rounded-xl px-6 py-16 text-center text-gray-400 text-sm">
                해당 카테고리에 등록된 FAQ가 없습니다.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
