import { useRef, useState } from 'react'
import { Upload, X, Link2, Loader2 } from 'lucide-react'
import { dataStore } from '../../lib/dataStore'

/**
 * 어드민 폼용 이미지 입력 컴포넌트
 * - 파일 업로드 (Supabase Storage 'page-images' 버킷)
 * - URL 직접 입력 모드
 * - 미리보기 + 삭제
 */
export default function ImageUploader({ value, onChange, folder = 'degree', aspectRatio = '16/10', maxSizeMB = 5, sizeHint = null }) {
  const fileRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [showUrlInput, setShowUrlInput] = useState(false)

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드 가능합니다')
      return
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`${maxSizeMB}MB 이하 파일만 업로드 가능합니다`)
      return
    }

    setError(null)
    setUploading(true)
    try {
      const url = await dataStore.uploadImage(file, folder)
      onChange(url)
    } catch (e) {
      console.error(e)
      setError('업로드 실패: ' + (e.message || '알 수 없는 오류'))
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const clear = () => {
    onChange('')
    setShowUrlInput(false)
    setError(null)
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div
          className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
          style={aspectRatio === 'auto' ? undefined : { aspectRatio }}
        >
          <img
            src={value}
            alt="미리보기"
            className={aspectRatio === 'auto' ? 'w-full h-auto block' : 'w-full h-full object-cover'}
            onError={(e) => { e.currentTarget.style.opacity = '0.3' }}
          />
          <button
            type="button"
            onClick={clear}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
            aria-label="이미지 제거"
          >
            <X size={14} />
          </button>
        </div>
      ) : showUrlInput ? (
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://... 또는 /images/foo.png"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                if (e.target.value) onChange(e.target.value)
              }
            }}
            onBlur={(e) => { if (e.target.value) onChange(e.target.value) }}
            autoFocus
            className="flex-1 h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
          />
          <button
            type="button"
            onClick={() => setShowUrlInput(false)}
            className="px-3 text-xs text-gray-500 hover:text-gray-800"
          >
            취소
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border-2 border-dashed border-gray-200 rounded-lg text-xs text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <><Loader2 size={14} className="animate-spin" /> 업로드 중...</>
            ) : (
              <><Upload size={14} /> 파일 업로드</>
            )}
          </button>
          <button
            type="button"
            onClick={() => setShowUrlInput(true)}
            className="px-3 py-2.5 border-2 border-dashed border-gray-200 rounded-lg text-xs text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-1"
            title="URL 직접 입력"
          >
            <Link2 size={14} /> URL
          </button>
        </div>
      )}

      {sizeHint && !value && (
        <p className="text-xs text-gray-400">{sizeHint}</p>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
