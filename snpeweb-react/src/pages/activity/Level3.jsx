import PageBanner from '../../components/common/PageBanner'

export default function Level3() {
  return (
    <>
      <PageBanner
        title="LEVEL 3"
        subtitle="SNPE 전문가 과정"
        breadcrumb={[{ label: '교육과정', path: '/degree' }, { label: 'LEVEL 3' }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 space-y-14">

          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-snpe-dark/10 text-snpe-dark text-xs font-bold mb-4">LEVEL 3</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">SNPE 전문가 과정</h2>
            <div className="space-y-2 text-gray-600 leading-relaxed">
              <p>LEVEL 3 과정은 SNPE 지도자를 위한 심화 전문가 과정입니다.</p>
              <p>LEVEL 2 과정을 이수한 지도자를 대상으로 진행되며 보다 깊이 있는 신체 이해와 지도 역량을 강화하는 교육입니다.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">교육 목표</h3>
              <ul className="space-y-2.5 text-sm text-gray-700">
                {[
                  '신체 구조 및 운동 원리 심화 이해',
                  '전문 지도 역량 강화',
                  '다양한 상황에 맞는 지도 능력 향상',
                ].map((g) => (
                  <li key={g} className="flex items-start gap-2">
                    <span className="text-snpe-dark mt-0.5">✓</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">교육 대상</h3>
              <ul className="space-y-2.5 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-snpe-dark flex-shrink-0" />
                  <span>LEVEL 2 과정을 이수한 SNPE 지도자</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-snpe-dark/10 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs text-snpe-dark font-semibold mb-1">과정 유형</p>
              <p className="text-gray-900 font-bold">지도자 심화 과정</p>
            </div>
            <div>
              <p className="text-xs text-snpe-dark font-semibold mb-1">참여 조건</p>
              <p className="text-gray-900 font-bold">LEVEL 2 이수자만 참여 가능</p>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
