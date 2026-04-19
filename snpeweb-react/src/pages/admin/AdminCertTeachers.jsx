import { useState, useEffect } from 'react'
import { dataStore } from '../../lib/dataStore'
import { Plus, Pencil, Trash2, X, Star } from 'lucide-react'

const emptyForm = { name: '', level: 'Level 1', region: '', photo_url: '', intro: '', featured: false }

export default function AdminCertTeachers() {
  const [teachers, setTeachers] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const loadData = async () => setTeachers(await dataStore.getTeachers())
  useEffect(() => { loadData() }, [])

  const openNew = () => { setForm(emptyForm); setEditing('new') }
  const openEdit = (t) => { setForm({ ...t }); setEditing(t.id) }
  const close = () => { setEditing(null); setForm(emptyForm) }

  const save = async () => {
    if (!form.name.trim()) return
    if (editing === 'new') {
      await dataStore.addTeacher(form)
    } else {
      await dataStore.updateTeacher(editing, form)
    }
    await loadData(); close()
  }

  const remove = async (id) => {
    if (!confirm('삭제하시겠습니까?')) return
    await dataStore.deleteTeacher(id)
    await loadData()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">인증강사 관리</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800">
          <Plus size={16} /> 강사 추가
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-600 border-b">
          <span>이름</span>
          <span className="w-20 text-center">레벨</span>
          <span className="w-16 text-center">지역</span>
          <span className="w-16 text-center">우수</span>
          <span className="w-20 text-center">관리</span>
        </div>
        {teachers.map((t) => (
          <div key={t.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-6 py-3.5 border-b border-gray-100 last:border-0 text-sm">
            <span className="font-medium text-gray-900">{t.name}</span>
            <span className="w-20 text-center text-xs text-snpe-dark">{t.level}</span>
            <span className="w-16 text-center text-xs text-gray-500">{t.region}</span>
            <span className="w-16 text-center">
              {t.featured && <Star size={14} className="text-amber-500 mx-auto" />}
            </span>
            <div className="w-20 flex items-center justify-center gap-1">
              <button onClick={() => openEdit(t)} className="p-1.5 text-gray-400 hover:text-blue-600"><Pencil size={14} /></button>
              <button onClick={() => remove(t.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={close}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">{editing === 'new' ? '강사 추가' : '강사 수정'}</h2>
              <button onClick={close} className="text-gray-400 hover:text-gray-700"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">이름 *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">레벨</label>
                <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm">
                  <option>Level 1</option>
                  <option>Level 2</option>
                  <option>Level 3</option>
                  <option>Master</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">지역</label>
                <input value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">사진 URL</label>
                <input value={form.photo_url} onChange={(e) => setForm({ ...form, photo_url: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm" placeholder="https://..." />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">소개</label>
                <textarea value={form.intro} onChange={(e) => setForm({ ...form, intro: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm resize-none" />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded" />
                우수 강사로 표시
              </label>
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
