import { useState, useEffect } from 'react'
import { dataStore } from '../../lib/dataStore'
import { Plus, Pencil, Trash2, X, Pin, Megaphone } from 'lucide-react'
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

  const loadData = async () => setNotices(await dataStore.getNotices())
  useEffect(() => { loadData() }, [])

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
    if (editing === 'new') await dataStore.addNotice(payload)
    else await dataStore.updateNotice(editing, payload)
    await loadData(); close()
  }

  const remove = async (id) => {
    if (!window.confirm('삭제하시겠습니까?')) return
    await dataStore.deleteNotice(id); await loadData()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">공지사항 관리</h1>
          <p className="text-sm text-gray-500 mt-1">총 {notices.length}개</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm rounded-xl hover:bg-gray-800 transition-colors">
          <Plus size={16} /> 공지 추가
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="text-center px-4 py-3 font-medium w-12">고정</th>
                <th className="text-left px-4 py-3 font-medium">제목</th>
                <th className="text-left px-4 py-3 font-medium w-28">날짜</th>
                <th className="text-center px-4 py-3 font-medium w-20">팝업</th>
                <th className="text-center px-4 py-3 font-medium w-24">관리</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((n) => (
                <tr key={n.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-center">
                    {n.pinned && <Pin size={14} className="text-amber-500 mx-auto" />}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{n.title}</td>
                  <td className="px-4 py-3 text-gray-500">{n.date}</td>
                  <td className="px-4 py-3 text-center">
                    {n.popup_active && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[11px] font-semibold">
                        <Megaphone size={11} /> ON
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openEdit(n)} className="p-1.5 hover:bg-gray-100 rounded-lg"><Pencil size={14} className="text-gray-500" /></button>
                      <button onClick={() => remove(n.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 size={14} className="text-red-400" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {notices.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">등록된 공지사항이 없습니다.</td></tr>
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
