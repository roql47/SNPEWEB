import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { dataStore } from '../../lib/dataStore'
import RichTextEditor from '../../components/admin/RichTextEditor'
import ImageUploader from '../../components/admin/ImageUploader'
import { Save, RotateCcw, Plus, Trash2, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react'

const TABS = [
  { slug: 'level1', label: 'LEVEL 1', path: '/level1' },
  { slug: 'level2', label: 'LEVEL 2', path: '/level2' },
  { slug: 'level3', label: 'LEVEL 3', path: '/level3' },
  { slug: 'master', label: 'MASTER',  path: '/master' },
]

const DEFAULT = {
  label: '',
  course_name: '',
  intro: [''],
  goals: [''],
  targets: [''],
  summary: [{ label: '', value: '' }],
  features: [],
  curriculum: [],
  instructors: [],
}

export default function AdminLevelPage() {
  const [activeSlug, setActiveSlug] = useState('level1')
  const [forms, setForms] = useState({})
  const [originals, setOriginals] = useState({})
  const [loadedSlugs, setLoadedSlugs] = useState(new Set())
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState(null)

  const loadSlug = async (slug) => {
    if (loadedSlugs.has(slug)) return
    try {
      const data = await dataStore.getPageContent(slug)
      const merged = data ? { ...DEFAULT, ...data } : { ...DEFAULT }
      setForms((prev) => ({ ...prev, [slug]: merged }))
      setOriginals((prev) => ({ ...prev, [slug]: JSON.parse(JSON.stringify(merged)) }))
      setLoadedSlugs((prev) => new Set([...prev, slug]))
    } catch (e) {
      console.warn('[AdminLevelPage] load failed:', e)
    }
  }

  useEffect(() => { loadSlug(activeSlug) }, [activeSlug])

  const form = forms[activeSlug] || DEFAULT
  const original = originals[activeSlug]
  const dirty = original && JSON.stringify(form) !== JSON.stringify(original)

  const setForm = (updater) =>
    setForms((prev) => ({ ...prev, [activeSlug]: updater(prev[activeSlug] || DEFAULT) }))

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const save = async () => {
    setSaving(true)
    try {
      await dataStore.updatePageContent(activeSlug, form)
      setOriginals((prev) => ({ ...prev, [activeSlug]: JSON.parse(JSON.stringify(form)) }))
      setSavedAt(new Date())
    } catch (e) {
      alert('저장 실패: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  const reset = () => {
    if (!dirty || window.confirm('변경 사항이 사라집니다. 되돌리시겠습니까?')) {
      setForms((prev) => ({ ...prev, [activeSlug]: JSON.parse(JSON.stringify(original)) }))
    }
  }

  const isMaster = activeSlug === 'master'
  const isLevel1 = activeSlug === 'level1'
  const isLevel2 = activeSlug === 'level2'

  return (
    <div className="pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">교육과정 페이지 관리</h1>
        <p className="text-sm text-gray-500 mt-1">LEVEL 1 / 2 / 3 / MASTER 페이지 내용을 편집합니다.</p>
      </div>

      {/* 탭 */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {TABS.map((t) => (
          <button
            key={t.slug}
            onClick={() => setActiveSlug(t.slug)}
            className={`px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeSlug === t.slug
                ? 'border-mint text-mint'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {t.label}
            {forms[t.slug] && originals[t.slug] &&
              JSON.stringify(forms[t.slug]) !== JSON.stringify(originals[t.slug]) && (
              <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 inline-block align-middle" />
            )}
          </button>
        ))}
        <div className="ml-auto flex items-center pb-1">
          <Link
            to={TABS.find((t) => t.slug === activeSlug)?.path || '/'}
            target="_blank"
            className="text-xs text-blue-500 hover:underline flex items-center gap-1"
          >
            사이트에서 보기 <ExternalLink size={11} />
          </Link>
        </div>
      </div>

      {!loadedSlugs.has(activeSlug) ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full" />
        </div>
      ) : (
        <div className="space-y-4">
          {/* 기본 정보 */}
          <Card title="기본 정보">
            <div className="grid grid-cols-2 gap-4">
              <Field label="레이블 (예: LEVEL 1)">
                <input value={form.label || ''} onChange={(e) => set('label', e.target.value)} className="input" />
              </Field>
              <Field label="과정명">
                <input value={form.course_name || ''} onChange={(e) => set('course_name', e.target.value)} className="input" />
              </Field>
            </div>
          </Card>

          {/* 소개 */}
          <Card title="과정 소개">
            <Field label="소개 문구 (Rich Text)">
              <RichTextEditor
                value={form.intro_html || (Array.isArray(form.intro) ? form.intro.join('\n') : form.intro || '')}
                onChange={(html) => set('intro_html', html)}
                folder={activeSlug}
                minHeight="120px"
                placeholder="과정 소개 문구를 입력하세요"
              />
            </Field>
          </Card>

          {/* 교육 목표 */}
          {!isMaster && (
            <Card title="교육 목표">
              <BulletListEditor
                items={form.goals || []}
                onChange={(v) => set('goals', v)}
                placeholder="예: SNPE 운동 기본 원리 이해"
              />
            </Card>
          )}

          {/* 교육 대상 */}
          {!isMaster && (
            <Card title="교육 대상">
              <BulletListEditor
                items={form.targets || []}
                onChange={(v) => set('targets', v)}
                placeholder="예: SNPE 운동을 처음 배우는 분"
              />
            </Card>
          )}

          {/* 요약 카드 (과정 유형 / 이수 결과 등) */}
          <Card title="요약 정보 카드">
            <div className="space-y-2">
              {(form.summary || []).map((item, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <input
                    value={item.label}
                    onChange={(e) => {
                      const arr = [...form.summary]
                      arr[i] = { ...arr[i], label: e.target.value }
                      set('summary', arr)
                    }}
                    placeholder="라벨 (예: 과정 유형)"
                    className="input w-36 flex-shrink-0"
                  />
                  <input
                    value={item.value}
                    onChange={(e) => {
                      const arr = [...form.summary]
                      arr[i] = { ...arr[i], value: e.target.value }
                      set('summary', arr)
                    }}
                    placeholder="내용"
                    className="input flex-1"
                  />
                  <button onClick={() => set('summary', form.summary.filter((_, idx) => idx !== i))} className="p-2 text-red-400 hover:bg-red-50 rounded-lg">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => set('summary', [...(form.summary || []), { label: '', value: '' }])}
                className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-xs text-gray-500 hover:border-gray-300 flex items-center justify-center gap-1"
              >
                <Plus size={12} /> 항목 추가
              </button>
            </div>
          </Card>

          {/* LEVEL 1 전용: 접수 및 마감 정보 */}
          {isLevel1 && (
            <Card title="접수 및 마감 정보 (LEVEL 1 페이지)">
              <p className="text-xs text-gray-500 mb-4 -mt-1">
                LEVEL 1 페이지 교육일정 박스의 「접수 및 마감 정보」와 하단 접수 안내 배너에 표시됩니다.
                비워두면 페이지의 기본 문구가 그대로 유지됩니다.
                <br />
                ※ 개강일 · 수업 시간 · 수강료 · 수련 장소는 <b>교육과정 일정 관리</b>에서 수정합니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="접수 시작">
                  <input
                    value={form.enroll_start || ''}
                    onChange={(e) => set('enroll_start', e.target.value)}
                    className="input"
                    placeholder="예: 9월 1일"
                  />
                </Field>
                <Field label="모집 정원">
                  <input
                    value={form.enroll_capacity || ''}
                    onChange={(e) => set('enroll_capacity', e.target.value)}
                    className="input"
                    placeholder="예: 20명 한정 운영 (선착순 마감)"
                  />
                </Field>
                <Field label="신청 방법">
                  <input
                    value={form.enroll_method || ''}
                    onChange={(e) => set('enroll_method', e.target.value)}
                    className="input"
                    placeholder="예: 하단 신청하기 링크 참조"
                  />
                </Field>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="하단 접수 안내 배너 문구">
                  <input
                    value={form.enroll_notice || ''}
                    onChange={(e) => set('enroll_notice', e.target.value)}
                    className="input"
                    placeholder="예: 접수 시작 9월 1일 · 20명 한정 선착순 마감"
                  />
                </Field>
                <Field label="신청하기 버튼 링크">
                  <input
                    type="url"
                    value={form.apply_url || ''}
                    onChange={(e) => set('apply_url', e.target.value)}
                    className="input"
                    placeholder="https://www.s-ground.co.kr/course/..."
                  />
                </Field>
              </div>
            </Card>
          )}

          {/* LEVEL 1 전용: 수강 혜택 카드뉴스 이미지 */}
          {isLevel1 && (
            <Card title="수강 혜택 카드뉴스 이미지 (LEVEL 1 페이지)">
              <p className="text-xs text-gray-500 mb-3 -mt-1">
                교육일정 박스 아래에 전체 폭으로 노출되는 이미지입니다. 비워두면 기존 이미지가 유지됩니다.
              </p>
              <ImageUploader
                value={form.benefits_image_url || ''}
                onChange={(url) => set('benefits_image_url', url)}
                folder="level1"
                aspectRatio="4/5"
                maxSizeMB={8}
                sizeHint="가로 1000px 이상 권장 · 8MB 이하 (JPG/PNG)"
              />
            </Card>
          )}

          {/* LEVEL 2 전용: 신청 링크 */}
          {isLevel2 && (
            <Card title="신청 링크 (LEVEL 2 페이지)">
              <p className="text-xs text-gray-500 mb-4 -mt-1">
                금요반 · 토요반 「신청하기」 버튼이 연결되는 주소입니다. 기수가 바뀌면 이곳에서 수정하세요.
                비워두면 기존 링크가 유지됩니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="금요반 신청 URL">
                  <input
                    type="url"
                    value={form.apply_url_friday || ''}
                    onChange={(e) => set('apply_url_friday', e.target.value)}
                    className="input"
                    placeholder="https://www.s-ground.co.kr/course/..."
                  />
                </Field>
                <Field label="토요반 신청 URL">
                  <input
                    type="url"
                    value={form.apply_url_saturday || ''}
                    onChange={(e) => set('apply_url_saturday', e.target.value)}
                    className="input"
                    placeholder="https://www.s-ground.co.kr/course/..."
                  />
                </Field>
              </div>
            </Card>
          )}

          {/* 마스터 전용: 특징 카드 */}
          {isMaster && (
            <Card title="교육 특징 카드 (마스터 전용)">
              <div className="space-y-3">
                {(form.features || []).map((f, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-2 relative">
                    <div className="absolute top-3 right-3 flex gap-1">
                      <button onClick={() => {
                        const arr = [...form.features]
                        if (i > 0) { [arr[i-1], arr[i]] = [arr[i], arr[i-1]]; set('features', arr) }
                      }} className="p-1 text-gray-400 hover:text-gray-700" disabled={i === 0}><ChevronUp size={14}/></button>
                      <button onClick={() => {
                        const arr = [...form.features]
                        if (i < arr.length-1) { [arr[i], arr[i+1]] = [arr[i+1], arr[i]]; set('features', arr) }
                      }} className="p-1 text-gray-400 hover:text-gray-700" disabled={i === form.features.length-1}><ChevronDown size={14}/></button>
                      <button onClick={() => set('features', form.features.filter((_,idx) => idx !== i))} className="p-1 text-red-400 hover:bg-red-50 rounded"><Trash2 size={14}/></button>
                    </div>
                    <input value={f.title} onChange={(e) => { const arr=[...form.features]; arr[i]={...arr[i],title:e.target.value}; set('features',arr) }} placeholder="카드 제목" className="input" />
                    <textarea value={f.desc} onChange={(e) => { const arr=[...form.features]; arr[i]={...arr[i],desc:e.target.value}; set('features',arr) }} rows={2} placeholder="설명" className="input resize-none" />
                  </div>
                ))}
                <button onClick={() => set('features', [...(form.features||[]), {title:'',desc:'',icon:'Award'}])}
                  className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-gray-300 flex items-center justify-center gap-1">
                  <Plus size={14}/> 카드 추가
                </button>
              </div>
            </Card>
          )}

          {/* 마스터 전용: 커리큘럼 */}
          {isMaster && (
            <Card title="커리큘럼 (마스터 전용)">
              <BulletListEditor
                items={form.curriculum || []}
                onChange={(v) => set('curriculum', v)}
                placeholder="예: 기능해부학"
              />
            </Card>
          )}

          {/* 마스터 전용: 강사진 */}
          {isMaster && (
            <Card title="전문 강사진 (마스터 전용)">
              <div className="space-y-2">
                {(form.instructors || []).map((inst, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      value={inst.name}
                      onChange={(e) => { const arr=[...form.instructors]; arr[i]={...arr[i],name:e.target.value}; set('instructors',arr) }}
                      placeholder="이름"
                      className="input w-24 flex-shrink-0"
                    />
                    <input
                      value={inst.title}
                      onChange={(e) => { const arr=[...form.instructors]; arr[i]={...arr[i],title:e.target.value}; set('instructors',arr) }}
                      placeholder="직함"
                      className="input flex-1"
                    />
                    <button onClick={() => set('instructors', form.instructors.filter((_,idx) => idx !== i))} className="p-2 text-red-400 hover:bg-red-50 rounded-lg">
                      <Trash2 size={14}/>
                    </button>
                  </div>
                ))}
                <button onClick={() => set('instructors', [...(form.instructors||[]), {name:'',title:''}])}
                  className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-xs text-gray-500 hover:border-gray-300 flex items-center justify-center gap-1">
                  <Plus size={12}/> 강사 추가
                </button>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* 하단 저장 바 */}
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
        <div className="flex gap-2">
          <button onClick={reset} disabled={!dirty || saving}
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40">
            <RotateCcw size={14}/> 되돌리기
          </button>
          <button onClick={save} disabled={!dirty || saving}
            className="flex items-center gap-1.5 px-5 py-2 bg-gray-900 text-white text-sm rounded-xl hover:bg-gray-800 disabled:opacity-40">
            <Save size={14}/> {saving ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%; height: 38px; padding: 0 12px;
          border: 1px solid #e5e7eb; border-radius: 8px;
          background: white; font-size: 14px; outline: none;
          transition: border-color .15s;
        }
        .input:focus { border-color: #9ca3af; }
        textarea.input { height: auto; padding: 8px 12px; }
      `}</style>
    </div>
  )
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h3 className="text-sm font-bold text-gray-700 mb-4 pb-3 border-b border-gray-100">{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  )
}

function BulletListEditor({ items, onChange, placeholder }) {
  const update = (i, v) => onChange(items.map((it, idx) => idx === i ? v : it))
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
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-2">
          <input value={it} onChange={(e) => update(i, e.target.value)} placeholder={placeholder} className="input flex-1" />
          <button onClick={() => move(i, -1)} disabled={i === 0} className="p-1 text-gray-400 disabled:opacity-30"><ChevronUp size={14}/></button>
          <button onClick={() => move(i, 1)} disabled={i === items.length - 1} className="p-1 text-gray-400 disabled:opacity-30"><ChevronDown size={14}/></button>
          <button onClick={() => remove(i)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={14}/></button>
        </div>
      ))}
      <button onClick={() => onChange([...items, ''])}
        className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-xs text-gray-500 hover:border-gray-300 flex items-center justify-center gap-1">
        <Plus size={12}/> 항목 추가
      </button>
    </div>
  )
}
