import PageBanner from '../../components/common/PageBanner'
import { Building2, Users, Clock, CheckCircle } from 'lucide-react'

export default function CompanyClass() {
  return (
    <>
      <PageBanner
        title="기업 특강"
        subtitle="직장인을 위한 SNPE 바른자세 특강 프로그램"
        breadcrumb={[{ label: '교육과정', path: '/degree' }, { label: '기업 특강' }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">기업 맞춤형 건강 프로그램</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              장시간 사무직 근무로 인한 근골격계 질환 예방과 건강 증진을 위한
              SNPE 바른자세 기업 특강을 제공합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Building2, title: '방문 특강', desc: '기업체 방문하여 진행하는 맞춤형 특강' },
              { icon: Users, title: '그룹 수업', desc: '10~50명 규모의 소그룹/대그룹 수업' },
              { icon: Clock, title: '정기 프로그램', desc: '주 1~2회 정기적 운동 프로그램' },
              { icon: CheckCircle, title: '성과 측정', desc: 'APP 기반 자세분석으로 효과 측정' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-snpe/10 text-snpe flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-snpe/5 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">기업 특강 문의</h3>
            <p className="text-gray-600 mb-6">맞춤형 프로그램 상담이 필요하시면 연락주세요.</p>
            <a href="tel:02-539-2925" className="inline-block px-8 py-3 bg-snpe text-white rounded-full font-medium hover:bg-snpe-dark transition-colors">
              ☎ 02-539-2925
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
