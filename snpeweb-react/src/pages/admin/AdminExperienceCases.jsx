import { useState } from 'react'
import { dataStore } from '../../lib/dataStore'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

const emptyForm = { name: '', age: '', issue: '', period: '', content: '' }

export default function AdminExperienceCases() {
  const [cases, setCases] = useState(() => dataStore.getExperienceCases())
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const refresh = () => setCases(dataStore.getExperienceCases())
  const openNew = () => { setForm(emptyForm); setEditing('new') }
  const openEdit = (c) => { setForm({ ...c }); setEditing(c.id) }
  const close = () => { setEditing(null); setForm(emptyForm) }

  const save = () => {
    if (!form.name.trim() || !form.content.trim()) return
    if (editing === 'new') dataStore.addExperienceCase(form)
    else dataStore.updateExperienceCase(editing, form)
    refresh(); close()
  }

  const remove = (id) => {
    if (!confirm('삭제하시겠습니까?')) return
    dataStore.deleteExperienceCase(id)
    refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">체험사례 관리</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800">
          <Plus size={16} /> 사례 추가
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-600 border-b">
          <span>이름</span>
          <span className="w-24 text-center">증상</span>
          <span className="w-20 text-center">기간</span>
          <span className="w-20 text-center">관리</span>
        </div>
        {cases.map((c) => (
          <div key={c.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-6 py-3.5 border-b border-gray-100 last:border-0 text-sm">
            <span className="font-medium text-gray-900">{c.name} ({c.age})</span>
            <span className="w-24 text-center text-xs text-gray-500">{c.issue}</span>
            <span className="w-20 text-center text-xs text-gray-500">{c.period}</span>
            <div className="w-20 flex items-center justify-center gap-1">
              <button onClick={() => openEdit(c)} className="p-1.5 text-gray-400 hover:text-blue-600"><Pencil size={14} /></button>
              <button onClick={() => remove(c.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={close}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">{editing === 'new' ? '사례 추가' : '사례 수정'}</h2>
              <button onClick={close} className="text-gray-400 hover:text-gray-700"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">이름 *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">연령대</label>
                <input value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm" placeholder="예: 40대 여성" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">증상</label>
                <input value={form.issue} onChange={(e) => setForm({ ...form, issue: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">수련기간</label>
                <input value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">내용 *</label>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={4} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm resize-none" />
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
