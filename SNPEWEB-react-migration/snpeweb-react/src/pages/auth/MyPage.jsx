import { Link } from 'react-router-dom'
import PageBanner from '../../components/common/PageBanner'
import { User, BookOpen, Award, Settings, LogOut } from 'lucide-react'

export default function MyPage() {
  const isLoggedIn = false

  if (!isLoggedIn) {
    return (
      <section className="py-24 md:py-32 bg-gray-50 min-h-[60vh] flex items-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-6">
            <User size={32} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">로그인이 필요합니다</h2>
          <p className="text-gray-600 mb-8">마이페이지를 이용하시려면 먼저 로그인해 주세요.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/login" className="px-6 py-2.5 bg-snpe text-white rounded-lg font-medium hover:bg-snpe-dark transition-colors">
              로그인
            </Link>
            <Link to="/provision" className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              회원가입
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <PageBanner title="마이페이지" breadcrumb={[{ label: '마이페이지' }]} />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          {/* Profile card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-8 flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-snpe/10 flex items-center justify-center">
              <User size={32} className="text-snpe" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">홍길동</h2>
              <p className="text-sm text-gray-500">example@email.com</p>
            </div>
          </div>

          {/* Menu grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: BookOpen, title: '수강 내역', desc: '수강 중인 과정 확인', count: '2개' },
              { icon: Award, title: '자격 현황', desc: '인증강사 자격 정보', count: '-' },
              { icon: Settings, title: '정보 수정', desc: '개인정보 변경', count: '' },
              { icon: LogOut, title: '로그아웃', desc: '안전하게 로그아웃', count: '' },
            ].map((m, i) => (
              <button key={i} className="bg-white border border-gray-100 rounded-xl p-6 text-left hover:shadow-md hover:border-snpe/30 transition-all group">
                <m.icon size={24} className="text-gray-400 group-hover:text-snpe transition-colors mb-3" />
                <h3 className="font-bold text-gray-900 text-sm mb-1">{m.title}</h3>
                <p className="text-xs text-gray-400">{m.desc}</p>
                {m.count && <span className="text-xs text-snpe font-medium mt-2 block">{m.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
