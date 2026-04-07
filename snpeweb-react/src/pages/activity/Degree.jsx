import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { BookOpen, Users, Target, Layers } from 'lucide-react'

const features = [
  { title: '체계적인 단계별 교육 시스템', desc: 'LEVEL 1부터 LEVEL 3까지 단계적으로 구성되어 운동 이해부터 지도 역량까지 체계적으로 학습할 수 있습니다.', icon: Layers },
  { title: '이론과 실습이 결합된 교육', desc: '신체 구조와 운동 원리를 이론으로 이해하고 실제 동작 실습을 통해 몸의 변화를 경험하며 학습합니다.', icon: BookOpen },
  { title: '티칭 중심 지도자 교육', desc: 'LEVEL 2부터는 실제 지도 상황을 중심으로 티칭 방법을 배우며 지도자로서 필요한 교육 역량을 강화합니다.', icon: Users },
  { title: '현장에서 활용 가능한 실전 교육', desc: '센터 수업, 그룹 수업, 개인 지도 등 실제 현장에서 활용할 수 있는 운동 지도 방법을 중심으로 교육이 진행됩니다.', icon: Target },
]

const roadmap = [
  { level: 'LEVEL 1', name: 'SNPE 기초 수료 과정', desc: '운동 원리 및 기본 동작 이해', path: '/level1' },
  { level: 'LEVEL 2', name: 'SNPE 지도자 자격 과정', desc: '티칭 중심 지도자 교육', path: '/level2' },
  { level: 'LEVEL 3', name: 'SNPE 전문가 과정', desc: '지도 역량 심화 교육', path: '/level3' },
]

const scheduleRows = [
  { course: 'LEVEL 1', period: '2026.00.00 ~ 2026.00.00', days: '주 2회', status: '모집중', action: '신청하기' },
  { course: 'LEVEL 2', period: '2026.00.00 ~ 2026.00.00', days: '주 1회', status: '모집예정', action: '준비중' },
  { course: 'LEVEL 3', period: '2026.00.00 ~ 2026.00.00', days: '주 1회', status: '모집중', action: '신청하기' },
]

