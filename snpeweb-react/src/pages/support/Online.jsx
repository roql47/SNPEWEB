import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Monitor, Users, Calendar, Clock } from 'lucide-react'

const courses = [
  {
    title: 'SNPE 입문반 (온라인)',
    type: '실시간',
    schedule: '매주 월/수 19:00-20:30',
    duration: '8주',
    price: '280,000원',
    desc: 'SNPE 기본동작 1~4번과 MOVE 동작을 배우는 온라인 입문 과정',
  },
  {
    title: 'SNPE 집중반 (온라인)',
    type: '실시간',
    schedule: '매주 화/목 10:00-11:30',
    duration: '12주',
    price: '420,000원',
    desc: 'SNPE 심화 동작과 도구 활용법을 학습하는 집중 과정',
  },
  {
    title: 'SNPE 셀프케어 (VOD)',
    type: '녹화',
    schedule: '수강 후 90일 이내',
    duration: '총 20강',
    price: '150,000원',
    desc: '언제 어디서나 따라할 수 있는 VOD 셀프케어 프로그램',
  },
  {
    title: 'Level 3 자격과정 (온라인)',
    type: '실시간',
    schedule: '분기별 개설',
    duration: '40시간',
    price: '별도 문의',
    desc: 'SNPE 인증강사 입문 자격 취득을 위한 온라인 교육 과정',
  },
]

export default function Online() {
  const [selectedType, setSelectedType] = useState('전체')
  const { t } = useTranslation()

  const filtered = selectedType === '전체' ? courses : courses.filter((c) => c.type === selectedType)

  return (
    <>
      <PageBanner
        title={t('pages.online')}
        subtitle={t('pages.onlineSub')}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-3 justify-center mb-10">
            {['전체', '실시간', '녹화'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedType(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === tab ? 'bg-snpe-darker text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab === '실시간' && <Monitor size={14} className="inline mr-1" />}
                {tab}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((c, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      c.type === '실시간' ? 'bg-snpe-dark/10 text-snpe-dark' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {c.type === '실시간' ? '🔴 실시간' : '📹 VOD'}
                    </span>
                    <span className="text-lg font-bold text-snpe-dark">{c.price}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{c.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{c.desc}</p>
                  <div className="space-y-2 text-xs text-gray-400">
                    <p className="flex items-center gap-2"><Calendar size={12} /> {c.schedule}</p>
                    <p className="flex items-center gap-2"><Clock size={12} /> {c.duration}</p>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <button className="w-full h-10 bg-snpe-darker text-white rounded-lg text-sm font-medium hover:bg-snpe-dark transition-colors">
                    수강 신청하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
