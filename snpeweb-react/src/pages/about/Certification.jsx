import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { FileCheck, Shield, Award, Microscope } from 'lucide-react'

const stats = [
  { num: '144+', label: '특허 및 디자인 등록', icon: FileCheck },
  { num: '3', label: '상표권 등록 완료', icon: Shield },
  { num: 'ACSM', label: '국제 학술지 논문 등재', icon: Microscope },
  { num: '다수', label: '브랜드 수상 이력', icon: Award },
]

const patents = [
  {
    category: '바른자세벨트 관련',
    items: [
      '바른자세벨트 (비탄력) 구조 및 사용방법',
      '바른자세벨트 (탄력) 구조 및 사용방법',
      '바른자세벨트 조절 장치',
      '골반밴드 구조 및 교정 보조 장치',
    ],
  },
  {
    category: '척추운동 도구',
    items: [
      '웨이브베개 (다날 척추베개)',
      'SNPE 다날 도구 시리즈',
      'SNPE 풋밸런스',
      'SNPE 롤러',
      'SNPE 척추 정렬 보조 기구',
    ],
  },
  {
    category: '운동 방법 특허',
    items: [
      'SNPE 바른자세 척추운동법',
      'SNPE 셀프 자세 교정 운동 시스템',
      'SNPE 도구 활용 운동 프로토콜',
    ],
  },
  {
    category: '디자인 등록',
    items: [
      '바른자세벨트 외관 디자인',
      '웨이브베개 외관 디자인',
      '다날 도구 시리즈 디자인',
      'SNPE 운동 도구 패키지 디자인',
    ],
  },
]

const trademarks = [
  { number: '4017590910000', status: '등록 완료' },
  { number: '4018579000000', status: '등록 완료' },
  { number: '4018579010000', status: '등록 완료' },
  { number: '출원공고중', status: '2026년 3월 등록 예정' },
]

const awards = [
  { year: '2019', title: '대한민국 브랜드대상 건강/운동 부문 대상' },
  { year: '2019', title: '건강한삶학회 창립 및 제1회 학술대회 개최' },
  { year: '2020', title: '중앙일보 소비자 만족도 선정' },
  { year: '2018', title: '중소벤처기업부 벤처기업 인증' },
  { year: '2025', title: '차의과학대학교 SNPE 석사과정 개설' },
  { year: '2025', title: '올리브영 입점' },
]

export default function Certification() {
  const { t } = useTranslation()

  return (
    <>
      <PageBanner
        title={t('pages.certification')}
        subtitle={t('pages.certificationSub')}
        breadcrumb={[{ label: t('nav.about'), path: '/about' }, { label: t('pages.certification') }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 space-y-20">

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center mx-auto mb-3">
                  <s.icon size={22} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{s.num}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Patents */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">특허 및 디자인 등록</h2>
            <p className="text-sm text-gray-500 text-center mb-8">SNPE는 운동 방법, 도구 구조, 디자인 등 144건 이상의 지식재산권을 보유하고 있습니다.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {patents.map((group) => (
                <div key={group.category} className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileCheck size={16} className="text-snpe-dark" />
                    {group.category}
                  </h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-snpe-dark flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Trademarks */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">상표권 등록 현황</h2>
            <p className="text-sm text-gray-500 text-center mb-8">특허청 등록 상표</p>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-[1fr_auto] bg-gray-50 text-sm font-medium text-gray-600 px-6 py-3 border-b">
                  <span>등록 번호</span>
                  <span>상태</span>
                </div>
                {trademarks.map((tm, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto] px-6 py-3.5 border-b border-gray-100 last:border-0 text-sm">
                    <span className="font-mono text-gray-700">{tm.number}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${tm.status.includes('완료') ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                      {tm.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Awards */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">수상 및 주요 성과</h2>
            <div className="max-w-3xl mx-auto space-y-3">
              {awards.sort((a, b) => b.year.localeCompare(a.year)).map((a, i) => (
                <div key={i} className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <span className="flex-shrink-0 w-16 h-10 rounded-lg bg-snpe-dark/10 text-snpe-dark flex items-center justify-center text-sm font-bold">
                    {a.year}
                  </span>
                  <span className="text-sm text-gray-700 font-medium">{a.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ACSM Note */}
          <div className="bg-snpe-dark/10 rounded-3xl p-8 md:p-10 text-center">
            <Microscope size={32} className="text-snpe-dark mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">국제 학술 논문 등재</h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">
              SNPE 바른자세 척추운동의 효과는 ACSM(미국스포츠의학회) 등 국제 학술지에 연구 논문으로 등재되어
              과학적 근거를 갖춘 운동법으로 인정받고 있습니다.
              차의과학대학교, 국민대학교 등과 함께 지속적인 연구를 진행하고 있습니다.
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
