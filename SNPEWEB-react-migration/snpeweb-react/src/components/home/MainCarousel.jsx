const branchCards = [
  {
    name: '강남점',
    subtitle: '강남본원',
    href: 'https://map.naver.com/p/entry/place/1344095407?placePath=/home?entry=plt&from=map&fromPanelNum=1&additionalHeight=76&timestamp=202602271718&locale=ko&svcName=map_pcv5&searchType=place&lng=127.0393899&lat=37.5256155&c=15.00,0,0,0,dh',
  },
  {
    name: '대치점',
    subtitle: '대치본점',
    href: 'https://map.naver.com/p/entry/place/1203617850?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202602271720&locale=ko&svcName=map_pcv5',
  },
  {
    name: '잠실점',
    subtitle: '잠실본점',
    href: 'https://map.naver.com/p/entry/place/1172997051?c=15.00,0,0,0,dh&placePath=/home?fromPanelNum=1&additionalHeight=76&timestamp=202602271720&locale=ko&svcName=map_pcv5&additionalHeight=76&timestamp=202602271720&locale=ko&svcName=map_pcv5&fromPanelNum=1',
  },
]

export default function MainCarousel() {
  return (
    <section id="main-carousel" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">SNPE</h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            인간 본연의 자세로<br />
            회복을 지향하는<br />
            <span className="text-snpe font-semibold">새로운 패러다임의 운동법</span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branchCards.map((branch) => (
            <article
              key={branch.name}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow min-h-[280px] flex flex-col justify-between"
            >
              <div>
                <p className="text-sm text-gray-500 mb-2">{branch.subtitle}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{branch.name}</h3>
                <p className="text-sm text-gray-600">
                  직영점 에셋은 추후 교체 예정입니다.
                </p>
              </div>
              <a
                href={branch.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-5 py-2.5 rounded-full bg-snpe text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                네이버 지도 보기
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
