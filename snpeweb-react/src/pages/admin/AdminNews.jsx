import { useState } from 'react'
import { dataStore } from '../../lib/dataStore'
import { Plus, Pencil, Trash2, X, ExternalLink } from 'lucide-react'

const emptyForm = { title: '', date: new Date().toISOString().slice(0, 10), source: '', url: '', summary: '' }

export default function AdminNews() {
  const [news, setNews] = useState(() => dataStore.getNews())
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const refresh = () => setNews(dataStore.getNews())
  const openNew = () => { setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) }); setEditing('new') }
  const openEdit = (n) => { setForm({ title: n.title, date: n.date, source: n.source, url: n.url || '', summary: n.summary || '' }); setEditing(n.id) }
  const close = () => { setEditing(null); setForm(emptyForm) }

  const save = () => {
    if (!form.title) return
    if (editing === 'new') dataStore.addNews(form)
    else dataStore.updateNews(editing, form)
    refresh(); close()
  }

  const remove = (id) => {
    if (!window.confirm('삭제하시겠습니까?')) return
    dataStore.deleteNews(id); refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">언론보도 관리</h1>
          <p className="text-sm text-gray-500 mt-1">총 {news.length}개</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm rounded-xl hover:bg-gray-800 transition-colors">
          <Plus size={16} /> 보도 추가
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="text-left px-4 py-3 font-medium">제목</th>
                <th className="text-left px-4 py-3 font-medium w-24">출처</th>
                <th className="text-left px-4 py-3 font-medium w-28">날짜</th>
                <th className="text-center px-4 py-3 font-medium w-12">링크</th>
                <th className="text-center px-4 py-3 font-medium w-24">관리</th>
              </tr>
            </thead>
            <tbody>
              {news.map((n) => (
                <tr key={n.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-gray-900">{n.title}</td>
                  <td className="px-4 py-3 text-gray-500">{n.source}</td>
                  <td className="px-4 py-3 text-gray-500">{n.date}</td>
                  <td className="px-4 py-3 text-center">
                    {n.url && (
                      <a href={n.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                        <ExternalLink size={14} />
                      </a>
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
              {news.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">등록된 언론보도가 없습니다.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={close}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">{editing === 'new' ? '보도 추가' : '보도 수정'}</h2>
              <button onClick={close} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">제목 *</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">출처</label>
                  <input type="text" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="예: 중앙일보" className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">날짜</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL 링크</label>
                <input type="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">요약</label>
                <textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} rows={3} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400 resize-none" />
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
