import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import AdminNews from './AdminNews'
import AdminActivities from './AdminActivities'

const TABS = [
  { value: 'activity', label: '활동소식' },
  { value: 'press', label: '언론보도' },
]

// 언론보도(news) + 활동내역(activities)을 하나의 페이지에서 탭으로 관리
// 데이터 테이블은 그대로 유지하고, 화면만 통합합니다.
export default function AdminActivityFeed() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialTab = searchParams.get('tab') === 'press' ? 'press' : 'activity'
  const [tab, setTab] = useState(initialTab)

  useEffect(() => {
    const urlTab = searchParams.get('tab') === 'press' ? 'press' : 'activity'
    if (urlTab !== tab) setTab(urlTab)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const changeTab = (next) => {
    setTab(next)
    const params = new URLSearchParams(searchParams)
    if (next === 'press') params.set('tab', 'press')
    else params.delete('tab')
    setSearchParams(params, { replace: true })
  }

  return (
    <div>
      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-6 w-fit">
        {TABS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => changeTab(opt.value)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              tab === opt.value ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {tab === 'activity' ? <AdminActivities /> : <AdminNews />}
    </div>
  )
}
