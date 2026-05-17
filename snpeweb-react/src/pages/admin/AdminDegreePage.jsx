import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { dataStore } from '../../lib/dataStore'
import ImageUploader from '../../components/admin/ImageUploader'
import { Plus, Trash2, Save, RotateCcw, ExternalLink, GraduationCap, Info, Heart, Star, Users, Target, BookOpen, Layers, Award, Sparkles, HeartPulse, Activity, ChevronUp, ChevronDown, GripVertical, ImageIcon } from 'lucide-react'

const ICON_OPTIONS = ['Layers', 'BookOpen', 'Users', 'Target', 'Award', 'Sparkles', 'HeartPulse', 'Activity', 'Heart', 'Star', 'GraduationCap', 'Info']

const SECTION_META = {
  intro:      { icon: Info,        label: '교육 소개',       supportsImage: true,  supportsLayout: true  },
  philosophy: { icon: Heart,       label: '교육 철학',       supportsImage: true,  supportsLayout: true  },
  features:   { icon: Star,        label: '교육 특징',       supportsImage: false, supportsLayout: false, perItemImage: true },
  target:     { icon: Users,       label: '교육 대상',       supportsImage: true,  supportsLayout: true  },
  roadmap:    { icon: Target,      label: '교육 구조 (로드맵)', supportsImage: false, supportsLayout: false, perItemImage: true },
  schedule:   { icon: GraduationCap, label: '교육 일정',     supportsImage: false, supportsLayout: false, external: true },
  career:     { icon: Sparkles,    label: '교육 후 진로',    supportsImage: true,  supportsLayout: true  },
  contact:    { icon: HeartPulse,  label: '문의 안내',       supportsImage: true,  supportsLayout: true  },
}

const DEFAULT_ORDER = ['intro', 'philosophy', 'features', 'target', 'roadmap', 'schedule', 'career', 'contact']

const DEFAULT_CONTENT = {
  _sectionOrder: DEFAULT_ORDER,
  intro: { title: 'SNPE 교육 소개', body: '', image_url: '', layout: 'text-only', image_ratio: 50, hidden: false },
  philosophy: { title: 'SNPE 교육 철학', items: [''], image_url: '', layout: 'text-only', image_ratio: 50, hidden: false },
  features: { title: 'SNPE 교육 특징', items: [{ icon: 'Layers', title: '', desc: '', image_url: '' }], hidden: false },
  target: { title: 'SNPE 교육 대상', intro: '', items: [''], image_url: '', layout: 'text-only', image_ratio: 50, hidden: false },
  roadmap: { title: 'SNPE 교육 구조', intro: '', items: [{ level: 'LEVEL 1', name: '', desc: '', path: '/level1', image_url: '' }], hidden: false },
  career: { title: '교육 후 진로', items: [''], image_url: '', layout: 'text-only', image_ratio: 50, hidden: false },
  contact: { title: '문의 안내', intro: '', team: '', email: '', phone: '', hours: '', image_url: '', layout: 'text-only', image_ratio: 50, hidden: false },
}

const LAYOUT_OPTIONS = [
  { value: 'text-only', label: '텍스트만', icon: '☰' },
  { value: 'image-right', label: '이미지 우측', icon: '◧' },
  { value: 'image-left', label: '이미지 좌측', icon: '◨' },
  { value: 'image-top', label: '이미지 상단', icon: '◓' },
  { value: 'image-bottom', label: '이미지 하단', icon: '◒' },
]

