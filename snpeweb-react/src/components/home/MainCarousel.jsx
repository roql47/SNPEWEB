import { Link } from 'react-router-dom'
import { MapPin, ExternalLink } from 'lucide-react'

const branches = [
  {
    name: '강남점',
    subtitle: '강남본원',
    address: '서울시 강남구 봉은사로 68길 8, 4층',
    mapUrl: 'https://map.naver.com/p/entry/place/1344095407',
  },
  {
    name: '대치점',
    subtitle: '대치본점',
    address: '서울시 강남구 역삼로 542, 2층',
    mapUrl: 'https://map.naver.com/p/entry/place/1203617850',
  },
  {
    name: '잠실점',
    subtitle: '잠실본점',
    address: '서울시 송파구 올림픽로 289, 3층',
    mapUrl: 'https://map.naver.com/p/entry/place/1172997051',
  },
]

export default function MainCarousel() {
  return (
    <section className="py-20 md:py-24 bg-mint-lighter/30">
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-10">
          <p className="text-mint-darker text-xs md:text-sm font-semibold uppercase tracking-[0.25em] mb-3">
            Studios
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-3">SNPE 직영점</h2>
          <p className="text-sm md:text-base text-gray-600">SNPE 본사 직영 센터에서 전문 수업을 만나보세요</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {branches.map((b) => (
            <div
              key={b.name}
              className="bg-white border border-mint-light/60 rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg hover:border-mint transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-mint-lighter text-mint-darker flex items-center justify-center flex-shrink-0">
                <MapPin size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm">{b.name}</h3>
                <p className="text-xs text-gray-500 truncate">{b.address}</p>
              </div>
              <a
                href={b.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-9 h-9 rounded-xl bg-mint-darker text-white flex items-center justify-center hover:bg-mint-dark transition-colors"
                title="지도 보기"
              >
                <ExternalLink size={14} />
              </a>
            </div>
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
