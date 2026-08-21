import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { dataStore } from '../../lib/dataStore'
import { MapPin, Building2, Bell, Newspaper, CalendarDays, RefreshCw, UserCheck, GraduationCap, HelpCircle, Inbox, Store } from 'lucide-react'

export default function AdminDashboard() {
  const [branches, setBranches] = useState([])
  const [centers, setCenters] = useState([])
  const [studios, setStudios] = useState([])
  const [notices, setNotices] = useState([])
  const [news, setNews] = useState([])
  const [activities, setActivities] = useState([])
  const [teachers, setTeachers] = useState([])
  const [educations, setEducations] = useState([])
  const [faqs, setFaqs] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [franchiseInquiries, setFranchiseInquiries] = useState([])

  useEffect(() => {
    dataStore.getBranches().then(setBranches).catch(() => setBranches([]))
    dataStore.getCenters().then(setCenters)
    dataStore.getStudios().then(setStudios)
    dataStore.getNotices().then(setNotices)
    dataStore.getNews().then(setNews)
    dataStore.getActivities().then(setActivities)
    dataStore.getTeachers().then(setTeachers)
    dataStore.getEducations().then(setEducations).catch(() => setEducations([]))
    dataStore.getFaqs().then(setFaqs).catch(() => setFaqs([]))
    dataStore.getInquiries().then(setInquiries).catch(() => setInquiries([]))
    dataStore.getFranchiseInquiries().then(setFranchiseInquiries).catch(() => setFranchiseInquiries([]))
  }, [])

  const newInquiries = inquiries.filter((i) => i.status === 'new').length + franchiseInquiries.filter((i) => i.status === 'new').length

  const cards = [
    {
      label: '신청·문의',
      count: inquiries.length + franchiseInquiries.length,
      badge: newInquiries > 0 ? `신규 ${newInquiries}` : null,
      icon: Inbox,
      to: '/admin/inquiries',
      color: 'bg-orange-500',
    },
    { label: '직영점', count: branches.length, icon: Store, to: '/admin/branches', color: 'bg-teal-500' },
    { label: '전문센터', count: centers.length, icon: MapPin, to: '/admin/centers', color: 'bg-blue-500' },
    { label: 'SNPE STUDIO', count: studios.length, icon: Building2, to: '/admin/studios', color: 'bg-purple-500' },
    { label: '인증강사', count: teachers.length, icon: UserCheck, to: '/admin/cert-teachers', color: 'bg-indigo-500' },
    { label: '교육과정', count: educations.length, icon: GraduationCap, to: '/admin/level-pages', color: 'bg-cyan-500' },
    { label: '공지사항', count: notices.length, icon: Bell, to: '/admin/notices', color: 'bg-amber-500' },
    { label: '언론보도', count: news.length, icon: Newspaper, to: '/admin/news', color: 'bg-green-500' },
    { label: '활동내역', count: activities.length, icon: CalendarDays, to: '/admin/activities', color: 'bg-rose-500' },
    { label: 'FAQ', count: faqs.length, icon: HelpCircle, to: '/admin/faqs', color: 'bg-slate-500' },
  ]

  const handleReset = async () => {
    if (window.confirm('모든 데이터를 초기 상태로 되돌립니다. 계속하시겠습니까?')) {
      await dataStore.resetAll()
      window.location.reload()
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
          <p className="text-sm text-gray-500 mt-1">SNPE 웹사이트 콘텐츠를 관리합니다</p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <RefreshCw size={14} />
          데이터 초기화
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="relative bg-white rounded-2xl p-6 hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className={`w-10 h-10 ${c.color} rounded-xl flex items-center justify-center mb-4`}>
              <c.icon size={20} className="text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{c.count}</p>
            <p className="text-sm text-gray-500 mt-1">{c.label}</p>
            {c.badge && (
              <span className="absolute top-4 right-4 inline-flex items-center px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-semibold">
                {c.badge}
              </span>
            )}
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">최근 공지사항</h2>
          <div className="space-y-3">
            {notices.slice(0, 5).map((n) => (
              <div key={n.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 truncate mr-4">
                  {n.pinned && <span className="text-amber-500 mr-1">📌</span>}
                  {n.title}
                </span>
                <span className="text-gray-400 flex-shrink-0">{n.date}</span>
              </div>
            ))}
            {notices.length === 0 && <p className="text-sm text-gray-400">공지사항이 없습니다.</p>}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">최근 언론보도</h2>
          <div className="space-y-3">
            {news.slice(0, 5).map((n) => (
              <div key={n.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 truncate mr-4">{n.title}</span>
                <span className="text-gray-400 flex-shrink-0">{n.date}</span>
              </div>
            ))}
            {news.length === 0 && <p className="text-sm text-gray-400">언론보도가 없습니다.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
