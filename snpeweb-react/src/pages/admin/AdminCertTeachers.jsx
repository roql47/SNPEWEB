import { useState, useEffect, useRef } from 'react'
import * as XLSX from 'xlsx'
import { dataStore } from '../../lib/dataStore'
import { Plus, Pencil, Trash2, X, Star, Crown, Upload, Download, User, Search, Phone, Calendar } from 'lucide-react'
import ImageUploader from '../../components/admin/ImageUploader'

const emptyForm = {
  name: '',
  level: 'Level 1',
  region: '',
  photo_url: '',
  intro: '',
  phone: '',
  birth_date: '',
  featured: false,
  ambassador: false,
}

const LEVELS = ['Level 1', 'Level 2', 'Level 3', 'Master']

// Date 객체 → 로컬 기준 YYYY-MM-DD
const formatDateCell = (d) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// 생년월일 셀 정규화: Date / Excel serial 숫자 / 문자열 모두 YYYY-MM-DD로 변환
const parseBirthDate = (v) => {
  if (v == null || v === '') return ''
  if (v instanceof Date) return formatDateCell(v)
  if (typeof v === 'number') {
    // Excel serial number → JS Date (1900 기준, Excel의 1900 윤년 버그 보정 포함)
    const epoch = Date.UTC(1899, 11, 30)
    const ms = epoch + Math.round(v) * 86400000
    return formatDateCell(new Date(ms))
  }
  const s = String(v).trim()
  // 8자리 숫자(YYYYMMDD) → 하이픈 삽입
  const digits = s.replace(/[^0-9]/g, '')
  if (/^\d{8}$/.test(digits)) {
    return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`
  }
  // 구분자(. / 공백)를 하이픈으로 통일
  const m = s.match(/^(\d{4})[.\-/\s]+(\d{1,2})[.\-/\s]+(\d{1,2})/)
  if (m) {
    return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`
  }
  return s
}

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
      phone: t.phone || '',
      birth_date: t.birth_date || '',
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
      // cellDates: 날짜 셀을 JS Date로 파싱 (미설정 시 Excel serial 숫자로 읽혀 "45321" 같은 값이 저장됨)
      const wb = XLSX.read(buffer, { type: 'array', cellDates: true })
      const ws = wb.Sheets[wb.SheetNames[0]]
      const rows = XLSX.utils.sheet_to_json(ws, { defval: '' })

      const truthy = (v) => {
        if (v === true) return true
        const s = String(v).trim().toLowerCase()
        return s === 'y' || s === 'yes' || s === 'true' || s === 'o' || s === '1' || s === '체크'
      }

      // 전화번호 등 숫자 셀을 문자열로 안전 변환 (지수표기 1.01E+10 방지)
      const cellText = (v) => {
        if (v == null) return ''
        if (v instanceof Date) return formatDateCell(v)
        if (typeof v === 'number') {
          // 정수면 지수표기 없이 그대로, 아니면 toString
          return Number.isInteger(v) ? v.toFixed(0) : String(v)
        }
        return String(v).trim()
      }

      const mapped = rows
        .map((r) => ({
          name: cellText(r['이름'] || r['name']).trim(),
          level: cellText(r['레벨'] || r['level']).trim() || 'Level 1',
          region: cellText(r['지역'] || r['region']).trim(),
          photo_url: cellText(r['사진URL'] || r['사진'] || r['photo_url']).trim(),
          intro: cellText(r['소개'] || r['intro']).trim(),
          phone: cellText(r['전화번호'] || r['phone']).trim(),
          birth_date: parseBirthDate(r['생년월일'] ?? r['birth_date']),
          featured: truthy(r['우수강사'] || r['우수'] || r['featured']),
          ambassador: truthy(r['앰배서더'] || r['ambassador']),
          _delete: truthy(r['삭제'] || r['delete']),
        }))
        .filter((r) => r.name)

      if (mapped.length === 0) {
        setUploadResult({ status: 'error', message: '유효한 강사 데이터(이름 컬럼)가 없습니다.' })
        return
      }

      const result = await dataStore.bulkAddTeachers(mapped)
      const parts = []
      if (result.inserted > 0) parts.push(`${result.inserted}명 등록`)
      if (result.deleted > 0) parts.push(`${result.deleted}명 삭제`)
      if (result.notFound > 0) parts.push(`${result.notFound}명 미발견(삭제 대상 없음)`)
      setUploadResult({
        status: 'ok',
        message: (parts.length ? parts.join(' / ') : '변경사항 없음') + ` · 처리 대상 ${mapped.length}명`,
      })
      await loadData()
    } catch (err) {
      setUploadResult({ status: 'error', message: `업로드 실패: ${err.message || err}` })
    } finally {
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const downloadTemplate = () => {
    const sample = [
      {
        이름: '홍길동',
        레벨: 'Level 2',
        지역: '서울',
        사진URL: '',
        소개: 'SNPE 인증강사',
        전화번호: '010-1234-5678',
        생년월일: '1990-01-01',
        우수강사: 'O',
        앰배서더: '',
        삭제: '',
      },
      {
        이름: '김지영',
        레벨: 'Level 3',
        지역: '경기',
        사진URL: 'https://...',
        소개: '메인 노출 강사',
        전화번호: '010-9876-5432',
        생년월일: '1985-05-20',
        우수강사: 'O',
        앰배서더: 'O',
        삭제: '',
      },
      {
        이름: '이삭제',
        레벨: 'Level 1',
        지역: '부산',
        사진URL: '',
        소개: '',
        전화번호: '010-0000-0000',
        생년월일: '',
        우수강사: '',
        앰배서더: '',
        삭제: 'O',
      },
    ]
    const ws = XLSX.utils.json_to_sheet(sample)
    // 컬럼 너비 설정
    ws['!cols'] = [
      { wch: 10 }, { wch: 10 }, { wch: 8 }, { wch: 30 }, { wch: 20 },
      { wch: 15 }, { wch: 12 }, { wch: 8 }, { wch: 8 }, { wch: 6 },
    ]
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, '인증강사')
    XLSX.writeFile(wb, 'snpe_teachers_template.xlsx')
  }

  // ── 현재 등록된 강사 명단을 엑셀로 다운로드 (재업로드 가능 양식) ─────────
  const downloadCurrentTeachers = () => {
    if (!teachers || teachers.length === 0) {
      setUploadResult({ status: 'error', message: '다운로드할 강사 데이터가 없습니다.' })
      return
    }
    const rows = teachers.map((t) => ({
      이름: t.name || '',
      레벨: t.level || '',
      지역: t.region || '',
      사진URL: t.photo_url || '',
      소개: t.intro || '',
      전화번호: t.phone || '',
      생년월일: t.birth_date || '',
      우수강사: t.featured ? 'O' : '',
      앰배서더: t.ambassador ? 'O' : '',
      삭제: '',
    }))
    const ws = XLSX.utils.json_to_sheet(rows)
    ws['!cols'] = [
      { wch: 10 }, { wch: 10 }, { wch: 8 }, { wch: 30 }, { wch: 20 },
      { wch: 15 }, { wch: 12 }, { wch: 8 }, { wch: 8 }, { wch: 6 },
    ]
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, '인증강사')
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    XLSX.writeFile(wb, `snpe_teachers_${today}.xlsx`)
    setUploadResult({ status: 'ok', message: `${rows.length}명 다운로드 완료` })
  }

  // ── 필터링 ───────────────────────────────────────────────────────────
  const filtered = teachers.filter((t) => {
    if (filter === 'ambassador' && !t.ambassador) return false
    if (filter === 'featured' && !t.featured) return false
    if (query && !`${t.name}${t.region}${t.level}${t.phone || ''}`.includes(query)) return false
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
          <button
            onClick={downloadCurrentTeachers}
            className="flex items-center gap-2 px-3 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm rounded-xl hover:bg-gray-50 transition-colors"
            title="현재 등록된 강사 명단을 업로드 양식과 동일한 형식으로 다운로드합니다."
          >
            <Download size={16} /> 현재 명단 다운로드
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

      {/* 엑셀 업로드 안내 */}
      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 leading-relaxed">
        <span className="font-semibold">엑셀 업로드 안내</span> · 이름·레벨·지역·사진URL·소개·전화번호·생년월일·우수강사·앰배서더 컬럼을 지원합니다.
        <span className="ml-1 font-semibold text-red-600">「삭제」컬럼에 O를 입력하면 해당 강사가 삭제됩니다.</span>
        전화번호·생년월일은 관리자 화면에서만 표시되며 검색 페이지에는 노출되지 않습니다.
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
            placeholder="강사명/지역/레벨/전화번호 검색..."
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
          <span>이름 / 연락처 <span className="text-gray-400 font-normal">(관리자)</span></span>
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
            <div className="min-w-0">
              <span className="font-medium text-gray-900 truncate block">{t.name}</span>
              {(t.phone || t.birth_date) && (
                <span className="text-xs text-gray-400 truncate block">
                  {t.phone && <span className="inline-flex items-center gap-0.5 mr-2"><Phone size={10} />{t.phone}</span>}
                  {t.birth_date && <span className="inline-flex items-center gap-0.5"><Calendar size={10} />{t.birth_date}</span>}
                </span>
              )}
            </div>
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

              {/* 관리자 전용 개인정보 */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <div className="col-span-2 text-xs text-blue-600 font-medium mb-1 flex items-center gap-1">
                  <span>관리자 전용</span>
                  <span className="text-blue-400 font-normal">· 공개 검색에 미노출 (동명이인 확인용)</span>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block flex items-center gap-1">
                    <Phone size={11} /> 전화번호
                  </label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="010-0000-0000"
                    className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block flex items-center gap-1">
                    <Calendar size={11} /> 생년월일
                  </label>
                  <input
                    value={form.birth_date}
                    onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
                    placeholder="1990-01-01"
                    className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">사진</label>
                <ImageUploader
                  value={form.photo_url}
                  onChange={(url) => setForm({ ...form, photo_url: url })}
                  folder="teachers"
                  aspectRatio="1/1"
                  maxSizeMB={2}
                  sizeHint="권장: 500×500px 이하, 정방형(1:1), 2MB 이하"
                />
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
