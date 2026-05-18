import { Navigate, Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../../contexts/AdminAuth'
import { LayoutDashboard, MapPin, Building2, Bell, Newspaper, CalendarDays, LogOut, Home, UserCheck, BookOpen, FileText, HelpCircle, GraduationCap, Inbox, Store, BookMarked } from 'lucide-react'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: '대시보드', end: true },
  { to: '/admin/inquiries', icon: Inbox, label: '신청·문의 관리', highlight: true },
  { to: '/admin/branches', icon: Store, label: '직영점 관리' },
  { to: '/admin/centers', icon: MapPin, label: '전문센터 관리' },
  { to: '/admin/studios', icon: Building2, label: 'STUDIO 관리' },
  { to: '/admin/cert-teachers', icon: UserCheck, label: '인증강사 관리' },
  { to: '/admin/educations', icon: GraduationCap, label: '교육과정 일정 관리' },
  { to: '/admin/degree-page', icon: BookMarked, label: '자격증 안내 페이지' },
  { to: '/admin/level-pages', icon: GraduationCap, label: 'LEVEL 1/2/3/Master 관리' },
  { to: '/admin/notices', icon: Bell, label: '공지사항 관리' },
  { to: '/admin/news', icon: Newspaper, label: '언론보도 관리' },
  { to: '/admin/activities', icon: CalendarDays, label: '활동내역 관리' },
  { to: '/admin/experience-cases', icon: BookOpen, label: '체험사례 관리' },
  { to: '/admin/research', icon: FileText, label: '연구논문 관리' },
  { to: '/admin/faqs', icon: HelpCircle, label: 'FAQ 관리' },
]

export default function AdminLayout() {
  const { admin, loading, logout } = useAdminAuth()
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full" />
      </div>
    )
  }

  if (!admin) return <Navigate to="/admin/login" replace />

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-60 bg-gray-900 text-white flex flex-col fixed inset-y-0 left-0 z-30">
        <div className="p-5 border-b border-white/10">
          <h1 className="text-lg font-bold">SNPE Admin</h1>
          <p className="text-xs text-gray-400 mt-0.5">{admin.id}</p>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive ? 'bg-white/15 text-white font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Home size={18} />
            <span>사이트 보기</span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            <span>로그아웃</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-60 p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}
