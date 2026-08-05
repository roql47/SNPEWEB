import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { dataStore } from '../../lib/dataStore'
import { sanitizeHtml } from '../../lib/sanitize'

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
  const { t } = useTranslation()
  const [popup, setPopup] = useState(null)
  const [pos, setPos] = useState(null) // { x, y } — null이면 가운데 정렬
  const dragRef = useRef(null)
  const dragState = useRef({ startX: 0, startY: 0, origX: 0, origY: 0, dragging: false })

  // 드래그 시작
  const onDragStart = (e) => {
    const evt = e.touches ? e.touches[0] : e
    const rect = dragRef.current?.getBoundingClientRect()
    if (!rect) return
    dragState.current = {
      startX: evt.clientX,
      startY: evt.clientY,
      origX: rect.left,
      origY: rect.top,
      dragging: true,
    }
    document.body.style.userSelect = 'none'
  }

  // 드래그 중 — window 이벤트로 처리
  useEffect(() => {
    const onMove = (e) => {
      if (!dragState.current.dragging) return
      const evt = e.touches ? e.touches[0] : e
      const dx = evt.clientX - dragState.current.startX
      const dy = evt.clientY - dragState.current.startY
      setPos({
        x: dragState.current.origX + dx,
        y: dragState.current.origY + dy,
      })
    }
    const onUp = () => {
      dragState.current.dragging = false
      document.body.style.userSelect = ''
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [])

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

  // 위치 스타일 — 드래그 시작 전엔 화면 가운데, 이후엔 절대 좌표
  const positioned = pos !== null
  const containerStyle = positioned
    ? {
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        zIndex: 101,
        borderRadius: '8px',
      }
    : { borderRadius: '8px' }

  return (
    <div
      className={positioned
        ? 'fixed inset-0 z-[100] bg-black/60'
        : 'fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4'}
      onClick={close}
    >
      <div
        ref={dragRef}
        className="relative bg-white shadow-2xl w-[90vw] max-w-[420px] overflow-hidden flex flex-col"
        style={containerStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 콘텐츠 영역 */}
        {hasImage ? (
          <>
            {/* 이미지 모드 — 상단 드래그 영역 (얇은 핸들) */}
            <div
              className="absolute top-0 left-0 right-12 h-8 z-[5] cursor-move"
              onMouseDown={onDragStart}
              onTouchStart={onDragStart}
              title={t('common.dragToMove')}
            />
            {/* X 버튼 */}
            <button
              onClick={close}
              aria-label={t('common.close')}
              className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>
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
                <div className="px-5 py-4 border-t border-gray-100">
                  {popup.title && (
                    <h2 className="text-sm font-bold text-gray-900 mb-1">{popup.title}</h2>
                  )}
                  {popup.content_html ? (
                    <div
                      className="rt-content text-xs text-gray-600 leading-relaxed line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(popup.content_html) }}
                    />
                  ) : popup.content ? (
                    <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line line-clamp-2">
                      {popup.content}
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* 텍스트 모드 — 상단 헤더 바 (드래그 핸들) + X 버튼 */}
            <div
              className="flex items-center justify-between pl-4 pr-2 h-9 border-b border-gray-100 bg-gray-50/50 cursor-move select-none"
              onMouseDown={onDragStart}
              onTouchStart={onDragStart}
              title={t('common.dragToMove')}
            >
              <span className="text-[10px] font-semibold text-gray-500 tracking-wider uppercase">Notice</span>
              <button
                onClick={close}
                aria-label={t('common.close')}
                className="w-6 h-6 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            <div
              className={`px-6 pt-5 pb-6 ${hasLink ? 'cursor-pointer' : ''}`}
              onClick={hasLink ? handleContentClick : undefined}
            >
              <h2 className="text-lg font-bold text-gray-900 mb-3">{popup.title}</h2>
              {popup.content_html ? (
                <div
                  className="rt-content text-sm text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(popup.content_html) }}
                />
              ) : popup.content ? (
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {popup.content}
                </p>
              ) : null}
              {popup.date && (
                <p className="mt-4 text-xs text-gray-400">{popup.date}</p>
              )}
            </div>
          </>
        )}

        {/* 하단 바 — 네이버/카카오 스타일 */}
        <div className="flex items-center justify-between bg-[#333] px-4 py-3">
          {/* 좌측: 체크박스형 옵션들 */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer group">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 accent-white cursor-pointer"
                onChange={(e) => { if (e.target.checked) closeForToday() }}
              />
              <span className="text-[11px] text-gray-300 group-hover:text-white transition-colors select-none">
                {t('common.hideToday')}
              </span>
            </label>
            <button
              onClick={closeForever}
              className="text-[11px] text-gray-400 hover:text-white transition-colors underline underline-offset-2"
            >
              {t('common.hideForever')}
            </button>
          </div>

          {/* 우측: 닫기 */}
          <button
            onClick={close}
            className="text-[11px] text-gray-300 hover:text-white transition-colors font-medium"
          >
            {t('common.closeWithX')}
          </button>
        </div>
      </div>
    </div>
  )
}
