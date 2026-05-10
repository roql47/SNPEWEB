import { useState, useEffect } from 'react'
import { dataStore } from '../../lib/dataStore'
import { Trash2, X, Mail, Phone, Building2, Calendar, MapPin, Users, Briefcase } from 'lucide-react'

const STATUS = [
  { value: 'new', label: '신규', color: 'bg-blue-100 text-blue-700' },
  { value: 'in_progress', label: '상담 중', color: 'bg-amber-100 text-amber-700' },
  { value: 'done', label: '완료', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'canceled', label: '취소', color: 'bg-gray-100 text-gray-500' },
]

const REQUEST_TYPE = {
  'one-time': '1회 특강',
  'regular': '정기 프로그램',
  'wellness': '임직원 웰니스',
  'etc': '기타',
}

const LOCATION_TYPE = {
  onsite: '방문 출강',
  center: '센터 진행',
  online: '온라인',
}

const FRANCHISE_TYPE = { center: 'SNPE 전문센터 (가맹점)', studio: 'SNPE STUDIO (인증점)' }
const CERT_LEVEL = {
  level2: 'LEVEL 2 자격 취득',
  level3: 'LEVEL 3 전문가 과정 이수',
  inProgress: '교육 수강 중',
  none: '미보유',
}
const HAS_SPACE = { owned: '보유 중', reviewing: '검토 중', none: '미보유' }
const TIMING = { immediate: '즉시 (1~2개월)', '3months': '3개월 이내', '6months': '6개월 이내', inquiry: '단순 문의' }

export default function AdminInquiries() {
  const [tab, setTab] = useState('inquiries')
  const [inquiries, setInquiries] = useState([])
  const [franchiseInquiries, setFranchiseInquiries] = useState([])
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const loadData = async () => {
    const [a, b] = await Promise.all([
      dataStore.getInquiries(),
      dataStore.getFranchiseInquiries(),
    ])
    setInquiries(a)
    setFranchiseInquiries(b)
  }
  useEffect(() => { loadData() }, [])

  const rows = tab === 'inquiries' ? inquiries : franchiseInquiries
  const filtered = filter === 'all' ? rows : rows.filter((r) => r.status === filter)
  const counts = STATUS.reduce((acc, s) => {
    acc[s.value] = rows.filter((r) => r.status === s.value).length
    return acc
  }, {})

  const updateStatus = async (id, status) => {
    if (tab === 'inquiries') {
      await dataStore.updateInquiry(id, { status })
    } else {
      await dataStore.updateFranchiseInquiry(id, { status })
    }
    await loadData()
    if (selected && selected.id === id) {
      setSelected({ ...selected, status })
    }
  }

  const updateNote = async (id, admin_note) => {
    if (tab === 'inquiries') {
      await dataStore.updateInquiry(id, { admin_note })
    } else {
      await dataStore.updateFranchiseInquiry(id, { admin_note })
    }
    await loadData()
  }

  const remove = async (id) => {
    if (!confirm('이 문의를 삭제하시겠습니까? 복구할 수 없습니다.')) return
    if (tab === 'inquiries') {
      await dataStore.deleteInquiry(id)
    } else {
      await dataStore.deleteFranchiseInquiry(id)
    }
    setSelected(null)
    await loadData()
  }

  const formatDate = (iso) => {
    if (!iso) return ''
    const d = new Date(iso)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  const statusInfo = (s) => STATUS.find((x) => x.value === s) || STATUS[0]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">신청·문의 관리</h1>
        <p className="text-sm text-gray-500 mt-1">
          기업특강 신청 {inquiries.length}건 · 가맹점 개설 문의 {franchiseInquiries.length}건
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => { setTab('inquiries'); setFilter('all') }}
          className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
            tab === 'inquiries' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          기업특강 신청
          <span className="ml-2 text-xs text-gray-400">{inquiries.length}</span>
        </button>
        <button
          onClick={() => { setTab('franchise'); setFilter('all') }}
          className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
            tab === 'franchise' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          가맹점·인증점 개설 문의
          <span className="ml-2 text-xs text-gray-400">{franchiseInquiries.length}</span>
        </button>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            filter === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
          }`}
        >
          전체 <span className={filter === 'all' ? 'text-white/70' : 'text-gray-400'}>{rows.length}</span>
        </button>
        {STATUS.map((s) => (
          <button
            key={s.value}
            onClick={() => setFilter(s.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === s.value ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            {s.label}
            {counts[s.value] > 0 && (
              <span className={`ml-1.5 ${filter === s.value ? 'text-white/70' : 'text-gray-400'}`}>{counts[s.value]}</span>
            )}
          </button>
        ))}
      </div>

      {/* Inquiry table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="text-left px-4 py-3 font-medium w-32">접수일시</th>
                {tab === 'inquiries' ? (
                  <>
                    <th className="text-left px-4 py-3 font-medium">회사/기관</th>
                    <th className="text-left px-4 py-3 font-medium w-24">담당자</th>
                    <th className="text-left px-4 py-3 font-medium w-32">연락처</th>
                    <th className="text-left px-4 py-3 font-medium w-28">신청 유형</th>
                  </>
                ) : (
                  <>
                    <th className="text-left px-4 py-3 font-medium w-32">유형</th>
                    <th className="text-left px-4 py-3 font-medium w-24">성함</th>
                    <th className="text-left px-4 py-3 font-medium w-32">연락처</th>
                    <th className="text-left px-4 py-3 font-medium">희망 지역</th>
                    <th className="text-left px-4 py-3 font-medium w-28">개설 시기</th>
                  </>
                )}
                <th className="text-center px-4 py-3 font-medium w-24">상태</th>
                <th className="text-center px-4 py-3 font-medium w-24">관리</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const st = statusInfo(r.status)
                return (
                  <tr key={r.id} className="border-t border-gray-50 hover:bg-gray-50/50 cursor-pointer" onClick={() => setSelected(r)}>
                    <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(r.created_at)}</td>
                    {tab === 'inquiries' ? (
                      <>
                        <td className="px-4 py-3 font-medium text-gray-900 truncate max-w-[180px]">{r.organization}</td>
                        <td className="px-4 py-3 text-gray-700">{r.manager}</td>
                        <td className="px-4 py-3 text-gray-600">{r.phone}</td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{REQUEST_TYPE[r.request_type] || r.request_type || '-'}</td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 text-gray-700 text-xs">{FRANCHISE_TYPE[r.type] || r.type}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">{r.name}</td>
                        <td className="px-4 py-3 text-gray-600">{r.phone}</td>
                        <td className="px-4 py-3 text-gray-600 truncate max-w-[180px]">{r.region}</td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{TIMING[r.timing] || '-'}</td>
                      </>
                    )}
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${st.color}`}>{st.label}</span>
                    </td>
                    <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => remove(r.id)} className="p-1.5 hover:bg-red-50 rounded-lg">
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-400 text-sm">
                    표시할 문의가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <DetailModal
          item={selected}
          tab={tab}
          onClose={() => setSelected(null)}
          onStatus={updateStatus}
          onNote={updateNote}
          formatDate={formatDate}
        />
      )}
    </div>
  )
}

