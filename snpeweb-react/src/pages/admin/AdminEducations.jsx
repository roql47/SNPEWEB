import { useState, useEffect } from 'react'
import { dataStore } from '../../lib/dataStore'
import { Plus, Pencil, Trash2, X, Calendar, MapPin } from 'lucide-react'

const CATEGORIES = [
  { value: 'level1', label: 'LEVEL 1' },
  { value: 'level2', label: 'LEVEL 2' },
  { value: 'level3', label: 'LEVEL 3' },
  { value: 'master', label: '마스터 과정' },
  { value: 'company', label: '기업특강' },
  { value: 'culture', label: '문화센터' },
  { value: 'training', label: '직무교육' },
]

const STATUS = [
  { value: 'open', label: '모집 중', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'closing', label: '마감 임박', color: 'bg-amber-100 text-amber-700' },
  { value: 'closed', label: '모집 마감', color: 'bg-gray-100 text-gray-600' },
  { value: 'done', label: '종료', color: 'bg-gray-200 text-gray-500' },
]

const emptyForm = {
  category: 'level1',
  title: '',
  start_date: '',
  end_date: '',
  location: '',
  capacity: '',
  status: 'open',
  description: '',
  apply_url: '',
  // LEVEL 페이지 "교육 일정" 박스에 표시되는 자유 텍스트 항목
  schedule_open: '',
  course_period: '',
  class_time: '',
  tuition: '',
  capacity_note: '',
}

// 카테고리별로 LEVEL 페이지 교육일정 박스가 노출되는지 안내
const LEVEL_CATEGORIES = ['level1', 'level2', 'level3']

