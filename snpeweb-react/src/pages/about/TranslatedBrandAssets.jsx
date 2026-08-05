import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Palette, Shield, FileCheck } from 'lucide-react'

const colors = [
  { label: 'MAIN COLOR', hex: '#5ac0c0', rgb: 'R90  G192  B192', cmyk: 'C62  M0  Y29  K0' },
  { label: 'SUB COLOR', hex: '#208d88', rgb: 'R32  G141  B136', cmyk: 'C79  M28  Y49  K0' },
  { label: 'SUB COLOR', hex: '#3b3c43', rgb: 'R59  G60  B67', cmyk: 'C72  M65  Y55  K46' },
]

export default function TranslatedBrandAssets() {
  const { t } = useTranslation()
  const prohibited = t('brandAssetsPage.guidelines.prohibited', { returnObjects: true })
  const usage = t('brandAssetsPage.guidelines.usage', { returnObjects: true })
  const sanctions = t('brandAssetsPage.guidelines.sanctions', { returnObjects: true })
  const trademarks = [
    { no: '40-1759091', image: '/images/ip/trademark-1.png', label: 'SNPE' },
    { no: '40-1857900', image: '/images/ip/trademark-2.png', label: 'SNPE (Self Natural Posture Exercise)' },
    { no: '40-1857901', image: '/images/ip/trademark-3.png', label: t('brandAssetsPage.ip.trademarkLabels.snpeSpine', { defaultValue: 'SNPE Correct Posture Spinal Exercise' }) },
    { no: '40-2525675', image: '/images/ip/trademark-4.png', label: 'SNPE STUDIO' },
  ]

  return (
    <>
      <PageBanner title={t('pages.brandAssets')} subtitle={t('pages.brandAssetsSub')} />
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 space-y-20">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-mint-darker mb-4">
              <Palette size={16} /> BI
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">{t('brandAssetsPage.bi.title')}</h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">{t('brandAssetsPage.bi.desc')}</p>
            <div className="mt-6 w-16 h-0.5 bg-mint-darker mx-auto" />
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-6">Logo</h3>
            <p className="text-gray-600 leading-[1.9] mb-10 max-w-3xl">{t('brandAssetsPage.bi.logoDesc')}</p>
            <img src="/images/logo-guide.jpg" alt={t('brandAssetsPage.bi.logoAlt', { defaultValue: 'SNPE logo guide' })} className="w-full object-contain" />
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">Color System</h3>
            <p className="text-gray-600 leading-relaxed mb-10">{t('brandAssetsPage.bi.colorDesc')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {colors.map((c) => (
                <div key={c.hex} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <div className="h-36 md:h-44" style={{ backgroundColor: c.hex }} />
                  <div className="bg-white p-5">
                    <p className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-2">{c.label}</p>
                    <p className="text-xl font-bold text-gray-900 mb-3">{c.hex}</p>
                    <div className="text-xs text-gray-500 space-y-1 font-mono">
                      <p>{c.rgb}</p>
                      <p>{c.cmyk}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-mint-darker mb-4">
              <Shield size={16} /> IP
            </p>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">{t('brandAssetsPage.ip.title')}</h2>
            <p className="mt-2 text-sm text-gray-500">{t('brandAssetsPage.ip.desc')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              {trademarks.map((tm) => (
                <div key={tm.no} className="border border-gray-200 rounded-md overflow-hidden">
                  <div className="aspect-[4/3] bg-white flex items-center justify-center p-6 border-b border-gray-100">
                    <img src={tm.image} alt={tm.label} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] text-gray-400 mb-1">{t('brandAssetsPage.ip.registrationNo')}</p>
                    <p className="text-sm text-gray-900 font-mono">{tm.no}</p>
                    <p className="mt-2 text-xs text-gray-500 leading-relaxed">{tm.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 bg-gray-50 rounded-2xl p-6 md:p-8">
            <div className="flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <FileCheck size={22} className="text-mint-darker mb-1" />
              <p className="text-2xl font-bold text-gray-900">144+</p>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">{t('brandAssetsPage.ip.patentsTitle')}</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{t('brandAssetsPage.ip.patentsDesc')}</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-12">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">{t('brandAssetsPage.guidelines.title')}</h2>
              <p className="text-[15px] text-gray-700 leading-7 mb-3">{t('brandAssetsPage.guidelines.desc')}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{t('brandAssetsPage.guidelines.note')}</p>
            </div>

            {Array.isArray(prohibited) && prohibited.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-200">
                  {t('brandAssetsPage.guidelines.prohibitedTitle')}
                </h3>
                <div className="space-y-5">
                  {prohibited.map((group, index) => (
                    <div key={group.title} className="border border-gray-100 rounded-2xl p-5 bg-white">
                      <p className="text-xs text-gray-400 font-mono mb-2">0{index + 1}</p>
                      <h4 className="font-bold text-gray-900 mb-3">{group.title}</h4>
                      <ul className="space-y-2.5">
                        {(group.items || []).map((item, i) => (
                          <li key={i} className="text-sm text-gray-600 leading-relaxed">
                            {item.head && <span className="font-medium text-gray-800">{item.head}: </span>}
                            {item.body}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(usage) && usage.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-200">
                  {t('brandAssetsPage.guidelines.usageTitle')}
                </h3>
                <div className="space-y-3">
                  {usage.map((row) => (
                    <div key={row.label} className="flex gap-4 p-4 rounded-xl bg-gray-50">
                      <span className="text-xs font-bold text-snpe-dark whitespace-nowrap mt-0.5">{row.label}</span>
                      <p className="text-sm text-gray-600 leading-relaxed">{row.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(sanctions) && sanctions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-200">
                  {t('brandAssetsPage.guidelines.sanctionsTitle')}
                </h3>
                <div className="space-y-3">
                  {sanctions.map((row) => (
                    <div key={row.title} className="border border-gray-100 rounded-xl p-4">
                      <h4 className="font-bold text-gray-900 mb-1">{row.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{row.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
