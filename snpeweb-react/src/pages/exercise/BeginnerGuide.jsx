import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Link } from 'react-router-dom'
import { toolGroups, getToolsByGroup } from '../../data/tools'

const steps = [
  {
    num: '01',
    titleKey: 'beginnerGuidePage.steps.1.title',
    descKey: 'beginnerGuidePage.steps.1.desc',
    link: '/about',
  },
  {
    num: '02',
    titleKey: 'beginnerGuidePage.steps.2.title',
    descKey: 'beginnerGuidePage.steps.2.desc',
    link: '/snpeapp',
  },
  {
    num: '03',
    titleKey: 'beginnerGuidePage.steps.3.title',
    descKey: 'beginnerGuidePage.steps.3.desc',
    link: '/baseexercise',
  },
  {
    num: '04',
    titleKey: 'beginnerGuidePage.steps.4.title',
    descKey: 'beginnerGuidePage.steps.4.desc',
    link: '/snpevideo',
  },
  {
    num: '05',
    titleKey: 'beginnerGuidePage.steps.5.title',
    descKey: 'beginnerGuidePage.steps.5.desc',
    link: '/search-center',
  },
]

function ToolCard({ tool, t }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-snpe/30 transition-all group">
      <div className="aspect-square w-full bg-gray-50 overflow-hidden">
        <img
          src={tool.img}
          alt={t(tool.nameKey)}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h4 className="text-base md:text-lg font-bold text-gray-900 mb-2 group-hover:text-snpe-dark transition-colors">
          {t(tool.nameKey)}
        </h4>
        <p className="text-sm text-gray-500 leading-relaxed">
          {t(tool.descKey)}
        </p>
      </div>
    </div>
  )
}

export default function BeginnerGuide() {
  const { t } = useTranslation()

  return (
    <>
      <PageBanner
        title={t('pages.beginnerGuide')}
        subtitle={t('pages.beginnerGuideSub')}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('beginnerGuidePage.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('beginnerGuidePage.intro')}
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((s, i) => (
              <Link
                key={i}
                to={s.link}
                className="flex items-start gap-6 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-snpe/30 transition-all group"
              >
                <span className="flex-shrink-0 text-4xl md:text-5xl font-heading font-bold text-snpe/20 group-hover:text-snpe-dark/40 transition-colors">
                  {s.num}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-snpe-dark transition-colors">
                    {t(s.titleKey)}
                  </h3>
                  <p className="text-sm text-gray-500">{t(s.descKey)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('pages.tools.sectionTitle')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('pages.tools.intro')}
            </p>
          </div>

          {toolGroups.map((group) => {
            const items = getToolsByGroup(group.id)
            return (
              <div key={group.id} className="mb-16 last:mb-0">
                <div className="mb-8 md:mb-10">
                  <h3 className="text-2xl font-bold text-snpe-dark mb-2">
                    {t(group.titleKey)}
                  </h3>
                  <p className="text-sm md:text-base text-gray-500">
                    {t(group.subKey)}
                  </p>
                  <div className="mt-3 h-1 w-12 bg-snpe rounded-full" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                  {items.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} t={t} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
