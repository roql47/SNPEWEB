import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { MapPin, Calendar, Users } from 'lucide-react'

export default function CultureCenter() {
  const { t } = useTranslation()

  return (
    <>
      <PageBanner
        title={t('pages.cultureCenter')}
        subtitle={t('pages.cultureCenterSub')}
        breadcrumb={[{ label: t('nav.education'), path: '/degree' }, { label: t('pages.cultureCenter') }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">지역사회와 함께하는 SNPE</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              전국 문화센터 및 주민자치센터에서 SNPE 바른자세 운동을 수강하실 수 있습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: MapPin, title: '전국 운영', desc: '서울, 경기, 부산 등 전국 주요 문화센터에서 운영 중' },
              { icon: Calendar, title: '정기 수업', desc: '분기별 수강 등록, 주 1~2회 정기 수업 진행' },
              { icon: Users, title: '소그룹 수업', desc: '10~20명 소규모 인원으로 밀착 지도' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-snpe-dark/10 text-snpe-dark flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-snpe-darker text-white rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-xl font-bold mb-4">가까운 문화센터 찾기</h3>
            <p className="text-white/80 mb-6">SNPE 수업이 진행되는 문화센터를 검색해 보세요.</p>
            <a href="/search-center" className="inline-block px-8 py-3 bg-white text-snpe-dark rounded-full font-medium hover:bg-gray-100 transition-colors">
              전문센터 검색 →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
