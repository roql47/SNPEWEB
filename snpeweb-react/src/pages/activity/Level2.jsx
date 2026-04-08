import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'

export default function Level2() {
  const { t } = useTranslation()

  return (
    <>
      <PageBanner
        title={t('pages.level2')}
        subtitle={t('pages.level2Sub')}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 space-y-14">

          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-snpe-dark/10 text-snpe-dark text-xs font-bold mb-4">LEVEL 2</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">SNPE 지도자 자격 과정</h2>
            <div className="space-y-2 text-gray-600 leading-relaxed">
              <p>LEVEL 2 과정은 SNPE 지도자로 활동하기 위한 지도자 자격 과정입니다.</p>
              <p>SNPE 운동 원리와 동작을 보다 깊이 이해하고 실제 지도에 필요한 티칭 중심 교육이 진행됩니다.</p>
              <p className="text-sm text-gray-500">누구나 수강할 수 있지만 SNPE 운동 경험이 없는 경우 교육을 따라가기에 다소 어려울 수 있습니다.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">교육 목표</h3>
              <ul className="space-y-2.5 text-sm text-gray-700">
                {[
                  'SNPE 운동 원리 심화 이해',
                  '동작 지도 방법 학습',
                  '티칭 능력 향상',
                  '지도자로서의 기본 역량 습득',
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
                {[
                  'SNPE 지도자로 활동하고 싶은 분',
                  '운동 지도 경험에 전문성을 더하고 싶은 분',
                  'SNPE 운동 경험이 있는 분',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-snpe-dark flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-snpe-dark/10 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs text-snpe-dark font-semibold mb-1">과정 유형</p>
              <p className="text-gray-900 font-bold">지도자 자격 과정</p>
            </div>
            <div>
              <p className="text-xs text-snpe-dark font-semibold mb-1">이수 결과</p>
              <p className="text-gray-900 font-bold">평가를 통해 SNPE 지도자 자격 취득 가능</p>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
