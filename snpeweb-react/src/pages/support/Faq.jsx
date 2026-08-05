import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { dataStore } from '../../lib/dataStore'
import { ChevronDown } from 'lucide-react'

const categories = [
  { value: '전체', labelKey: 'support.faq.categories.all' },
  { value: '운동', labelKey: 'support.faq.categories.exercise' },
  { value: '수강신청', labelKey: 'support.faq.categories.registration' },
  { value: '강사관련', labelKey: 'support.faq.categories.instructor' },
  { value: '출강관련', labelKey: 'support.faq.categories.corporate' },
  { value: '기타', labelKey: 'support.faq.categories.other' },
]

function normalizeFaqKey(text = '') {
  return String(text)
    .replace(/^Q\s*/i, '')
    .replace(/\s+/g, '')
    .toLowerCase()
}

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState(categories[0].value)
  const [openIndex, setOpenIndex] = useState(null)
  const [faqs, setFaqs] = useState([])
  const { t, i18n } = useTranslation()

  useEffect(() => {
    dataStore.getFaqs().then(setFaqs)
  }, [])

  const isJa = (i18n.language || '').startsWith('ja')
  const jaEntries = t('support.faq.entries', { returnObjects: true })
  const entryMap = Array.isArray(jaEntries)
    ? Object.fromEntries(
        jaEntries
          .filter((e) => e?.questionKo)
          .map((e) => [normalizeFaqKey(e.questionKo), e])
      )
    : {}

  const localizeFaq = (f) => {
    if (!isJa) return f
    const hit = entryMap[normalizeFaqKey(f.question)]
    if (!hit) return f
    return {
      ...f,
      question: hit.question || f.question,
      answer: hit.answer || f.answer,
    }
  }

  const filtered = activeCategory === categories[0].value ? faqs : faqs.filter((f) => f.category === activeCategory)

  return (
    <>
      <PageBanner title={t('pages.faq')} subtitle={t('pages.faqSub')} />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => { setActiveCategory(c.value); setOpenIndex(null) }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === c.value ? 'bg-snpe-darker text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t(c.labelKey)}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((raw) => {
              const f = localizeFaq(raw)
              return (
              <div key={f.id} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === f.id ? null : f.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-snpe-darker text-white text-xs font-bold flex items-center justify-center">Q</span>
                    <span className="text-sm font-medium text-gray-800">{f.question}</span>
                  </div>
                  <ChevronDown size={18} className={`text-gray-400 transition-transform flex-shrink-0 ml-4 ${openIndex === f.id ? 'rotate-180' : ''}`} />
                </button>
                <div className={`grid transition-all duration-300 ${openIndex === f.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-snpe-dark/10 text-snpe-dark text-xs font-bold flex items-center justify-center">A</span>
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{f.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
              )
            })}
            {filtered.length === 0 && (
              <div className="border border-gray-100 rounded-xl px-6 py-16 text-center text-gray-400 text-sm">
                {t('support.faq.empty')}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
