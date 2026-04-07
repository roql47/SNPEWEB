import { useState } from 'react'
import { dataStore } from '../../lib/dataStore'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

const emptyForm = { name: '', owner: '', address: '', tel: '', email: '' }

export default function AdminStudios() {
  const [studios, setStudios] = useState(() => dataStore.getStudios())
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const refresh = () => setStudios(dataStore.getStudios())
  const openNew = () => { setForm(emptyForm); setEditing('new') }
  const openEdit = (s) => { setForm({ name: s.name, owner: s.owner, address: s.address, tel: s.tel, email: s.email }); setEditing(s.id) }
  const close = () => { setEditing(null); setForm(emptyForm) }

  const save = () => {
    if (!form.name || !form.address) return
    if (editing === 'new') dataStore.addStudio(form)
    else dataStore.updateStudio(editing, form)
    refresh(); close()
  }

  const remove = (id) => {
    if (!window.confirm('삭제하시겠습니까?')) return
    dataStore.deleteStudio(id); refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SNPE STUDIO 관리</h1>
          <p className="text-sm text-gray-500 mt-1">총 {studios.length}개 스튜디오</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm rounded-xl hover:bg-gray-800 transition-colors">
          <Plus size={16} /> 스튜디오 추가
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="text-left px-4 py-3 font-medium w-10">#</th>
                <th className="text-left px-4 py-3 font-medium">스튜디오명</th>
                <th className="text-left px-4 py-3 font-medium">대표</th>
                <th className="text-left px-4 py-3 font-medium">주소</th>
                <th className="text-left px-4 py-3 font-medium">연락처</th>
                <th className="text-center px-4 py-3 font-medium w-24">관리</th>
              </tr>
            </thead>
            <tbody>
              {studios.map((s, i) => (
                <tr key={s.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{s.name}</td>
                  <td className="px-4 py-3 text-gray-600">{s.owner}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{s.address}</td>
                  <td className="px-4 py-3 text-gray-600">{s.tel}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openEdit(s)} className="p-1.5 hover:bg-gray-100 rounded-lg"><Pencil size={14} className="text-gray-500" /></button>
                      <button onClick={() => remove(s.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 size={14} className="text-red-400" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {studios.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">등록된 스튜디오가 없습니다.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={close}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">{editing === 'new' ? '스튜디오 추가' : '스튜디오 수정'}</h2>
              <button onClick={close} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">스튜디오명 *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">대표자</label>
                  <input type="text" value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">주소 *</label>
                <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                  <input type="tel" value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={close} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">취소</button>
              <button onClick={save} disabled={!form.name || !form.address} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-40">저장</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