export default function AdminDegreePage() {
  const [form, setForm] = useState(DEFAULT_CONTENT)
  const [original, setOriginal] = useState(DEFAULT_CONTENT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState(null)
  const [draggingKey, setDraggingKey] = useState(null)
  const [dragOverKey, setDragOverKey] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await dataStore.getPageContent('degree')
      const merged = mergeWithDefaults(data)
      setForm(merged)
      setOriginal(JSON.parse(JSON.stringify(merged)))
    } catch (e) {
      console.warn('[AdminDegreePage] load failed:', e)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [])

  const dirty = JSON.stringify(form) !== JSON.stringify(original)

  const save = async () => {
    setSaving(true)
    try {
      await dataStore.updatePageContent('degree', form)
      setOriginal(JSON.parse(JSON.stringify(form)))
      setSavedAt(new Date())
    } catch (e) {
      alert('저장에 실패했습니다: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  const reset = () => {
    if (!dirty || window.confirm('변경 사항이 사라집니다. 되돌리시겠습니까?')) {
      setForm(JSON.parse(JSON.stringify(original)))
    }
  }

  const setSection = (section, updater) => {
    setForm((prev) => ({ ...prev, [section]: updater(prev[section] || {}) }))
  }

  // 섹션 드래그앤드롭 순서 변경
  const handleDragStart = (key) => setDraggingKey(key)
  const handleDragOver = (e, key) => {
    e.preventDefault()
    if (key !== draggingKey) setDragOverKey(key)
  }
  const handleDragEnd = () => { setDraggingKey(null); setDragOverKey(null) }
  const handleDrop = (e, targetKey) => {
    e.preventDefault()
    if (!draggingKey || draggingKey === targetKey) return handleDragEnd()
    const order = form._sectionOrder || DEFAULT_ORDER
    const fromIdx = order.indexOf(draggingKey)
    const toIdx = order.indexOf(targetKey)
    if (fromIdx === -1 || toIdx === -1) return handleDragEnd()
    const newOrder = [...order]
    newOrder.splice(fromIdx, 1)
    newOrder.splice(toIdx, 0, draggingKey)
    setForm((prev) => ({ ...prev, _sectionOrder: newOrder }))
    handleDragEnd()
  }

  const moveSection = (key, dir) => {
    const order = form._sectionOrder || DEFAULT_ORDER
    const idx = order.indexOf(key)
    const newIdx = idx + dir
    if (idx === -1 || newIdx < 0 || newIdx >= order.length) return
    const newOrder = [...order]
    ;[newOrder[idx], newOrder[newIdx]] = [newOrder[newIdx], newOrder[idx]]
    setForm((prev) => ({ ...prev, _sectionOrder: newOrder }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full" />
      </div>
    )
  }

  const sectionOrder = form._sectionOrder || DEFAULT_ORDER

  return (
    <div className="pb-24">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">자격증 안내 페이지 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            <Link to="/degree" target="_blank" className="text-blue-600 hover:underline inline-flex items-center gap-1">
              /degree <ExternalLink size={12} />
            </Link>
            {' '}섹션을 드래그해 순서를 바꾸고, 각 섹션에 이미지·레이아웃을 설정하세요.
          </p>
        </div>
      </div>

      {/* 안내 박스 */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4 text-xs text-blue-800 flex items-start gap-2">
        <GripVertical size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <span>섹션 헤더의 손잡이(⋮⋮)를 잡고 드래그하면 순서를 바꿀 수 있습니다. 우측 화살표 버튼도 사용 가능합니다.</span>
      </div>

      {/* 섹션 렌더링 */}
      {sectionOrder.map((key, idx) => {
        const meta = SECTION_META[key]
        if (!meta) return null
        return (
          <SectionCard
            key={key}
            sectionKey={key}
            meta={meta}
            section={form[key] || {}}
            updateSection={(updater) => setSection(key, updater)}
            isFirst={idx === 0}
            isLast={idx === sectionOrder.length - 1}
            onMoveUp={() => moveSection(key, -1)}
            onMoveDown={() => moveSection(key, 1)}
            isDragging={draggingKey === key}
            isDragOver={dragOverKey === key}
            onDragStart={() => handleDragStart(key)}
            onDragOver={(e) => handleDragOver(e, key)}
            onDrop={(e) => handleDrop(e, key)}
            onDragEnd={handleDragEnd}
          />
        )
      })}

      {/* 하단 고정 저장 바 */}
      <div className="fixed bottom-0 left-60 right-0 bg-white border-t border-gray-200 px-6 md:px-8 py-4 flex items-center justify-between z-30">
        <div className="text-xs text-gray-500">
          {dirty ? (
            <span className="text-amber-600 font-medium">● 저장되지 않은 변경사항</span>
          ) : savedAt ? (
            <span className="text-green-600">✓ {savedAt.toLocaleTimeString()} 저장 완료</span>
          ) : (
            <span>변경사항 없음</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            disabled={!dirty || saving}
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40"
          >
            <RotateCcw size={14} /> 되돌리기
          </button>
          <button
            onClick={save}
            disabled={!dirty || saving}
            className="flex items-center gap-1.5 px-5 py-2 bg-gray-900 text-white text-sm rounded-xl hover:bg-gray-800 disabled:opacity-40"
          >
            <Save size={14} /> {saving ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          height: 38px;
          padding: 0 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          font-size: 14px;
          outline: none;
          transition: border-color .15s;
        }
        .input:focus { border-color: #9ca3af; }
        textarea.input { height: auto; padding: 8px 12px; }
      `}</style>
    </div>
  )
}

// ─── SectionCard: 섹션 1개 (드래그 가능) ─────────────────────────────────

function SectionCard({
  sectionKey, meta, section, updateSection,
  isFirst, isLast, onMoveUp, onMoveDown,
  isDragging, isDragOver,
  onDragStart, onDragOver, onDrop, onDragEnd,
}) {
  const Icon = meta.icon
  const [expanded, setExpanded] = useState(true)

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={`bg-white rounded-2xl border mb-3 transition-all ${
        isDragging ? 'opacity-30 border-gray-300' :
        isDragOver ? 'border-blue-400 shadow-lg ring-2 ring-blue-200' :
        section.hidden ? 'border-gray-200 opacity-60' :
        'border-gray-100'
      }`}
    >
      {/* 헤더 */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
        <span className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-700" title="드래그해서 순서 변경">
          <GripVertical size={18} />
        </span>
        <Icon size={18} className="text-gray-700" />
        <h2 className="text-base font-bold text-gray-900 flex-1">
          {meta.label}
          {section.hidden && <span className="ml-2 text-xs font-normal text-gray-400">(숨김)</span>}
        </h2>

        {!meta.external && (
          <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer mr-2">
            <input
              type="checkbox"
              checked={!section.hidden}
              onChange={(e) => updateSection((s) => ({ ...s, hidden: !e.target.checked }))}
              className="accent-gray-800"
            />
            표시
          </label>
        )}

        <button onClick={onMoveUp} disabled={isFirst} className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30" type="button">
          <ChevronUp size={16} />
        </button>
        <button onClick={onMoveDown} disabled={isLast} className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30" type="button">
          <ChevronDown size={16} />
        </button>
        <button onClick={() => setExpanded((v) => !v)} className="p-1 text-gray-400 hover:text-gray-700 ml-2 text-xs" type="button">
          {expanded ? '접기' : '펼치기'}
        </button>
      </div>

      {expanded && (
        <div className="p-5 space-y-4">
          {meta.external ? (
            <ScheduleNotice />
          ) : (
            <SectionEditor sectionKey={sectionKey} section={section} updateSection={updateSection} meta={meta} />
          )}
        </div>
      )}
    </div>
  )
}

// ─── SectionEditor: 섹션 종류별 편집 폼 ─────────────────────────────────

function SectionEditor({ sectionKey, section, updateSection, meta }) {
  // 공통: 제목
  const titleField = (
    <Field label="섹션 제목">
      <input
        type="text"
        value={section.title || ''}
        onChange={(e) => updateSection((s) => ({ ...s, title: e.target.value }))}
        className="input"
      />
    </Field>
  )

  // 공통: 레이아웃 + 이미지 (지원 섹션만)
  const layoutBlock = meta.supportsLayout && (
    <LayoutBlock section={section} updateSection={updateSection} folder={sectionKey} />
  )

  switch (sectionKey) {
    case 'intro':
      return (
        <>
          {titleField}
          <Field label="본문">
            <textarea
              value={section.body || ''}
              onChange={(e) => updateSection((s) => ({ ...s, body: e.target.value }))}
              rows={4}
              className="input resize-none"
              placeholder="줄바꿈하려면 Enter"
            />
          </Field>
          {layoutBlock}
        </>
      )

    case 'philosophy':
    case 'career':
      return (
        <>
          {titleField}
          <BulletList
            items={section.items || []}
            onChange={(items) => updateSection((s) => ({ ...s, items }))}
            label="bullet 항목"
          />
          {layoutBlock}
        </>
      )

    case 'target':
      return (
        <>
          {titleField}
          <Field label="인트로 문구">
            <textarea
              value={section.intro || ''}
              onChange={(e) => updateSection((s) => ({ ...s, intro: e.target.value }))}
              rows={2}
              className="input resize-none"
            />
          </Field>
          <BulletList
            items={section.items || []}
            onChange={(items) => updateSection((s) => ({ ...s, items }))}
            label="대상 항목"
          />
          {layoutBlock}
        </>
      )

    case 'features':
      return (
        <>
          {titleField}
          <FeaturesEditor
            items={section.items || []}
            onChange={(items) => updateSection((s) => ({ ...s, items }))}
          />
        </>
      )

    case 'roadmap':
      return (
        <>
          {titleField}
          <Field label="인트로 문구">
            <textarea
              value={section.intro || ''}
              onChange={(e) => updateSection((s) => ({ ...s, intro: e.target.value }))}
              rows={2}
              className="input resize-none"
            />
          </Field>
          <RoadmapEditor
            items={section.items || []}
            onChange={(items) => updateSection((s) => ({ ...s, items }))}
          />
        </>
      )

    case 'contact':
      return (
        <>
          {titleField}
          <Field label="인트로 문구">
            <input
              type="text"
              value={section.intro || ''}
              onChange={(e) => updateSection((s) => ({ ...s, intro: e.target.value }))}
              className="input"
            />
          </Field>
          <Field label="담당팀">
            <input
              type="text"
              value={section.team || ''}
              onChange={(e) => updateSection((s) => ({ ...s, team: e.target.value }))}
              className="input"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="이메일">
              <input
                type="email"
                value={section.email || ''}
                onChange={(e) => updateSection((s) => ({ ...s, email: e.target.value }))}
                className="input"
              />
            </Field>
            <Field label="전화번호">
              <input
                type="text"
                value={section.phone || ''}
                onChange={(e) => updateSection((s) => ({ ...s, phone: e.target.value }))}
                className="input"
              />
            </Field>
          </div>
          <Field label="상담 가능 시간">
            <input
              type="text"
              value={section.hours || ''}
              onChange={(e) => updateSection((s) => ({ ...s, hours: e.target.value }))}
              className="input"
              placeholder="평일 10:00 ~ 16:00"
            />
          </Field>
          {layoutBlock}
        </>
      )

    default:
      return null
  }
}

// ─── LayoutBlock: 이미지 + 레이아웃/비율 설정 ────────────────────────────

function LayoutBlock({ section, updateSection, folder }) {
  const layout = section.layout || 'text-only'
  const ratio = section.image_ratio ?? 50
  const hasImage = layout !== 'text-only'
  const showRatio = layout === 'image-left' || layout === 'image-right'

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <ImageIcon size={14} className="text-gray-500" />
        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">레이아웃 & 이미지</span>
      </div>

      {/* 레이아웃 선택 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {LAYOUT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => updateSection((s) => ({ ...s, layout: opt.value }))}
            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
              layout === opt.value
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="text-base leading-none">{opt.icon}</span>
            {opt.label}
          </button>
        ))}
      </div>

      {/* 이미지 업로더 */}
      {hasImage && (
        <div className="space-y-3">
          <ImageUploader
            value={section.image_url || ''}
            onChange={(url) => updateSection((s) => ({ ...s, image_url: url }))}
            folder={folder}
            aspectRatio="16/10"
          />

          {/* 좌우 비율 슬라이더 */}
          {showRatio && section.image_url && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-gray-600">이미지 너비 비율</label>
                <span className="text-xs text-gray-500 font-mono">
                  {layout === 'image-left' ? `이미지 ${ratio}% : 텍스트 ${100 - ratio}%` : `텍스트 ${100 - ratio}% : 이미지 ${ratio}%`}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="70"
                step="5"
                value={ratio}
                onChange={(e) => updateSection((s) => ({ ...s, image_ratio: Number(e.target.value) }))}
                className="w-full accent-gray-800"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                <span>20%</span>
                <span>50%</span>
                <span>70%</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── FeaturesEditor: 특징 카드 (아이콘 + 이미지 옵션) ───────────────────

function FeaturesEditor({ items, onChange }) {
  const update = (i, value) => onChange(items.map((it, idx) => (idx === i ? value : it)))
  const add = () => onChange([...items, { icon: 'Layers', title: '', desc: '', image_url: '' }])
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))
  const move = (i, dir) => {
    const arr = [...items]
    const j = i + dir
    if (j < 0 || j >= arr.length) return
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
    onChange(arr)
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-gray-700">특징 카드</p>
      {items.map((item, i) => (
        <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-3 relative">
          <ItemControls
            onUp={() => move(i, -1)}
            onDown={() => move(i, 1)}
            onRemove={() => remove(i)}
            first={i === 0}
            last={i === items.length - 1}
          />
          <div className="grid grid-cols-[120px_1fr] gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">아이콘</label>
              <select
                value={item.icon || 'Layers'}
                onChange={(e) => update(i, { ...item, icon: e.target.value })}
                className="input"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="카드 제목"
                value={item.title || ''}
                onChange={(e) => update(i, { ...item, title: e.target.value })}
                className="input"
              />
              <textarea
                placeholder="설명"
                value={item.desc || ''}
                onChange={(e) => update(i, { ...item, desc: e.target.value })}
                rows={2}
                className="input resize-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">카드 이미지 (선택)</label>
            <ImageUploader
              value={item.image_url || ''}
              onChange={(url) => update(i, { ...item, image_url: url })}
              folder="features"
              aspectRatio="16/9"
            />
          </div>
        </div>
      ))}
      <button
        onClick={add}
        type="button"
        className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
      >
        <Plus size={14} /> 특징 카드 추가
      </button>
    </div>
  )
}

// ─── RoadmapEditor: 레벨 카드 (이미지 옵션) ──────────────────────────────

function RoadmapEditor({ items, onChange }) {
  const update = (i, value) => onChange(items.map((it, idx) => (idx === i ? value : it)))
  const add = () => onChange([...items, { level: '', name: '', desc: '', path: '', image_url: '' }])
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))
  const move = (i, dir) => {
    const arr = [...items]
    const j = i + dir
    if (j < 0 || j >= arr.length) return
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
    onChange(arr)
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-gray-700">레벨 카드</p>
      {items.map((item, i) => (
        <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-2 relative">
          <ItemControls
            onUp={() => move(i, -1)}
            onDown={() => move(i, 1)}
            onRemove={() => remove(i)}
            first={i === 0}
            last={i === items.length - 1}
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="레벨 (예: LEVEL 1)"
              value={item.level || ''}
              onChange={(e) => update(i, { ...item, level: e.target.value })}
              className="input"
            />
            <input
              type="text"
              placeholder="링크 경로 (예: /level1)"
              value={item.path || ''}
              onChange={(e) => update(i, { ...item, path: e.target.value })}
              className="input"
            />
          </div>
          <input
            type="text"
            placeholder="과정명"
            value={item.name || ''}
            onChange={(e) => update(i, { ...item, name: e.target.value })}
            className="input"
          />
          <input
            type="text"
            placeholder="간단 설명"
            value={item.desc || ''}
            onChange={(e) => update(i, { ...item, desc: e.target.value })}
            className="input"
          />
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">레벨 카드 이미지 (선택)</label>
            <ImageUploader
              value={item.image_url || ''}
              onChange={(url) => update(i, { ...item, image_url: url })}
              folder="roadmap"
              aspectRatio="16/10"
            />
          </div>
        </div>
      ))}
      <button
        onClick={add}
        type="button"
        className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
      >
        <Plus size={14} /> 레벨 카드 추가
      </button>
    </div>
  )
}

// ─── ScheduleNotice: 일정 섹션 안내 ─────────────────────────────────────

function ScheduleNotice() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-900">
      <p className="font-medium mb-1">일정 표는 별도 메뉴에서 관리됩니다</p>
      <p className="text-blue-700 text-xs mb-3">
        과정/기간/장소/모집 상태/신청 URL은{' '}
        <Link to="/admin/educations" className="underline font-medium">교육과정 일정 관리</Link>
        에서 카테고리별(LEVEL 1/2/3)로 등록하시면 자격증 안내 페이지에 자동 표시됩니다.
      </p>
      <Link
        to="/admin/educations"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700"
      >
        교육과정 일정 관리로 이동 <ExternalLink size={12} />
      </Link>
    </div>
  )
}

// ─── 공용 서브 컴포넌트 ─────────────────────────────────────────────────

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  )
}

function BulletList({ label, items, onChange }) {
  const update = (i, value) => onChange(items.map((it, idx) => (idx === i ? value : it)))
  const add = () => onChange([...items, ''])
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))
  const move = (i, dir) => {
    const arr = [...items]
    const j = i + dir
    if (j < 0 || j >= arr.length) return
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
    onChange(arr)
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-gray-700">{label}</p>
      {items.map((it, i) => (
        <div key={i} className="flex items-start gap-2">
          <textarea
            value={it}
            onChange={(e) => update(i, e.target.value)}
            rows={1}
            className="input resize-none min-h-[38px] flex-1"
          />
          <div className="flex flex-col gap-0.5 pt-1">
            <button onClick={() => move(i, -1)} disabled={i === 0} className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-30" type="button">
              <ChevronUp size={14} />
            </button>
            <button onClick={() => move(i, 1)} disabled={i === items.length - 1} className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-30" type="button">
              <ChevronDown size={14} />
            </button>
          </div>
          <button onClick={() => remove(i)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg" type="button">
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        onClick={add}
        type="button"
        className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-xs text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
      >
        <Plus size={12} /> 항목 추가
      </button>
    </div>
  )
}

function ItemControls({ onUp, onDown, onRemove, first, last }) {
  return (
    <div className="absolute top-3 right-3 flex items-center gap-1">
      <button onClick={onUp} disabled={first} className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30" type="button">
        <ChevronUp size={14} />
      </button>
      <button onClick={onDown} disabled={last} className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30" type="button">
        <ChevronDown size={14} />
      </button>
      <button onClick={onRemove} className="p-1 text-red-400 hover:bg-red-50 rounded" type="button">
        <Trash2 size={14} />
      </button>
    </div>
  )
}

// ─── 헬퍼 ───────────────────────────────────────────────────────────────

function mergeWithDefaults(data) {
  if (!data) return JSON.parse(JSON.stringify(DEFAULT_CONTENT))
  const merged = { ...DEFAULT_CONTENT, ...data }
  // section_order 보정
  const order = data._sectionOrder || DEFAULT_ORDER
  // 기본 섹션 모두 포함, 누락은 추가
  const fullOrder = [...new Set([...order, ...DEFAULT_ORDER])]
  merged._sectionOrder = fullOrder.filter((k) => SECTION_META[k])
  // 각 섹션 default 병합
  Object.keys(SECTION_META).forEach((key) => {
    merged[key] = { ...(DEFAULT_CONTENT[key] || {}), ...(data[key] || {}) }
  })
  return merged
}
