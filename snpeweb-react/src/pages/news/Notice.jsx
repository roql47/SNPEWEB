import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { dataStore } from '../../lib/dataStore'
import { sanitizeHtml } from '../../lib/sanitize'
import { ChevronDown, Pin } from 'lucide-react'

export default function Notice() {
  const { t } = useTranslation()
  const [notices, setNotices] = useState([])
  const [openId, setOpenId] = useState(null)
  useEffect(() => { dataStore.getNotices().then(setNotices) }, [])

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <>
      <PageBanner
        title={t('pages.notice')}
        subtitle={t('pages.noticeSub')}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="hidden md:grid grid-cols-[1fr_120px_40px] bg-gray-50 text-sm font-medium text-gray-500 px-6 py-3 border-b">
              <span>제목</span>
              <span className="text-center">날짜</span>
              <span />
            </div>
            {notices.map((n) => {
              const open = openId === n.id
              const html = n.content_html ? sanitizeHtml(n.content_html) : ''
              const text = (n.content || '').trim()
              return (
                <div key={n.id} className="border-b border-gray-100 last:border-0">
                  <button
                    type="button"
                    onClick={() => toggle(n.id)}
                    aria-expanded={open}
                    className={`w-full text-left grid grid-cols-[1fr_auto] md:grid-cols-[1fr_120px_40px] px-6 py-4 transition-colors ${
                      open ? 'bg-snpe/5' : 'hover:bg-snpe/5'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {n.pinned && <Pin size={14} className="text-snpe-dark flex-shrink-0" />}
                      <span className={`text-sm ${n.pinned ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                        {n.title}
                      </span>
                    </span>
                    <span className="hidden md:block text-xs text-gray-400 text-center self-center">{n.date}</span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 self-center justify-self-end transition-transform ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                    <span className="md:hidden col-span-2 text-xs text-gray-400 mt-1">{n.date}</span>
                  </button>
                  {open && (
                    <div className="px-6 pb-6 pt-1 bg-snpe/5">
                      {html ? (
                        <div
                          className="rt-content text-sm text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      ) : text ? (
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{text}</p>
                      ) : (
                        <p className="text-sm text-gray-400">등록된 상세 내용이 없습니다.</p>
                      )}
                      {n.popup_link_url && (
                        <a
                          href={n.popup_link_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-4 px-5 py-2.5 rounded-full bg-snpe-darker text-white text-sm font-medium hover:bg-snpe-dark transition-colors"
                        >
                          자세히 보기
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
            {notices.length === 0 && (
              <div className="px-6 py-12 text-center text-gray-400 text-sm">등록된 공지사항이 없습니다.</div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
