import { useState } from 'react'
import { dataStore } from '../../lib/dataStore'
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react'

const categories = ['학술대회', '워크숍', '행사', '캠페인', '국제행사', '출강', '기타']
const emptyForm = { title: '', date: new Date().toISOString().slice(0, 10), location: '', desc: '', category: '행사', imageUrl: '' }

export default function AdminActivities() {
  const [activities, setActivities] = useState(() => dataStore.getActivities())
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [query, setQuery] = useState('')

  const refresh = () => setActivities(dataStore.getActivities())
  const openNew = () => { setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) }); setEditing('new') }
  const openEdit = (a) => { setForm({ title: a.title, date: a.date, location: a.location || '', desc: a.desc || '', category: a.category || '행사', imageUrl: a.imageUrl || '' }); setEditing(a.id) }
  const close = () => { setEditing(null); setForm(emptyForm) }

  const save = () => {
    if (!form.title) return
    if (editing === 'new') dataStore.addActivity(form)
    else dataStore.updateActivity(editing, form)
    refresh(); close()
  }

  const remove = (id) => {
    if (!window.confirm('삭제하시겠습니까?')) return
    dataStore.deleteActivity(id); refresh()
  }

  const filtered = activities.filter(
    (a) => !query || a.title.includes(query) || (a.location && a.location.includes(query)) || (a.category && a.category.includes(query))
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">활동내역 관리</h1>
          <p className="text-sm text-gray-500 mt-1">총 {activities.length}개</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm rounded-xl hover:bg-gray-800 transition-colors">
          <Plus size={16} /> 활동 추가
        </button>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="제목, 장소, 카테고리 검색..."
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
        />
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="text-left px-4 py-3 font-medium">제목</th>
                <th className="text-left px-4 py-3 font-medium w-24">카테고리</th>
                <th className="text-left px-4 py-3 font-medium w-28">날짜</th>
                <th className="text-left px-4 py-3 font-medium">장소</th>
                <th className="text-center px-4 py-3 font-medium w-24">관리</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-gray-900">{a.title}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 bg-snpe-dark/10 text-snpe-dark rounded text-xs">{a.category}</span></td>
                  <td className="px-4 py-3 text-gray-500">{a.date}</td>
                  <td className="px-4 py-3 text-gray-500">{a.location}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openEdit(a)} className="p-1.5 hover:bg-gray-100 rounded-lg"><Pencil size={14} className="text-gray-500" /></button>
                      <button onClick={() => remove(a.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 size={14} className="text-red-400" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">등록된 활동내역이 없습니다.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={close}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">{editing === 'new' ? '활동 추가' : '활동 수정'}</h2>
              <button onClick={close} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">제목 *</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:border-gray-400">
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">날짜</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">장소</label>
                <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="예: 서울 코엑스" className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={3} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">사진 URL</label>
                <input type="url" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://... (외부 이미지 링크)" className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
                {form.imageUrl && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                    <img src={form.imageUrl} alt="미리보기" className="w-full h-32 object-cover" onError={(e) => { e.target.style.display = 'none' }} />
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
