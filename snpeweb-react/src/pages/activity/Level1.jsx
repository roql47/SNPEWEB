import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'

export default function Level1() {
  const { t } = useTranslation()

  return (
    <>
      <PageBanner
        title={t('pages.level1')}
        subtitle={t('pages.level1Sub')}
        breadcrumb={[{ label: t('nav.education'), path: '/degree' }, { label: t('pages.level1') }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 space-y-14">

          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-snpe-dark/10 text-snpe-dark text-xs font-bold mb-4">LEVEL 1</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">SNPE 기초 수료 과정</h2>
            <div className="space-y-2 text-gray-600 leading-relaxed">
              <p>LEVEL 1 과정은 SNPE 운동의 기본 원리와 핵심 동작을 배우는 기초 수료 과정입니다.</p>
              <p>신체 정렬과 자세 인식을 통해 SNPE 운동의 기초를 이해하고 몸의 변화를 경험할 수 있습니다.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">교육 목표</h3>
              <ul className="space-y-2.5 text-sm text-gray-700">
                {[
                  'SNPE 운동 기본 원리 이해',
                  '신체 정렬 및 바른 자세 인식',
                  'SNPE 기본 동작 학습',
                  '스스로 몸을 관리할 수 있는 기초 운동 습득',
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
                  'SNPE 운동을 처음 배우는 분',
                  '자신의 자세와 신체 균형을 이해하고 싶은 분',
                  'SNPE 운동을 체계적으로 배우고 싶은 분',
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
              <p className="text-gray-900 font-bold">수료 과정</p>
            </div>
            <div>
              <p className="text-xs text-snpe-dark font-semibold mb-1">이수 결과</p>
              <p className="text-gray-900 font-bold">교육 이수 시 LEVEL 1 수료</p>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
