import { useState, useEffect } from 'react'
import { dataStore } from '../../lib/dataStore'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import ImageUploader from '../../components/admin/ImageUploader'
import RichTextEditor from '../../components/admin/RichTextEditor'

const emptyForm = { name: '', age: '', issue: '', period: '', content: '', detail: '', image_url: '' }

export default function AdminExperienceCases() {
  const [cases, setCases] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const loadData = async () => setCases(await dataStore.getExperienceCases())
  useEffect(() => { loadData() }, [])

  const openNew = () => { setForm(emptyForm); setEditing('new') }
  const openEdit = (c) => {
    setForm({
      name: c.name || '',
      age: c.age || '',
      issue: c.issue || '',
      period: c.period || '',
      content: c.content || '',
      detail: c.detail || '',
      image_url: c.image_url || '',
    })
    setEditing(c.id)
  }
  const close = () => { setEditing(null); setForm(emptyForm) }

  const save = async () => {
    if (!form.name.trim() || !form.content.trim()) return
    if (editing === 'new') await dataStore.addExperienceCase(form)
    else await dataStore.updateExperienceCase(editing, form)
    await loadData(); close()
  }

  const remove = async (id) => {
    if (!confirm('삭제하시겠습니까?')) return
    await dataStore.deleteExperienceCase(id)
    await loadData()
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
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
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
                <label className="text-sm font-medium text-gray-700 mb-1 block">카드 요약 내용 * <span className="text-xs text-gray-400">(목록에 표시되는 짧은 인용구)</span></label>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm resize-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">상세 내용 <span className="text-xs text-gray-400">(카드 클릭 시 표시되는 본문)</span></label>
                <RichTextEditor
                  value={form.detail || ''}
                  onChange={(html) => setForm({ ...form, detail: html })}
                  folder="experience-cases"
                  minHeight="160px"
                  placeholder="상세 체험 내용을 입력하세요. 이미지, 서식 자유롭게 사용 가능"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">대표 이미지 <span className="text-xs text-gray-400">(선택)</span></label>
                <ImageUploader
                  value={form.image_url || ''}
                  onChange={(url) => setForm({ ...form, image_url: url })}
                  folder="experience-cases"
                  aspectRatio="16/9"
                />
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
