import { useState, useEffect, useRef } from 'react'
import * as XLSX from 'xlsx'
import { dataStore } from '../../lib/dataStore'
import { Plus, Pencil, Trash2, X, Star, Crown, Upload, Download, User, Search } from 'lucide-react'

const emptyForm = {
  name: '',
  level: 'Level 1',
  region: '',
  photo_url: '',
  intro: '',
  featured: false,
  ambassador: false,
}

const LEVELS = ['Level 1', 'Level 2', 'Level 3', 'Master']

export default function AdminCertTeachers() {
  const [teachers, setTeachers] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all') // all / ambassador / featured
  const [uploadResult, setUploadResult] = useState(null)
  const fileRef = useRef(null)

  const loadData = async () => setTeachers(await dataStore.getTeachers())
  useEffect(() => { loadData() }, [])

  const openNew = () => { setForm(emptyForm); setEditing('new') }
  const openEdit = (t) => {
    setForm({
      name: t.name || '',
      level: t.level || 'Level 1',
      region: t.region || '',
      photo_url: t.photo_url || '',
      intro: t.intro || '',
      featured: !!t.featured,
      ambassador: !!t.ambassador,
    })
    setEditing(t.id)
  }
  const close = () => { setEditing(null); setForm(emptyForm) }

  const save = async () => {
    if (!form.name.trim()) return
    if (editing === 'new') await dataStore.addTeacher(form)
    else await dataStore.updateTeacher(editing, form)
    await loadData()
    close()
  }

  const remove = async (id) => {
    if (!confirm('삭제하시겠습니까?')) return
    await dataStore.deleteTeacher(id)
    await loadData()
  }

  // ── 엑셀 일괄 업로드 ─────────────────────────────────────────────────
  const handleExcelUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadResult({ status: 'parsing', message: '엑셀 파일 분석 중...' })
    try {
      const buffer = await file.arrayBuffer()
      const wb = XLSX.read(buffer, { type: 'array' })
      const ws = wb.Sheets[wb.SheetNames[0]]
      const rows = XLSX.utils.sheet_to_json(ws, { defval: '' })

      const truthy = (v) => {
        if (v === true) return true
        const s = String(v).trim().toLowerCase()
        return s === 'y' || s === 'yes' || s === 'true' || s === 'o' || s === '1' || s === '체크'
      }

      const mapped = rows
        .map((r) => ({
          name: String(r['이름'] || r['name'] || '').trim(),
          level: String(r['레벨'] || r['level'] || 'Level 1').trim() || 'Level 1',
          region: String(r['지역'] || r['region'] || '').trim(),
          photo_url: String(r['사진URL'] || r['사진'] || r['photo_url'] || '').trim(),
          intro: String(r['소개'] || r['intro'] || '').trim(),
          featured: truthy(r['우수강사'] || r['우수'] || r['featured']),
          ambassador: truthy(r['앰배서더'] || r['ambassador']),
        }))
        .filter((r) => r.name)

      if (mapped.length === 0) {
        setUploadResult({ status: 'error', message: '유효한 강사 데이터(이름 컬럼)가 없습니다.' })
        return
      }

      const result = await dataStore.bulkAddTeachers(mapped)
      setUploadResult({ status: 'ok', message: `${result.inserted}명 등록 완료` })
      await loadData()
    } catch (err) {
      setUploadResult({ status: 'error', message: `업로드 실패: ${err.message || err}` })
    } finally {
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const downloadTemplate = () => {
    const sample = [
      { 이름: '홍길동', 레벨: 'Level 2', 지역: '서울', 사진URL: '', 소개: 'SNPE 인증강사', 우수강사: 'O', 앰배서더: '' },
      { 이름: '김지영', 레벨: 'Level 3', 지역: '경기', 사진URL: 'https://...', 소개: '메인 노출 강사', 우수강사: 'O', 앰배서더: 'O' },
    ]
    const ws = XLSX.utils.json_to_sheet(sample)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, '인증강사')
    XLSX.writeFile(wb, 'snpe_teachers_template.xlsx')
  }

  // ── 필터링 ───────────────────────────────────────────────────────────
  const filtered = teachers.filter((t) => {
    if (filter === 'ambassador' && !t.ambassador) return false
    if (filter === 'featured' && !t.featured) return false
    if (query && !`${t.name}${t.region}${t.level}`.includes(query)) return false
    return true
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">인증강사 관리</h1>
          <p className="text-sm text-gray-500 mt-1">총 {teachers.length}명 · 앰배서더 {teachers.filter((t) => t.ambassador).length} · 우수 {teachers.filter((t) => t.featured).length}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={downloadTemplate}
            className="flex items-center gap-2 px-3 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Download size={16} /> 양식 다운로드
          </button>
          <label className="flex items-center gap-2 px-3 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
            <Upload size={16} /> 엑셀 업로드
            <input ref={fileRef} type="file" accept=".xlsx,.xls" onChange={handleExcelUpload} className="hidden" />
          </label>
          <button
            onClick={openNew}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800"
          >
            <Plus size={16} /> 강사 추가
          </button>
        </div>
      </div>

      {uploadResult && (
        <div
          className={`mb-4 px-4 py-3 rounded-xl text-sm flex items-center justify-between ${
            uploadResult.status === 'ok'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : uploadResult.status === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}
        >
          <span>{uploadResult.message}</span>
          <button onClick={() => setUploadResult(null)} className="opacity-70 hover:opacity-100">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="강사명/지역/레벨 검색..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
          />
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
          {[
            { value: 'all', label: '전체' },
            { value: 'ambassador', label: '앰배서더' },
            { value: 'featured', label: '우수' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === opt.value ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-[60px_1fr_80px_80px_60px_60px_80px] gap-3 bg-gray-50 px-5 py-3 text-xs font-medium text-gray-600 border-b">
          <span>사진</span>
          <span>이름</span>
          <span className="text-center">레벨</span>
          <span className="text-center">지역</span>
          <span className="text-center">앰배서더</span>
          <span className="text-center">우수</span>
          <span className="text-center">관리</span>
        </div>
        {filtered.map((t) => (
          <div
            key={t.id}
            className="grid grid-cols-[60px_1fr_80px_80px_60px_60px_80px] gap-3 items-center px-5 py-3 border-b border-gray-100 last:border-0 text-sm"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
              {t.photo_url ? (
                <img src={t.photo_url} alt={t.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
              ) : (
                <User size={18} className="text-gray-400" />
              )}
            </div>
            <span className="font-medium text-gray-900 truncate">{t.name}</span>
            <span className="text-center text-xs text-snpe-dark">{t.level}</span>
            <span className="text-center text-xs text-gray-500">{t.region}</span>
            <span className="text-center">
              {t.ambassador && <Crown size={14} className="text-purple-500 mx-auto" />}
            </span>
            <span className="text-center">
              {t.featured && <Star size={14} className="text-amber-500 mx-auto" />}
            </span>
            <div className="flex items-center justify-center gap-1">
              <button onClick={() => openEdit(t)} className="p-1.5 text-gray-400 hover:text-blue-600">
                <Pencil size={14} />
              </button>
              <button onClick={() => remove(t.id)} className="p-1.5 text-gray-400 hover:text-red-600">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-gray-400 text-sm">표시할 강사가 없습니다.</div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={close}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">{editing === 'new' ? '강사 추가' : '강사 수정'}</h2>
              <button onClick={close} className="text-gray-400 hover:text-gray-700"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">이름 *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">레벨</label>
                  <select
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white"
                  >
                    {LEVELS.map((l) => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">지역</label>
                  <input
                    value={form.region}
                    onChange={(e) => setForm({ ...form, region: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">사진 URL</label>
                <input
                  value={form.photo_url}
                  onChange={(e) => setForm({ ...form, photo_url: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
                  placeholder="https://..."
                />
                {form.photo_url && (
                  <div className="mt-2 flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                      <img src={form.photo_url} alt="preview" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                    </div>
                    <span className="text-xs text-gray-500">미리보기</span>
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">소개</label>
                <textarea
                  value={form.intro}
                  onChange={(e) => setForm({ ...form, intro: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm resize-none"
                />
              </div>
              <div className="bg-gray-50 rounded-xl p-3 space-y-3">
                <label className="flex items-start gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.ambassador}
                    onChange={(e) => setForm({ ...form, ambassador: e.target.checked })}
                    className="mt-0.5 accent-purple-500"
                  />
                  <span>
                    <span className="flex items-center gap-1 font-medium text-gray-900">
                      <Crown size={14} className="text-purple-500" /> 앰배서더 강사
                    </span>
                    <span className="block text-xs text-gray-500 mt-0.5">메인 검색 페이지 상단에 카드로 노출됩니다.</span>
                  </span>
                </label>
                <label className="flex items-start gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="mt-0.5 accent-amber-500"
                  />
                  <span>
                    <span className="flex items-center gap-1 font-medium text-gray-900">
                      <Star size={14} className="text-amber-500" /> 우수 강사
                    </span>
                    <span className="block text-xs text-gray-500 mt-0.5">전체 리스트에서 우수 표시 배지로 강조됩니다.</span>
                  </span>
                </label>
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
