import { useState, useEffect } from 'react'
import { dataStore } from '../../lib/dataStore'
import { Plus, Pencil, Trash2, X, Pin, Megaphone, Info } from 'lucide-react'
import ImageUploader from '../../components/admin/ImageUploader'
import RichTextEditor from '../../components/admin/RichTextEditor'

const emptyForm = {
  title: '',
  date: new Date().toISOString().slice(0, 10),
  content: '',
  content_html: '',
  pinned: false,
  popup_active: false,
  popup_image_url: '',
  popup_link_url: '',
  popup_start_date: '',
  popup_end_date: '',
}

export default function AdminNotices() {
  const [notices, setNotices] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  // 'all' | 'popup' — 팝업만 보기 필터
  const [filter, setFilter] = useState('all')

  const loadData = async () => setNotices(await dataStore.getNotices())
  useEffect(() => { loadData() }, [])

  // 오늘 날짜가 노출 기간 내인지 확인 (start/end가 비어 있으면 무기한으로 간주)
  const isPopupInPeriod = (n) => {
    if (!n.popup_active) return false
    const now = new Date()
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    if (n.popup_start_date && today < n.popup_start_date) return false
    if (n.popup_end_date && today > n.popup_end_date) return false
    return true
  }

  const filteredNotices = filter === 'popup'
    ? notices.filter((n) => n.popup_active)
    : notices

  const popupCount = notices.filter((n) => n.popup_active).length
  const activePopupCount = notices.filter(isPopupInPeriod).length

  const openNew = () => { setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) }); setEditing('new') }
  const openEdit = (n) => {
    setForm({
      title: n.title,
      date: n.date,
      content: n.content || '',
      content_html: n.content_html || '',
      pinned: n.pinned,
      popup_active: n.popup_active || false,
      popup_image_url: n.popup_image_url || '',
      popup_link_url: n.popup_link_url || '',
      popup_start_date: n.popup_start_date || '',
      popup_end_date: n.popup_end_date || '',
    })
    setEditing(n.id)
  }
  const close = () => { setEditing(null); setForm(emptyForm) }

  const save = async () => {
    if (!form.title) return
    // 빈 문자열 날짜는 NULL로 변환 (Supabase date 컬럼 호환)
    const payload = {
      ...form,
      popup_start_date: form.popup_start_date || null,
      popup_end_date: form.popup_end_date || null,
      popup_image_url: form.popup_image_url || null,
      popup_link_url: form.popup_link_url || null,
    }
    try {
      if (editing === 'new') await dataStore.addNotice(payload)
      else await dataStore.updateNotice(editing, payload)
      await loadData(); close()
    } catch (e) {
      console.error('[AdminNotices] 저장 실패:', e)
      window.alert(`공지 저장에 실패했습니다.\n${e?.message || e}`)
    }
  }

  const remove = async (id) => {
    if (!window.confirm('삭제하시겠습니까?')) return
    try {
      await dataStore.deleteNotice(id); await loadData()
    } catch (e) {
      console.error('[AdminNotices] 삭제 실패:', e)
      window.alert(`삭제에 실패했습니다.\n${e?.message || e}`)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">공지사항 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            총 {notices.length}개 · 팝업 등록 {popupCount}개 · 현재 노출중 {activePopupCount}개
          </p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm rounded-xl hover:bg-gray-800 transition-colors">
          <Plus size={16} /> 공지 추가
        </button>
      </div>

      {/* 팝업 노출 안내 */}
      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed flex gap-2">
        <Info size={14} className="flex-shrink-0 mt-0.5 text-amber-600" />
        <div>
          <div className="font-semibold mb-1">팝업이 노출되지 않을 때 확인 사항</div>
          <ul className="list-disc list-inside space-y-0.5">
            <li><span className="font-medium">노출 기간</span>을 확인해 주세요. 오늘 날짜가 시작/종료일 범위 밖이면 표시되지 않습니다. (기간 비우면 무기한 노출)</li>
            <li>방문자가 한 번 <span className="font-medium">"다시 보지 않기"</span>를 누르면 해당 브라우저에서 영구 숨김 처리됩니다(브라우저 로컬 저장). 운영자 본인 확인 시 <span className="font-medium">시크릿 모드</span> 또는 다른 브라우저로 접속해 주세요.</li>
            <li>여러 팝업이 동시 활성화되어 있으면 상단 고정/최신 날짜 순으로 1개만 노출됩니다.</li>
          </ul>
        </div>
      </div>

      {/* 필터 탭 */}
      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
        {[
          { value: 'all', label: `전체 (${notices.length})` },
          { value: 'popup', label: `팝업만 (${popupCount})` },
        ].map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filter === opt.value ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="text-center px-4 py-3 font-medium w-12">고정</th>
                <th className="text-left px-4 py-3 font-medium">제목</th>
                <th className="text-left px-4 py-3 font-medium w-28">날짜</th>
                <th className="text-center px-4 py-3 font-medium w-24">팝업</th>
                <th className="text-left px-4 py-3 font-medium w-48">팝업 노출 기간</th>
                <th className="text-center px-4 py-3 font-medium w-24">관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotices.map((n) => {
                const inPeriod = isPopupInPeriod(n)
                return (
                  <tr
                    key={n.id}
                    className={`border-t border-gray-50 hover:bg-gray-50/50 ${n.popup_active ? 'bg-amber-50/30' : ''}`}
                  >
                    <td className="px-4 py-3 text-center">
                      {n.pinned && <Pin size={14} className="text-amber-500 mx-auto" />}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{n.title}</td>
                    <td className="px-4 py-3 text-gray-500">{n.date}</td>
                    <td className="px-4 py-3 text-center">
                      {n.popup_active ? (
                        inPeriod ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[11px] font-semibold">
                            <Megaphone size={11} /> 노출중
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[11px] font-semibold">
                            <Megaphone size={11} /> 기간외
                          </span>
                        )
                      ) : (
                        <span className="text-gray-300 text-[11px]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {n.popup_active ? (
                        (n.popup_start_date || n.popup_end_date) ? (
                          <span>
                            {n.popup_start_date || '시작일 없음'} ~ {n.popup_end_date || '종료일 없음'}
                          </span>
                        ) : (
                          <span className="text-gray-400">무기한</span>
                        )
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => openEdit(n)} className="p-1.5 hover:bg-gray-100 rounded-lg"><Pencil size={14} className="text-gray-500" /></button>
                        <button onClick={() => remove(n.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 size={14} className="text-red-400" /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filteredNotices.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                    {filter === 'popup' ? '등록된 팝업이 없습니다.' : '등록된 공지사항이 없습니다.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={close}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">{editing === 'new' ? '공지 추가' : '공지 수정'}</h2>
              <button onClick={close} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">제목 *</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">날짜</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" checked={form.pinned} onChange={(e) => setForm({ ...form, pinned: e.target.checked })} className="accent-amber-500" />
                    상단 고정
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
                <RichTextEditor
                  value={form.content_html || form.content || ''}
                  onChange={(html) => setForm({ ...form, content_html: html, content: '' })}
                  folder="notices"
                  minHeight="160px"
                  placeholder="공지 내용을 입력하세요. 글자 색상/크기/정렬, 이미지 삽입 가능"
                />
              </div>

              {/* 메인 홈 팝업 노출 설정 */}
              <div className="border-t border-gray-100 pt-4 mt-2">
                <div className="flex items-center gap-2 mb-3">
                  <Megaphone size={16} className="text-amber-500" />
                  <h3 className="text-sm font-bold text-gray-900">메인 홈 팝업 노출 설정</h3>
                </div>

                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer mb-4 p-3 bg-amber-50/60 rounded-lg border border-amber-100">
                  <input
                    type="checkbox"
                    checked={form.popup_active}
                    onChange={(e) => setForm({ ...form, popup_active: e.target.checked })}
                    className="accent-amber-500 w-4 h-4"
                  />
                  <span className="font-medium">이 공지를 메인 홈 팝업으로 노출</span>
                </label>

                {form.popup_active && (
                  <div className="space-y-4 pl-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">노출 시작일</label>
                        <input type="date" value={form.popup_start_date} onChange={(e) => setForm({ ...form, popup_start_date: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">노출 종료일</label>
                        <input type="date" value={form.popup_end_date} onChange={(e) => setForm({ ...form, popup_end_date: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 -mt-2">기간을 비워두면 무기한 노출됩니다.</p>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">팝업 이미지 <span className="text-gray-400">(선택, 비우면 텍스트로 표시)</span></label>
                      <ImageUploader
                        value={form.popup_image_url}
                        onChange={(url) => setForm({ ...form, popup_image_url: url })}
                        folder="notices"
                        aspectRatio="4/3"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">클릭 시 이동 URL <span className="text-gray-400">(선택)</span></label>
                      <input type="url" value={form.popup_link_url} onChange={(e) => setForm({ ...form, popup_link_url: e.target.value })} placeholder="https://... 또는 /notice" className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
                    </div>

                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={close} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">취소</button>
              <button onClick={save} disabled={!form.title} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-40">저장</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
