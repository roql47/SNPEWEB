import PageBanner from '../../components/common/PageBanner'

const timeline = [
  { year: '2023', events: ['SNPE 바른자세 척추운동 글로벌 확장', '해외 대학 학위과정 추가 개설'] },
  { year: '2022', events: ['SNPE SHOP 스마트스토어 오픈', 'SNPE 인증강사 500명 돌파'] },
  { year: '2021', events: ['SNPE AI 자세분석 APP 업데이트', '제2회 건강한삶학회 학술대회 개최'] },
  { year: '2020', events: ['SNPE 온라인 교육 플랫폼 구축', '코로나19 대응 비대면 수업 시작'] },
  { year: '2019', events: ['제1회 건강한삶학회 학술대회 개최', '서울시 강남구 본사 확장 이전', '대한민국 브랜드대상 수상'] },
  { year: '2018', events: ['SNPE 바른자세벨트 특허 획득', 'SNPE 웨이브베개 특허 획득', '벤처기업 인증 획득'] },
  { year: '2017', events: ['SNPE 자세분석 APP 출시', '전국 전문센터 50개소 돌파'] },
  { year: '2016', events: ['SNPE 바른자세 척추운동 법인 설립', '인증강사 양성 프로그램 시작'] },
]

export default function History() {
  return (
    <>
      <PageBanner
        title="연혁"
        subtitle="SNPE의 발자취를 소개합니다"
        breadcrumb={[{ label: 'SNPE 운동이란?', path: '/about' }, { label: '연혁' }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-snpe/20 -translate-x-1/2" />

            {timeline.map((t, i) => (
              <div key={t.year} className={`relative flex flex-col md:flex-row items-start mb-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Year bubble */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-snpe text-white text-sm font-bold flex items-center justify-center z-10">
                  {t.year.slice(2)}
                </div>

                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-snpe mb-3">{t.year}</h3>
                    <ul className="space-y-2">
                      {t.events.map((e, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-snpe mt-1">•</span>
                          {e}
                        </li>
                      ))}
                    </ul>
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
