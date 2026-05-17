import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { dataStore } from '../../lib/dataStore'

const STORAGE_KEY = 'noticePopupHiddenUntil'
// '다시 보지 않기' 영구 숨김 sentinel (timestamp 비교 시 항상 미래)
const FOREVER = Number.MAX_SAFE_INTEGER

// localStorage에서 숨김 정보 읽기 → { [noticeId]: timestamp | FOREVER }
const readHiddenMap = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

const writeHiddenMap = (map) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
  } catch {
    // 저장 실패 시 무시
  }
}

export default function NoticePopup() {
  const [popup, setPopup] = useState(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const list = await dataStore.getActivePopupNotices()
        if (cancelled || !list || list.length === 0) return

        const hidden = readHiddenMap()
        const now = Date.now()
        // 만료되지 않은 첫 번째 공지를 채택
        const target = list.find((n) => !hidden[n.id] || hidden[n.id] < now)
        if (target) setPopup(target)
      } catch (e) {
        // Supabase 응답 오류 시 조용히 무시 (사이트 동작에 영향 없음)
        console.warn('[NoticePopup] load failed:', e)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const close = () => setPopup(null)

  const closeForToday = () => {
    if (!popup) return
    const map = readHiddenMap()
    const tomorrow = new Date()
    tomorrow.setHours(23, 59, 59, 999)
    map[popup.id] = tomorrow.getTime()
    writeHiddenMap(map)
    setPopup(null)
  }

  const closeForever = () => {
    if (!popup) return
    const map = readHiddenMap()
    map[popup.id] = FOREVER
    writeHiddenMap(map)
    setPopup(null)
  }

  const handleContentClick = () => {
    if (popup?.popup_link_url) {
      window.open(popup.popup_link_url, '_blank', 'noopener,noreferrer')
    }
  }

  if (!popup) return null

  const hasImage = !!popup.popup_image_url
  const hasLink = !!popup.popup_link_url

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4 animate-[fadeIn_.2s_ease-out]"
      onClick={close}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-[90vw] max-w-[480px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="닫기"
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>

        {hasImage ? (
          <div
            className={hasLink ? 'cursor-pointer' : ''}
            onClick={hasLink ? handleContentClick : undefined}
          >
            <img
              src={popup.popup_image_url}
              alt={popup.title}
              className="w-full h-auto block"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            {(popup.title || popup.content) && (
              <div className="p-5 border-t border-gray-100">
                {popup.title && (
                  <h2 className="text-base font-bold text-gray-900 mb-1">{popup.title}</h2>
                )}
                {popup.content && (
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line line-clamp-3">
                    {popup.content}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div
            className={`p-8 ${hasLink ? 'cursor-pointer' : ''}`}
            onClick={hasLink ? handleContentClick : undefined}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-3 pr-8">{popup.title}</h2>
            {popup.content && (
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {popup.content}
              </p>
            )}
            {popup.date && (
              <p className="mt-4 text-xs text-gray-400">{popup.date}</p>
            )}
          </div>
        )}

        <div className="flex border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={closeForever}
            className="flex-1 py-3.5 text-xs sm:text-sm text-gray-500 hover:bg-gray-100 transition-colors"
          >
            다시 보지 않기
          </button>
          <button
            onClick={closeForToday}
            className="flex-1 py-3.5 text-xs sm:text-sm text-gray-500 hover:bg-gray-100 border-l border-gray-100 transition-colors"
          >
            오늘 하루 보지 않기
          </button>
          <button
            onClick={close}
            className="flex-1 py-3.5 text-xs sm:text-sm font-medium text-snpe-dark hover:bg-snpe/10 border-l border-gray-100 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
