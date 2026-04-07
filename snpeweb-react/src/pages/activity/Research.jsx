import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { FileText, ExternalLink } from 'lucide-react'

const papers = [
  {
    title: 'SNPE 운동이 경추 및 어깨 통증 감소에 미치는 효과',
    authors: '윤지유 외',
    journal: '한국체육학회지',
    year: '2020',
    link: 'https://www.kci.go.kr',
  },
  {
    title: 'SNPE 운동이 스트레스 지표 및 만성 통증에 미치는 영향',
    authors: '윤지유 외',
    journal: '한국운동재활학회지',
    year: '2019',
    link: 'https://www.kci.go.kr',
  },
  {
    title: 'SNPE 기본동작 수행도와 요통/골반통의 상관관계 연구',
    authors: '윤지유 외',
    journal: '대한물리치료학회지',
    year: '2019',
    link: 'https://www.kci.go.kr',
  },
  {
    title: 'SNPE 바른자세벨트 착용이 자세 교정에 미치는 효과',
    authors: '윤지유 외',
    journal: '한국체육학회지',
    year: '2018',
    link: 'https://www.kci.go.kr',
  },
]

export default function Research() {
  const { t } = useTranslation()

  return (
    <>
      <PageBanner
        title={t('pages.research')}
        subtitle={t('pages.researchSub')}
        breadcrumb={[{ label: t('nav.education'), path: '/degree' }, { label: t('pages.research') }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            {papers.map((p, i) => (
              <article key={i} className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center mt-1">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                    <p className="text-sm text-gray-500 mb-1">{p.authors} · {p.journal} · {p.year}</p>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-snpe-dark font-medium hover:underline mt-2"
                    >
                      논문 보기 <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
