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
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">SNPE 직영점</h2>
          <p className="text-sm text-gray-500">SNPE 본사 직영 센터에서 전문 수업을 만나보세요</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {branches.map((b) => (
            <div
              key={b.name}
              className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-snpe-dark/10 text-snpe-dark flex items-center justify-center flex-shrink-0">
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
                className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
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
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-full text-sm text-gray-700 font-medium hover:border-snpe-dark hover:text-snpe-dark transition-colors"
          >
            <MapPin size={16} /> 전국 전문센터 찾기
          </Link>
        </div>
      </div>
    </section>
  )
}
