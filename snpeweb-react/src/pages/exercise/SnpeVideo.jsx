import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Play, Clock, Eye } from 'lucide-react'

const videos = [
  { title: 'SNPE 기본동작 1번 - 의자 자세', duration: '15:30', views: '12.5만', category: '기본동작' },
  { title: 'SNPE 기본동작 2번 - 뒤로 눕기', duration: '18:20', views: '9.8만', category: '기본동작' },
  { title: 'SNPE 기본동작 3번 - 다리 들기', duration: '12:45', views: '8.2만', category: '기본동작' },
  { title: 'SNPE 기본동작 4번 - 구르기', duration: '10:15', views: '7.1만', category: '기본동작' },
  { title: 'C-MOVE 경추 운동', duration: '8:30', views: '5.3만', category: 'MOVE' },
  { title: 'L-MOVE 요추 운동', duration: '9:45', views: '4.8만', category: 'MOVE' },
  { title: '바른자세벨트 착용법', duration: '5:20', views: '15.2만', category: '도구' },
  { title: 'SNPE 웨이브베개 사용법', duration: '7:10', views: '6.7만', category: '도구' },
]

export default function SnpeVideo() {
  const { t } = useTranslation()

  return (
    <>
      <PageBanner
        title={t('pages.snpeVideo')}
        subtitle={t('pages.snpeVideoSub')}
        breadcrumb={[{ label: t('nav.exercise'), path: '/beginnerguide' }, { label: t('pages.snpeVideo') }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">운동 영상 목록</h2>
            <a
              href="https://www.youtube.com/c/SNPElife"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-snpe-dark font-medium hover:underline"
            >
              YouTube 채널 →
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((v, i) => (
              <a
                key={i}
                href="https://www.youtube.com/c/SNPElife"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative bg-gray-200 aspect-video flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-snpe-darker/80 text-white flex items-center justify-center group-hover:bg-snpe-darker transition-colors">
                    <Play size={20} fill="white" />
                  </div>
                  <span className="absolute top-2 right-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded">
                    {v.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">{v.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Clock size={12} /> {v.duration}</span>
                    <span className="flex items-center gap-1"><Eye size={12} /> {v.views}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
