import PageBanner from '../../components/common/PageBanner'

export default function Bi() {
  const trademarkNumbers = ['4017590910000', '4018579000000', '4018579010000']

  const prohibitedItems = [
    {
      title: '1) 온·오프라인 영리 목적의 홍보 및 광고',
      details: [
        "클래스 개설: 본사 승인 없이 'SNPE' 명칭을 활용한 온라인 강의(VOD, 실시간 라이브 등) 개설 및 판매",
        '상업적 노출: SNS(인스타그램, 유튜브, 블로그 등) 내 상업적 협찬, 공동구매, 광고물 제작 시 SNPE 상표를 홍보 수단으로 활용하는 행위',
        "플랫폼 무단 등록: 네이버 스마트플레이스, 카카오맵 등 지도 서비스에 본사 승인 없이 'SNPE'를 사업자명이나 지점명으로 등록하는 행위",
        '관계 오인 유도: 본사와 정식 계약 관계인 가맹점 또는 인증점으로 오인될 수 있는 문구 사용',
      ],
    },
    {
      title: '2) 오프라인 영업 시설(센터/스튜디오) 오용',
      details: ['공식 계약(가맹/라이선스) 체결 없이 간판, 외부 시트지, 인테리어 등에 SNPE 상표를 사용하는 행위'],
    },
    {
      title: '3) 상표 도용 상품(굿즈) 제작 및 판매',
      details: ['SNPE 상표를 무단 각인·인쇄하여 제작한 운동 기구, 의류, 소품 등을 온·오프라인에서 제작·유통·판매하는 행위'],
    },
    {
      title: '4) 공식 채널 사칭',
      details: [
        "계정명 및 프로필에 'SNPE 공식', 'SNPE 본사', 'SNPE 인증', 'SNPE 전문센터' 등 본사 및 공식 제휴처로 오인하게 하여 회원을 모집하거나 광고 수익을 취하는 등의 행위",
      ],
    },
  ]

  const allowedScope = [
    "SNPE 지도자 자격증은 '교육 및 지도 능력'을 인증하는 것이며, 별도의 계약 없이 '상표권에 대한 사용권'을 부여하는 것은 아닙니다.",
    "허용 범위: 본인의 프로필(이력서) 내 'SNPE 인증 강사' 명기",
    '조건부 허용: 문화센터, 관공서 등 공공기관에서 진행되는 수업은 공공 교육 활동으로 분류하여, 해당 기관 내 홍보물에 한해 상표 사용을 일부 승인합니다.',
    '불허 범위: 본 가이드라인 제 2조 "금지 사항"에 포함된 일체의 행위',
  ]

  const sanctions = [
    '1. 시정 권고: 위반 사항에 대한 즉각적인 삭제 및 수정 요청 (경고장 발송)',
    '2. 자격 제재: 가이드라인 반복 위반 시, 내부 규정에 따른 강사 자격 정지 또는 취소 (이부분은 내부 논의중)',
    '3. 법적 조치: 민·형사상 손해배상 청구 및 상표법·부정경쟁방지법 위반에 따른 고소/고발',
  ]

  const parsingNotes = [
    "E3 셀에는 '#VALUE!'가 있어 제목/데이터 오류 가능성이 있음",
    '등록번호 3개와 별도로 출원공고중 상태 문구가 함께 기재되어 있음',
  ]

  return (
    <>
      <PageBanner
        title="BI 소개"
        subtitle="상표권 고지 및 사용 가이드라인"
        breadcrumb={[{ label: 'SNPE 운동이란?', path: '/about' }, { label: '로고,BI소개(상표권)' }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-10 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">특허청 등록 상표</h3>
            <div className="space-y-2 text-gray-700">
              {trademarkNumbers.map((number) => (
                <p key={number} className="font-mono text-sm md:text-base">
                  등록번호: {number}
                </p>
              ))}
              <p className="pt-2 font-medium text-snpe">현재 출원공고중 (3월말 등록완료 예정)</p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">SNPE 상표권 사용 가이드라인 (홈페이지 공지용)</h3>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-8">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">1. 목적</h4>
                <p className="text-gray-700 leading-relaxed">
                  본 가이드라인은 SNPE 브랜드 가치를 유지하고, 정식 인증을 받은 강사 및 파트너사의 권익을 보호하기 위해
                  수립되었습니다. (주)큐링의 소중한 지식재산권인 상표권 보호를 위해 아래 사항을 반드시 준수하여 주시기 바랍니다.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">2. 금지 사항: 상표 무단 사용 행위</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  본사의 사전 서면 승인 없이 아래 행위를 하는 것은, 상표법 및 부정경쟁방지법에 의거하여 엄격히 금지되며
                  법적 책임을 물을 수 있습니다.
                </p>
                <div className="space-y-5">
                  {prohibitedItems.map((item) => (
                    <div key={item.title} className="bg-gray-50 rounded-xl p-4 md:p-5 border border-gray-100">
                      <h5 className="font-semibold text-gray-900 mb-2">{item.title}</h5>
                      <ul className="list-disc pl-5 space-y-1.5 text-gray-700 text-sm md:text-base">
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">3. 정식 인증 강사의 상표 사용 허용 범위</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
                  {allowedScope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">4. 위반 시 조치 및 제재</h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  상표권 무단 사용 및 오용 사례 적발 시, (주)큐링은 브랜드 자산 보호를 위해 단계별 법적 절차를 진행합니다.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
                  {sanctions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-xs md:text-sm text-gray-500 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h4 className="font-semibold text-gray-700 mb-2">참고 사항</h4>
            <ul className="list-disc pl-5 space-y-1">
              {parsingNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
