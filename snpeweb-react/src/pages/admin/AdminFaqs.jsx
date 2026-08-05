import { useState, useEffect } from 'react'
import { dataStore } from '../../lib/dataStore'
import { Plus, Pencil, Trash2, X, ChevronDown } from 'lucide-react'

const FAQ_CATEGORIES = ['운동', '수강신청', '강사관련', '출강관련', '기타']

const emptyForm = {
  category: '운동',
  question: '',
  answer: '',
  sort_order: 0,
}

export default function AdminFaqs() {
  const [faqs, setFaqs] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [activeCategory, setActiveCategory] = useState('전체')
  const [openIndex, setOpenIndex] = useState(null)

  const loadData = async () => setFaqs(await dataStore.getFaqs())
  useEffect(() => { loadData() }, [])

  const openNew = () => {
    setForm({ ...emptyForm, sort_order: (faqs.length + 1) * 10 })
    setEditing('new')
  }
  const openEdit = (f) => {
    setForm({
      category: f.category || '운동',
      question: f.question || '',
      answer: f.answer || '',
      sort_order: f.sort_order ?? 0,
    })
    setEditing(f.id)
  }
  const close = () => { setEditing(null); setForm(emptyForm) }

  const save = async () => {
    if (!form.question.trim() || !form.answer.trim()) return
    if (editing === 'new') await dataStore.addFaq(form)
    else await dataStore.updateFaq(editing, form)
    await loadData()
    close()
  }

  const remove = async (id) => {
    if (!confirm('삭제하시겠습니까?')) return
    await dataStore.deleteFaq(id)
    await loadData()
  }

  const filtered = activeCategory === '전체' ? faqs : faqs.filter((f) => f.category === activeCategory)
  const counts = FAQ_CATEGORIES.reduce((acc, c) => {
    acc[c] = faqs.filter((f) => f.category === c).length
    return acc
  }, {})

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">자주하는 질문(FAQ) 관리</h1>
          <p className="text-sm text-gray-500 mt-1">총 {faqs.length}건 · 사용자 페이지: <a href="/faq" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">/faq</a></p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800"
        >
          <Plus size={16} /> FAQ 추가
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {['전체', ...FAQ_CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === c
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            {c}
            {c !== '전체' && counts[c] > 0 && (
              <span className={`ml-1.5 ${activeCategory === c ? 'text-white/70' : 'text-gray-400'}`}>
                {counts[c]}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((f, i) => (
          <div key={f.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center px-4 py-3 gap-3">
              <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-xs font-medium flex-shrink-0">
                {f.category}
              </span>
              <button
                onClick={() => setOpenIndex(openIndex === f.id ? null : f.id)}
                className="flex-1 text-left flex items-center gap-2 min-w-0"
              >
                <span className="text-sm font-medium text-gray-900 truncate">{f.question}</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === f.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <span className="text-xs text-gray-400 flex-shrink-0">#{f.sort_order ?? '-'}</span>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => openEdit(f)} className="p-1.5 text-gray-400 hover:text-blue-600">
                  <Pencil size={14} />
                </button>
                <button onClick={() => remove(f.id)} className="p-1.5 text-gray-400 hover:text-red-600">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            {openIndex === f.id && (
              <div className="px-4 pb-4 pt-0 text-sm text-gray-600 border-t border-gray-100 bg-gray-50/50 leading-relaxed">
                {f.answer}
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-12 text-center text-gray-400 text-sm">
            등록된 FAQ가 없습니다.
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={close}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">{editing === 'new' ? 'FAQ 추가' : 'FAQ 수정'}</h2>
              <button onClick={close} className="text-gray-400 hover:text-gray-700"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-[1fr_120px] gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">카테고리</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white"
                  >
                    {FAQ_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">정렬 순서</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">질문 *</label>
                <input
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
                  placeholder="예: SNPE 운동은 어떤 도구가 필요한가요?"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">답변 *</label>
                <textarea
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  rows={6}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm resize-none leading-relaxed"
                  placeholder="답변 내용을 입력하세요."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={close} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">취소</button>
              <button
                onClick={save}
                disabled={!form.question.trim() || !form.answer.trim()}
                className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 disabled:opacity-40"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
