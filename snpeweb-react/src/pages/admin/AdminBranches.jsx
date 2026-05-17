import { useState, useEffect } from 'react'
import { dataStore } from '../../lib/dataStore'
import { Plus, Pencil, Trash2, X, MapPin } from 'lucide-react'
import ImageUploader from '../../components/admin/ImageUploader'

const emptyForm = {
  name: '',
  subtitle: '',
  address: '',
  image_url: '',
  map_url: '',
  sort_order: 0,
}

export default function AdminBranches() {
  const [branches, setBranches] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const loadData = async () => setBranches(await dataStore.getBranches())
  useEffect(() => { loadData() }, [])

  const openNew = () => { setForm({ ...emptyForm, sort_order: branches.length + 1 }); setEditing('new') }
  const openEdit = (b) => {
    setForm({
      name: b.name,
      subtitle: b.subtitle || '',
      address: b.address || '',
      image_url: b.image_url || '',
      map_url: b.map_url || '',
      sort_order: b.sort_order ?? 0,
    })
    setEditing(b.id)
  }
  const close = () => { setEditing(null); setForm(emptyForm) }

  const save = async () => {
    if (!form.name) return
    const payload = {
      ...form,
      sort_order: Number(form.sort_order) || 0,
      image_url: form.image_url || null,
      map_url: form.map_url || null,
      subtitle: form.subtitle || null,
    }
    if (editing === 'new') await dataStore.addBranch(payload)
    else await dataStore.updateBranch(editing, payload)
    await loadData()
    close()
  }

  const remove = async (id) => {
    if (!window.confirm('삭제하시겠습니까?')) return
    await dataStore.deleteBranch(id)
    await loadData()
  }

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">직영점 관리</h1>
          <p className="text-sm text-gray-500 mt-1">메인 홈에 표시되는 직영점 카드를 관리합니다 · 총 {branches.length}개</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm rounded-xl hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} /> 직영점 추가
        </button>
      </div>

      {/* 카드 미리보기 그리드 */}
      {branches.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {branches.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden group">
              <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                {b.image_url ? (
                  <img
                    src={b.image_url}
                    alt={b.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <MapPin size={32} />
                  </div>
                )}
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[11px] rounded-full font-medium">
                  #{b.sort_order}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 text-sm">{b.name}</p>
                    {b.subtitle && <p className="text-xs text-gray-500">{b.subtitle}</p>}
                    {b.address && <p className="text-xs text-gray-400 mt-1 truncate">{b.address}</p>}
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => openEdit(b)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg"
                    >
                      <Pencil size={14} className="text-gray-500" />
                    </button>
                    <button
                      onClick={() => remove(b.id)}
                      className="p-1.5 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {branches.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400 text-sm">
          등록된 직영점이 없습니다. 직영점을 추가해주세요.
        </div>
      )}

      {/* 추가/수정 모달 */}
      {editing !== null && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={close}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                {editing === 'new' ? '직영점 추가' : '직영점 수정'}
              </h2>
              <button onClick={close} className="p-1 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">지점명 *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={f('name')}
                    placeholder="강남점"
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">부제</label>
                  <input
                    type="text"
                    value={form.subtitle}
                    onChange={f('subtitle')}
                    placeholder="강남본원"
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={f('address')}
                  placeholder="서울시 강남구 봉은사로 68길 8, 4층"
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">사진</label>
                <ImageUploader
                  value={form.image_url}
                  onChange={(url) => setForm({ ...form, image_url: url })}
                  folder="branches"
                  aspectRatio="16/10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">네이버 지도 URL</label>
                <input
                  type="url"
                  value={form.map_url}
                  onChange={f('map_url')}
                  placeholder="https://map.naver.com/p/entry/place/..."
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">표시 순서</label>
                <input
                  type="number"
                  min="0"
                  value={form.sort_order}
                  onChange={f('sort_order')}
                  className="w-24 h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                />
                <p className="text-xs text-gray-400 mt-1">숫자가 작을수록 앞에 표시됩니다.</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={close}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={save}
                disabled={!form.name}
                className="px-4 py-2 text-sm bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-40"
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
