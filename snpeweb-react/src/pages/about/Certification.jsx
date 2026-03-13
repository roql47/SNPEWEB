import PageBanner from '../../components/common/PageBanner'
import { Award, Shield, FileCheck, Handshake } from 'lucide-react'

const certifications = [
  { year: '2019', items: [
    { icon: Award, title: '대한민국 브랜드대상', desc: '건강/운동 부문 대상 수상' },
    { icon: Handshake, title: '건강한삶학회 설립', desc: '제1회 학술대회 개최' },
  ]},
  { year: '2018', items: [
    { icon: FileCheck, title: '바른자세벨트 특허', desc: '특허 제10-XXXXXXX호' },
    { icon: FileCheck, title: '웨이브베개 특허', desc: '특허 제10-XXXXXXX호' },
    { icon: Shield, title: '벤처기업 인증', desc: '중소벤처기업부 인증' },
  ]},
  { year: '2017', items: [
    { icon: Award, title: '전문센터 50개소 돌파', desc: '전국 네트워크 확대' },
  ]},
]

export default function Certification() {
  return (
    <>
      <PageBanner
        title="수상 및 인증"
        subtitle="SNPE의 수상 이력과 인증 현황"
        breadcrumb={[{ label: 'SNPE 운동이란?', path: '/about' }, { label: '특허인증(?)' }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          {certifications.map((group) => (
            <div key={group.year} className="mb-12">
              <h3 className="text-2xl font-bold text-snpe mb-6 flex items-center gap-3">
                <span className="w-12 h-12 rounded-full bg-snpe text-white flex items-center justify-center text-sm font-bold">
                  {group.year.slice(2)}
                </span>
                {group.year}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ml-0 md:ml-16">
                {group.items.map((item, j) => (
                  <div key={j} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-snpe/10 text-snpe flex items-center justify-center">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