export default function AdminEducations() {
  const [rows, setRows] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [activeCategory, setActiveCategory] = useState('all')

  const loadData = async () => setRows(await dataStore.getEducations())
  useEffect(() => { loadData() }, [])

  const openNew = () => { setForm(emptyForm); setEditing('new') }
  const openEdit = (r) => {
    setForm({
      category: r.category || 'level1',
      title: r.title || '',
      start_date: r.start_date || '',
      end_date: r.end_date || '',
      location: r.location || '',
      capacity: r.capacity ?? '',
      status: r.status || 'open',
      description: r.description || '',
      apply_url: r.apply_url || '',
      schedule_open: r.schedule_open || '',
      course_period: r.course_period || '',
      class_time: r.class_time || '',
      tuition: r.tuition || '',
      capacity_note: r.capacity_note || '',
    })
    setEditing(r.id)
  }
  const close = () => { setEditing(null); setForm(emptyForm) }

  const save = async () => {
    if (!form.title.trim()) return
    const payload = {
      ...form,
      capacity: form.capacity === '' ? null : Number(form.capacity),
      start_date: form.start_date || null,
      end_date: form.end_date || null,
    }
    if (editing === 'new') await dataStore.addEducation(payload)
    else await dataStore.updateEducation(editing, payload)
    await loadData()
    close()
  }

  const remove = async (id) => {
    if (!confirm('삭제하시겠습니까?')) return
    await dataStore.deleteEducation(id)
    await loadData()
  }

  const labelOf = (cat) => CATEGORIES.find((c) => c.value === cat)?.label || cat
  const statusInfo = (s) => STATUS.find((x) => x.value === s) || STATUS[0]
  const filtered = activeCategory === 'all' ? rows : rows.filter((r) => r.category === activeCategory)

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">교육과정 일정 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            총 {rows.length}건 · 카테고리별 회차/일정/모집 상태를 통합 관리합니다
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800"
        >
          <Plus size={16} /> 교육 일정 추가
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeCategory === 'all'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
          }`}
        >
          전체 {rows.length > 0 && <span className={activeCategory === 'all' ? 'text-white/70' : 'text-gray-400'}>{rows.length}</span>}
        </button>
        {CATEGORIES.map((c) => {
          const cnt = rows.filter((r) => r.category === c.value).length
          return (
            <button
              key={c.value}
              onClick={() => setActiveCategory(c.value)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === c.value
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {c.label}
              {cnt > 0 && (
                <span className={`ml-1.5 ${activeCategory === c.value ? 'text-white/70' : 'text-gray-400'}`}>{cnt}</span>
              )}
            </button>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="text-left px-4 py-3 font-medium w-28">카테고리</th>
                <th className="text-left px-4 py-3 font-medium">제목</th>
                <th className="text-left px-4 py-3 font-medium w-44">기간</th>
                <th className="text-left px-4 py-3 font-medium w-28">장소</th>
                <th className="text-center px-4 py-3 font-medium w-20">정원</th>
                <th className="text-center px-4 py-3 font-medium w-24">상태</th>
                <th className="text-center px-4 py-3 font-medium w-24">관리</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const st = statusInfo(r.status)
                return (
                  <tr key={r.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{labelOf(r.category)}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{r.title}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {r.start_date || '-'}{r.end_date ? ` ~ ${r.end_date}` : ''}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{r.location || '-'}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{r.capacity ?? '-'}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${st.color}`}>
                        {st.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => openEdit(r)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                          <Pencil size={14} className="text-gray-500" />
                        </button>
                        <button onClick={() => remove(r.id)} className="p-1.5 hover:bg-red-50 rounded-lg">
                          <Trash2 size={14} className="text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-400 text-sm">
                    등록된 교육 일정이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={close}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">{editing === 'new' ? '교육 일정 추가' : '교육 일정 수정'}</h2>
              <button onClick={close} className="text-gray-400 hover:text-gray-700"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">카테고리</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white"
                  >
                    {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">상태</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white"
                  >
                    {STATUS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">제목 *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
                  placeholder="예: 2026년 5월 LEVEL 1 정규 과정"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">시작일</label>
                  <input
                    type="date"
                    value={form.start_date}
                    onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">종료일</label>
                  <input
                    type="date"
                    value={form.end_date}
                    onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-[1fr_120px] gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">장소</label>
                  <input
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
                    placeholder="예: 강남 SNPE 센터"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">정원</label>
                  <input
                    type="number"
                    value={form.capacity}
                    onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
                    placeholder="20"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">신청 URL</label>
                <input
                  type="url"
                  value={form.apply_url}
                  onChange={(e) => setForm({ ...form, apply_url: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">상세 설명</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm resize-none"
                  placeholder="교육 내용, 준비물, 강사 등 부가 정보"
                />
              </div>

              {/* LEVEL 페이지 "교육 일정" 박스 항목 — LEVEL 1/2/3 카테고리에서만 노출 */}
              {LEVEL_CATEGORIES.includes(form.category) && (
                <div className="rounded-xl border border-snpe/30 bg-snpe/5 p-4 space-y-3">
                  <p className="text-sm font-bold text-snpe-dark">
                    LEVEL 페이지 「교육 일정」 박스 표시 항목
                  </p>
                  <p className="text-xs text-gray-500 -mt-1.5">
                    이 카테고리에서 가장 먼저 모집 중(또는 최신)인 일정 1건이 해당 LEVEL 페이지의 교육 일정 박스에
                    표시됩니다. 비워두면 페이지의 안내 문구가 그대로 유지됩니다.
                  </p>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">개강 안내</label>
                    <input
                      value={form.schedule_open}
                      onChange={(e) => setForm({ ...form, schedule_open: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
                      placeholder="예: 10월 7일(수) 개강 / 10주 과정 (주2회 / 총 40시간)"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">과정</label>
                    <input
                      value={form.course_period}
                      onChange={(e) => setForm({ ...form, course_period: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
                      placeholder="예: 총 12주 · 주 1회 · 총 84시간 (LEVEL 2·3)"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">수업 시간</label>
                    <input
                      value={form.class_time}
                      onChange={(e) => setForm({ ...form, class_time: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
                      placeholder="예: 매주 수요일 (19:00~21:00) / 일요일 (10:00~12:00)"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">수강료</label>
                      <input
                        value={form.tuition}
                        onChange={(e) => setForm({ ...form, tuition: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
                        placeholder="예: 180만원"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">모집 정원(문구)</label>
                      <input
                        value={form.capacity_note}
                        onChange={(e) => setForm({ ...form, capacity_note: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
                        placeholder="예: 24명 한정 (선착순 마감)"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    ※ 수련 장소는 위의 「장소」 항목이 함께 사용됩니다.
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={close} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">취소</button>
              <button
                onClick={save}
                disabled={!form.title.trim()}
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