export default function Degree() {
  const { t } = useTranslation()

  return (
    <>
      <PageBanner
        title={t('pages.degree')}
        subtitle={t('pages.degreeSub')}
        breadcrumb={[{ label: t('nav.education'), path: '/degree' }, { label: t('pages.degree') }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 space-y-20">

          {/* Intro */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">SNPE 교육 소개</h2>
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
              SNPE 교육은 신체의 구조적 균형을 이해하고 올바른 움직임을 통해 건강한 몸을 만들어가는 교육 프로그램입니다.
              <br />
              단순한 운동 방법을 배우는 것을 넘어, 신체 구조와 움직임의 원리를 이해하고 스스로 몸을 관리할 수 있도록 돕는 것을 목표로 합니다.
            </p>
          </div>

          {/* Philosophy */}
          <div className="bg-gray-50 rounded-3xl p-8 md:p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-5">SNPE 교육 철학</h3>
            <ul className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
              <li className="flex items-start gap-2.5"><span className="mt-1.5 w-2 h-2 rounded-full bg-snpe-dark flex-shrink-0" />신체의 구조적 균형을 회복하고 건강한 움직임을 통해 몸을 관리할 수 있도록 돕는 것을 목표로 합니다.</li>
              <li className="flex items-start gap-2.5"><span className="mt-1.5 w-2 h-2 rounded-full bg-snpe-dark flex-shrink-0" />올바른 자세 인식과 신체 사용 방법을 이해하고 실천할 수 있도록 이론과 실습을 함께 교육합니다.</li>
              <li className="flex items-start gap-2.5"><span className="mt-1.5 w-2 h-2 rounded-full bg-snpe-dark flex-shrink-0" />예방 중심의 건강관리 철학을 바탕으로 지속 가능한 신체 관리 방법을 제시합니다.</li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">SNPE 교육 특징</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4 p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center flex-shrink-0">
                    <f.icon size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{f.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Target */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-5">SNPE 교육 대상</h3>
            <p className="text-gray-600 mb-4">SNPE 교육은 운동을 체계적으로 배우고 싶은 분부터 전문 지도자를 목표로 하는 분까지 다양한 분들이 참여할 수 있습니다.</p>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <ul className="space-y-2.5 text-sm md:text-base text-gray-700">
                {[
                  'SNPE 운동을 체계적으로 배우고 싶은 분',
                  '자신의 자세와 신체 균형을 이해하고 관리하고 싶은 분',
                  '건강 관리 및 운동 분야에 관심이 있는 분',
                  '운동 지도자로 활동하고 싶은 분',
                  '기존 운동 지도 경험에 전문성을 더하고 싶은 분',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span className="text-snpe-dark mt-0.5">✓</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Roadmap */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-5 text-center">SNPE 교육 구조</h3>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              LEVEL 1 → LEVEL 2 → LEVEL 3 순으로 교육이 진행되며, 운동의 이해부터 지도 역량까지 단계적으로 학습할 수 있도록 설계되어 있습니다.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {roadmap.map((r, i) => (
                <Link
                  key={r.level}
                  to={r.path}
                  className="relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-snpe-dark hover:shadow-lg transition-all group"
                >
                  <span className="text-xs font-bold text-snpe-dark">{r.level}</span>
                  <h4 className="text-lg font-bold text-gray-900 mt-2 mb-2 group-hover:text-snpe-dark transition-colors">{r.name}</h4>
                  <p className="text-sm text-gray-500">{r.desc}</p>
                  {i < roadmap.length - 1 && (
                    <span className="hidden md:block absolute top-1/2 -right-4 text-gray-300 text-xl">→</span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-5">교육 일정 및 신청</h3>
            <p className="text-sm text-gray-500 mb-4">교육 일정은 운영 상황에 따라 변경될 수 있습니다.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-700">
                    <th className="text-left px-4 py-3 font-semibold rounded-tl-xl">과정</th>
                    <th className="text-left px-4 py-3 font-semibold">교육 기간</th>
                    <th className="text-left px-4 py-3 font-semibold">교육 요일</th>
                    <th className="text-center px-4 py-3 font-semibold">모집 상태</th>
                    <th className="text-center px-4 py-3 font-semibold rounded-tr-xl">신청</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleRows.map((r) => (
                    <tr key={r.course} className="border-b border-gray-100 last:border-0">
                      <td className="px-4 py-3.5 font-medium text-gray-900">{r.course}</td>
                      <td className="px-4 py-3.5 text-gray-600">{r.period}</td>
                      <td className="px-4 py-3.5 text-gray-600">{r.days}</td>
                      <td className="px-4 py-3.5 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${r.status === '모집중' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <span className={`text-xs font-medium ${r.action === '신청하기' ? 'text-snpe-dark underline cursor-pointer' : 'text-gray-400'}`}>
                          {r.action}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Career & Contact */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
              <h4 className="font-bold text-gray-900 mb-3">교육 후 진로</h4>
              <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                <li>• SNPE 센터 강의, 그룹 운동 지도, 개인 운동 지도 등 다양한 형태로 활동 가능</li>
                <li>• SNPE 운동을 기반으로 건강 관리와 운동 교육 분야 전문성 확장</li>
                <li>• 지속적인 교육과 경험을 통해 전문 지도자로 성장</li>
              </ul>
            </div>
            <div className="bg-snpe-dark/10 rounded-2xl p-6 md:p-8">
              <h4 className="font-bold text-gray-900 mb-3">문의 안내</h4>
              <p className="text-sm text-gray-600 mb-3">교육 과정 관련 문의는 아래 채널을 통해 가능합니다.</p>
              <ul className="space-y-1.5 text-sm text-gray-700">
                <li>• 교육 운영팀 문의</li>
                <li>• 이메일 : <a href="mailto:contact@mycuring.com" className="text-snpe-dark underline">contact@mycuring.com</a></li>
                <li>• 전화 : 02-539-2925</li>
                <li className="text-gray-500 pt-1">상담 가능 시간 : 평일 10:00 ~ 16:00</li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
