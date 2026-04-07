import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { dataStore } from '../../lib/dataStore'
import { Pin } from 'lucide-react'

export default function Notice() {
  const { t } = useTranslation()
  const notices = dataStore.getNotices()

  return (
    <>
      <PageBanner
        title={t('pages.notice')}
        subtitle={t('pages.noticeSub')}
        breadcrumb={[{ label: t('nav.news'), path: '/notice' }, { label: t('pages.notice') }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="hidden md:grid grid-cols-[1fr_120px] bg-gray-50 text-sm font-medium text-gray-500 px-6 py-3 border-b">
              <span>제목</span>
              <span className="text-center">날짜</span>
            </div>
            {notices.map((n) => (
              <div
                key={n.id}
                className="grid grid-cols-1 md:grid-cols-[1fr_120px] px-6 py-4 border-b border-gray-100 last:border-0 hover:bg-snpe/5 transition-colors"
              >
                <span className="flex items-center gap-2">
                  {n.pinned && <Pin size={14} className="text-snpe-dark flex-shrink-0" />}
                  <span className={`text-sm ${n.pinned ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                    {n.title}
                  </span>
                </span>
                <span className="text-xs text-gray-400 md:text-center mt-1 md:mt-0">{n.date}</span>
              </div>
            ))}
            {notices.length === 0 && (
              <div className="px-6 py-12 text-center text-gray-400 text-sm">등록된 공지사항이 없습니다.</div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
