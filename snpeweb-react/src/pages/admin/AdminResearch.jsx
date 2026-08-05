import { useState, useEffect } from 'react'
import { dataStore } from '../../lib/dataStore'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

const emptyForm = { title: '', authors: '', journal: '', year: '', url: '', desc: '' }

export default function AdminResearch() {
  const [papers, setPapers] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const loadData = async () => setPapers(await dataStore.getResearchPapers())
  useEffect(() => { loadData() }, [])

  const openNew = () => { setForm(emptyForm); setEditing('new') }
  const openEdit = (p) => { setForm({ ...p }); setEditing(p.id) }
  const close = () => { setEditing(null); setForm(emptyForm) }

  const save = async () => {
    if (!form.title.trim()) return
    if (editing === 'new') await dataStore.addResearchPaper(form)
    else await dataStore.updateResearchPaper(editing, form)
    await loadData(); close()
  }

  const remove = async (id) => {
    if (!confirm('삭제하시겠습니까?')) return
    await dataStore.deleteResearchPaper(id)
    await loadData()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">연구논문 관리</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800">
          <Plus size={16} /> 논문 추가
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-600 border-b">
          <span>논문 제목</span>
          <span className="w-24 text-center">학술지</span>
          <span className="w-16 text-center">연도</span>
          <span className="w-20 text-center">관리</span>
        </div>
        {papers.map((p) => (
          <div key={p.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-6 py-3.5 border-b border-gray-100 last:border-0 text-sm">
            <span className="font-medium text-gray-900 truncate">{p.title}</span>
            <span className="w-24 text-center text-xs text-gray-500 truncate">{p.journal}</span>
            <span className="w-16 text-center text-xs text-gray-500">{p.year}</span>
            <div className="w-20 flex items-center justify-center gap-1">
              <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-blue-600"><Pencil size={14} /></button>
              <button onClick={() => remove(p.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={close}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">{editing === 'new' ? '논문 추가' : '논문 수정'}</h2>
              <button onClick={close} className="text-gray-400 hover:text-gray-700"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">제목 *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">저자</label>
                <input value={form.authors} onChange={(e) => setForm({ ...form, authors: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">학술지</label>
                <input value={form.journal} onChange={(e) => setForm({ ...form, journal: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">연도</label>
                <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm" placeholder="2024" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">URL</label>
                <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm" placeholder="https://..." />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">설명</label>
                <textarea value={form.desc || ''} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm resize-none" placeholder="논문 요약 설명" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={close} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">취소</button>
              <button onClick={save} className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800">저장</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
