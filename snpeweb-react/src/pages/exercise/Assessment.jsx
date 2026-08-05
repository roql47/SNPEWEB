import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Smartphone, ClipboardCheck, CheckCircle2 } from 'lucide-react'

export default function Assessment() {
  const { t } = useTranslation()
  const selfItems = t('assessmentPage.self.items', { returnObjects: true })
  const proSystems = t('assessmentPage.pro.systems', { returnObjects: true })
  const proAnalysis = t('assessmentPage.pro.analysis', { returnObjects: true })

  return (
    <>
      <PageBanner title={t('pages.assessment')} subtitle={t('pages.assessmentSub')} />

      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-mint-lighter/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            {t('assessmentPage.intro')}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center flex-shrink-0">
              <Smartphone size={22} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">{t('assessmentPage.self.title')}</h2>
              <p className="text-sm text-mint-darker font-medium">Self Assessment</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-12 items-center">
            <figure className="flex justify-center">
              <img
                src="/images/app-1-1.png"
                alt={t('assessmentPage.self.imageAlt')}
                className="w-[260px] md:w-[320px] h-auto drop-shadow-xl"
                loading="lazy"
              />
            </figure>
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t('assessmentPage.self.desc1')}
              </p>
              <div className="bg-gray-50 rounded-2xl p-6 md:p-7 border border-gray-100">
                <p className="text-sm font-bold text-snpe-dark mb-4">{t('assessmentPage.self.itemTitle')}</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {selfItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={16} className="text-snpe-dark flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-600 leading-relaxed mt-6">
                {t('assessmentPage.self.desc2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center flex-shrink-0">
              <ClipboardCheck size={22} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">{t('assessmentPage.pro.title')}</h2>
              <p className="text-sm text-mint-darker font-medium">Professional Assessment</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            {t('assessmentPage.pro.desc1')}
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-6 md:p-7 border border-gray-100">
              <p className="text-sm font-bold text-snpe-dark mb-4">{t('assessmentPage.pro.systemTitle')}</p>
              <ul className="space-y-2.5">
                {proSystems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-snpe-dark flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-7 border border-gray-100">
              <p className="text-sm font-bold text-snpe-dark mb-4">{t('assessmentPage.pro.analysisTitle')}</p>
              <ul className="space-y-2.5">
                {proAnalysis.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-snpe-dark flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed mt-6">
            {t('assessmentPage.pro.desc2')}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-snpe-darker text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
            {t('assessmentPage.closing.title')}
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-6">
            {t('assessmentPage.closing.kicker')}
          </p>
          <p className="text-white/85 leading-relaxed max-w-2xl mx-auto">
            {t('assessmentPage.closing.body')}
          </p>
        </div>
      </section>
    </>
  )
}
