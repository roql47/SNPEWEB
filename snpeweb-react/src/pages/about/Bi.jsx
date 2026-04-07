import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'

const colors = [
  {
    label: 'MAIN COLOR',
    hex: '#5ac0c0',
    rgb: 'R90  G192  B192',
    cmyk: 'C62  M0  Y29  K0',
  },
  {
    label: 'SUB COLOR',
    hex: '#208d88',
    rgb: 'R32  G141  B136',
    cmyk: 'C79  M28  Y49  K0',
  },
  {
    label: 'SUB COLOR',
    hex: '#3b3c43',
    rgb: 'R59  G60  B67',
    cmyk: 'C72  M65  Y55  K46',
  },
]

export default function Bi() {
  return (
    <>
      <PageBanner
        title="BI 소개"
        subtitle="SNPE 바른자세운동은 인간 본연의 자세로 회복을 지향하는 새로운 패러다임 운동법입니다."
        breadcrumb={[
          { label: 'SNPE 운동이란?', path: '/about' },
          { label: 'BI 소개' },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          {/* BI 소개 */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              BI 소개
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              기업 이미지에 있어 고유한 요소이므로 어떠한 경우라도
              <br className="hidden md:block" />
              변형되어서는 안되며 규정에 의하여 정확하게 사용되어야 합니다.
            </p>
            <div className="mt-6 w-16 h-0.5 bg-snpe-dark mx-auto" />
          </div>

          {/* Logo */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Logo
            </h3>
            <p className="text-gray-600 leading-[1.9] mb-10 max-w-3xl">
              SNPE 대표 동작인 1번 동작을 형상화하여 그 중요성을 강조합니다.
              <br />
              SNPE 운동을 통하여 인간 본연의 자세로 회복을 지향합니다.
              <br />
              <br />
              척추 본연의 곡선인 S자를 떠올릴 수 있으며,
              <br />
              동시에 Self Natural Posture Exercise 의 &lsquo;
              <strong className="text-snpe-dark">S</strong>elf&rsquo;를
              강조하는 의미도 있습니다.
            </p>

            <img
              src="/images/logo-guide.jpg"
              alt="SNPE 로고 가이드"
              className="w-full object-contain"
            />
          </div>

          {/* Color System */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Color System
            </h3>
            <p className="text-gray-600 leading-relaxed mb-10">
              민트 컬러는 SNPE 바른자세운동을 통한 힐링과 심신의 안정을
              의미합니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {colors.map((c) => (
                <div
                  key={c.hex}
                  className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
                >
                  <div
                    className="h-36 md:h-44"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div className="bg-white p-5">
                    <p className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-2">
                      {c.label}
                    </p>
                    <p className="text-xl font-bold text-gray-900 mb-3">
                      {c.hex}
                    </p>
                    <div className="text-xs text-gray-500 space-y-1 font-mono">
                      <p>{c.rgb}</p>
                      <p>{c.cmyk}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
