import { Link } from 'react-router-dom'
import { MapPin, ExternalLink } from 'lucide-react'

const branches = [
  {
    name: '강남점',
    subtitle: '강남본원',
    address: '서울시 강남구 봉은사로 68길 8, 4층',
    image: '/images/center1.png',
    mapUrl: 'https://map.naver.com/p/entry/place/1344095407',
  },
  {
    name: '대치점',
    subtitle: '대치본점',
    address: '서울시 강남구 역삼로 542, 2층',
    image: '/images/center2.png',
    mapUrl: 'https://map.naver.com/p/entry/place/1203617850',
  },
  {
    name: '잠실점',
    subtitle: '잠실본점',
    address: '서울시 송파구 올림픽로 289, 3층',
    image: '/images/center3.png',
    mapUrl: 'https://map.naver.com/p/entry/place/1172997051',
  },
]

export default function MainCarousel() {
  return (
    <section className="py-20 md:py-24 bg-mint-lighter/30">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-3">SNPE 직영점</h2>
          <p className="text-sm md:text-base text-gray-600">SNPE 본사 직영 센터에서 전문 수업을 만나보세요</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {branches.map((b) => (
            <a
              key={b.name}
              href={b.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-2xl overflow-hidden border border-mint-light/40 hover:shadow-xl hover:-translate-y-1 hover:border-mint transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={b.image}
                  alt={b.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-mint-darker text-white text-[11px] font-bold tracking-wider shadow-sm">
                  <MapPin size={11} /> 직영
                </span>
              </div>
              <div className="p-5 flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1">{b.name}</h3>
                  <p className="text-xs md:text-sm text-gray-500 truncate">{b.address}</p>
                </div>
                <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-mint-darker text-white flex items-center justify-center group-hover:bg-mint-dark transition-colors">
                  <ExternalLink size={14} />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/search-center"
            className="inline-flex items-center gap-2 px-6 py-3 border border-mint-darker rounded-full text-sm text-mint-darker font-medium hover:bg-mint-darker hover:text-white transition-all"
          >
            <MapPin size={16} /> 전국 전문센터 찾기
          </Link>
        </div>
      </div>
    </section>
  )
}
