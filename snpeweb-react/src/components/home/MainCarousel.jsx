import { useTranslation } from 'react-i18next'

const branchCards = [
  {
    nameKey: '강남점',
    subtitleKey: '강남본원',
    href: 'https://map.naver.com/p/entry/place/1344095407?placePath=/home?entry=plt&from=map&fromPanelNum=1&additionalHeight=76&timestamp=202602271718&locale=ko&svcName=map_pcv5&searchType=place&lng=127.0393899&lat=37.5256155&c=15.00,0,0,0,dh',
  },
  {
    nameKey: '대치점',
    subtitleKey: '대치본점',
    href: 'https://map.naver.com/p/entry/place/1203617850?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202602271720&locale=ko&svcName=map_pcv5',
  },
  {
    nameKey: '잠실점',
    subtitleKey: '잠실본점',
    href: 'https://map.naver.com/p/entry/place/1172997051?c=15.00,0,0,0,dh&placePath=/home?fromPanelNum=1&additionalHeight=76&timestamp=202602271720&locale=ko&svcName=map_pcv5&additionalHeight=76&timestamp=202602271720&locale=ko&svcName=map_pcv5&fromPanelNum=1',
  },
]

export default function MainCarousel() {
  const { t } = useTranslation()

  return (
    <section id="main-carousel" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('home.snpeTitle')}</h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {t('home.snpeDesc1')}<br />
            {t('home.snpeDesc2')}<br />
            <span className="text-snpe-dark font-semibold">{t('home.snpeAccent')}</span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branchCards.map((branch) => (
            <article
              key={branch.nameKey}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow min-h-[280px] flex flex-col justify-between"
            >
              <div>
                <p className="text-sm text-gray-500 mb-2">{branch.subtitleKey}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{branch.nameKey}</h3>
              </div>
              <a
                href={branch.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-5 py-2.5 rounded-full bg-snpe-darker text-white text-sm font-medium hover:bg-snpe-dark transition-colors"
              >
                {t('home.naverMap')}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
