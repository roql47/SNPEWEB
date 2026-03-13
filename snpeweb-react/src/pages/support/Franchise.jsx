import PageBanner from '../../components/common/PageBanner'
import { CheckCircle, ArrowRight } from 'lucide-react'

const requirements = [
  'SNPE Level 2 이상 인증강사 자격 보유',
  'SNPE Level 1 자격 취득 예정자 우대',
  '석사 학위 이상 소지자 우대',
  'SNPE 교육자로서의 자질과 열정',
  '사업 운영 경험 또는 관련 역량 보유',
  'SNPE 철학과 비전에 대한 깊은 이해',
]

const steps = [
  { num: '01', title: '상담 신청', desc: '전화 또는 온라인으로 가맹 상담을 신청합니다.' },
  { num: '02', title: '자격 심사', desc: '인증강사 자격 및 사업 역량을 심사합니다.' },
  { num: '03', title: '교육 이수', desc: '센터 운영에 필요한 추가 교육을 이수합니다.' },
  { num: '04', title: '계약 체결', desc: '가맹 계약을 체결하고 센터를 개설합니다.' },
]

export default function Franchise() {
  return (
    <>
      <PageBanner
        title="가맹점 개설안내"
        subtitle="SNPE 전문센터 가맹점 개설 안내"
        breadcrumb={[{ label: '고객지원', path: '/search-center' }, { label: '가맹점 개설 & 인증점 계약 안내' }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          {/* Requirements */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">가맹 자격 요건</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {requirements.map((r, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                  <CheckCircle size={18} className="text-snpe flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">개설 절차</h2>
            <div className="flex flex-col md:flex-row items-stretch gap-4">
              {steps.map((s, i) => (
                <div key={i} className="flex-1 flex items-center gap-4">
                  <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                    <span className="text-3xl font-heading font-bold text-snpe/30">{s.num}</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2 mb-1">{s.title}</h3>
                    <p className="text-xs text-gray-500">{s.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <ArrowRight size={20} className="text-gray-300 hidden md:block flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-snpe text-white rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-xl font-bold mb-4">가맹 상담 문의</h3>
            <p className="text-white/80 mb-6">SNPE 전문센터 가맹에 관심이 있으시면 연락 주세요.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:02-539-2925" className="px-8 py-3 bg-white text-snpe-dark rounded-full font-medium hover:bg-gray-100 transition-colors">
                ☎ 02-539-2925
              </a>
              <a href="mailto:contact@mycuring.com" className="px-8 py-3 bg-white/20 text-white rounded-full font-medium hover:bg-white/30 transition-colors border border-white/30">
                ✉ contact@mycuring.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