function DetailModal({ item, tab, onClose, onStatus, onNote, formatDate }) {
  const [note, setNote] = useState(item.admin_note || '')
  const [savingNote, setSavingNote] = useState(false)

  const saveNote = async () => {
    setSavingNote(true)
    await onNote(item.id, note)
    setSavingNote(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">{formatDate(item.created_at)}</p>
            <h2 className="text-lg font-bold text-gray-900 mt-0.5">
              {tab === 'inquiries' ? item.organization : `${FRANCHISE_TYPE[item.type] || item.type} — ${item.name}`}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><X size={20} /></button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status selector */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">처리 상태</label>
            <div className="flex flex-wrap gap-2">
              {STATUS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => onStatus(item.id, s.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    item.status === s.value ? `${s.color} ring-2 ring-offset-1 ring-gray-300` : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Detail fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            {tab === 'inquiries' ? (
              <>
                <DetailRow icon={Building2} label="회사/기관명" value={item.organization} />
                <DetailRow icon={Users} label="담당자" value={item.manager} />
                <DetailRow icon={Phone} label="연락처" value={item.phone} link={`tel:${item.phone}`} />
                <DetailRow icon={Mail} label="이메일" value={item.email} link={`mailto:${item.email}`} />
                <DetailRow icon={Calendar} label="희망 일시" value={item.preferred_date} />
                <DetailRow icon={Users} label="예상 인원" value={item.participants ? `${item.participants}명` : null} />
                <DetailRow icon={MapPin} label="진행 장소 유형" value={LOCATION_TYPE[item.location_type] || item.location_type} />
                <DetailRow icon={Briefcase} label="신청 유형" value={REQUEST_TYPE[item.request_type] || item.request_type} />
                <DetailRow icon={MapPin} label="진행 희망 장소" value={item.address} fullWidth />
                <DetailRow label="예산 범위" value={item.budget} fullWidth />
                <DetailRow label="요청 내용" value={item.message} fullWidth multiline />
              </>
            ) : (
              <>
                <DetailRow icon={Building2} label="신청 모델" value={FRANCHISE_TYPE[item.type] || item.type} />
                <DetailRow icon={Users} label="성함" value={item.name} />
                <DetailRow icon={Phone} label="연락처" value={item.phone} link={`tel:${item.phone}`} />
                <DetailRow label="자격증 보유" value={CERT_LEVEL[item.cert_level] || item.cert_level} />
                <DetailRow icon={MapPin} label="개설 희망 지역" value={item.region} fullWidth />
                <DetailRow label="입지 보유 여부" value={HAS_SPACE[item.has_space] || item.has_space} />
                <DetailRow icon={Calendar} label="개설 희망 시기" value={TIMING[item.timing] || item.timing} />
                <DetailRow label="기타 문의 사항" value={item.note} fullWidth multiline />
              </>
            )}
          </div>

          {/* Admin note */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">관리자 메모</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="상담 내용, 후속 조치 등을 기록하세요."
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm resize-none focus:outline-none focus:border-gray-400"
            />
            <button
              onClick={saveNote}
              disabled={savingNote || note === (item.admin_note || '')}
              className="mt-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {savingNote ? '저장 중...' : '메모 저장'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ icon: Icon, label, value, link, fullWidth, multiline }) {
  if (!value) return null
  return (
    <div className={fullWidth ? 'sm:col-span-2' : ''}>
      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1">
        {Icon && <Icon size={12} />}
        {label}
      </div>
      {link ? (
        <a href={link} className="text-sm text-gray-900 hover:text-blue-600 break-words">{value}</a>
      ) : (
        <p className={`text-sm text-gray-900 break-words ${multiline ? 'whitespace-pre-line leading-relaxed' : ''}`}>
          {value}
        </p>
      )}
    </div>
  )
}
