import PageBanner from '../../components/common/PageBanner'
import { Smartphone, Camera, BarChart3, Dumbbell } from 'lucide-react'

export default function SnpeApp() {
  return (
    <>
      <PageBanner
        title="셀프 체형분석"
        subtitle="SNPE APP으로 나의 자세를 분석해 보세요"
        breadcrumb={[{ label: '운동 정보', path: '/beginnerguide' }, { label: '셀프 체형분석' }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/images/app-1-1.png"
                alt="SNPE App"
                className="w-[240px] md:w-[300px] drop-shadow-xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">AI 자세분석</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                SNPE 앱의 AI 자세분석 기능을 통해 나의 체형 상태를 정확하게 측정하고,
                개인 맞춤형 운동 프로그램을 제공받을 수 있습니다.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Camera, title: '촬영 분석', desc: '사진 촬영으로 자세 분석' },
                  { icon: BarChart3, title: '결과 리포트', desc: '상세한 분석 결과 제공' },
                  { icon: Dumbbell, title: '맞춤 운동', desc: '개인별 운동 프로그램' },
                  { icon: Smartphone, title: '기록 관리', desc: '변화 추이 모니터링' },
                ].map((f, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4">
                    <f.icon size={20} className="text-snpe mb-2" />
                    <h3 className="text-sm font-bold text-gray-900">{f.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://play.google.com/store/apps/details?id=com.snpe.Android"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              Google Play 다운로드
            </a>
            <a
              href="https://itunes.apple.com/app/id1303149719"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              App Store 다운로드
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
