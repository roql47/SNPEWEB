import PageBanner from '../../components/common/PageBanner'
import { ExternalLink } from 'lucide-react'

const articles = [
  {
    year: '2020',
    items: [
      { title: '"SNPE 바른자세 운동, 재택근무 직장인에게 인기"', source: '중앙일보', date: '2020.06.15' },
      { title: '"체형 교정부터 통증 완화까지, SNPE 운동의 효과"', source: '얼루어 코리아', date: '2020.03.20' },
    ],
  },
  {
    year: '2019',
    items: [
      { title: '"SNPE, 대한민국 브랜드대상 건강부문 수상"', source: '한국경제', date: '2019.11.20' },
      { title: '"바른자세가 건강의 시작, SNPE 척추운동"', source: '까사리빙', date: '2019.09.15' },
      { title: '"SNPE 건강한삶학회 창립 학술대회 성료"', source: '메디컬투데이', date: '2019.06.10' },
    ],
  },
  {
    year: '2018',
    items: [
      { title: '"SNPE 바른자세벨트, 특허 획득"', source: '스포츠동아', date: '2018.08.20' },
      { title: '"셀프 척추운동의 새로운 패러다임, SNPE"', source: '헬스조선', date: '2018.05.10' },
    ],
  },
]

export default function News() {
  return (
    <>
      <PageBanner
        title="언론 보도"
        subtitle="SNPE 관련 미디어 보도"
        breadcrumb={[{ label: '소식', path: '/notice' }, { label: '언론보도' }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          {articles.map((group) => (
            <div key={group.year} className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-snpe">{group.year}</span>
              </h3>
              <div className="space-y-4">
                {group.items.map((a, i) => (
                  <article
                    key={i}
                    className="flex items-start justify-between gap-4 bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow group cursor-pointer"
                  >
                    <div>
                      <h4 className="font-medium text-gray-800 group-hover:text-snpe transition-colors mb-1">
                        {a.title}
                      </h4>
                      <p className="text-xs text-gray-400">{a.source} · {a.date}</p>
                    </div>
                    <ExternalLink size={16} className="text-gray-300 group-hover:text-snpe transition-colors flex-shrink-0 mt-1" />
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
