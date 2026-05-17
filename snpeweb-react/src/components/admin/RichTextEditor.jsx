/**
 * RichTextEditor — 게시판형 WYSIWYG 에디터 (Tiptap 기반)
 *
 * 기능:
 *  - 굵게 / 기울임 / 밑줄 / 취소선
 *  - 글자 색상 / 글자 크기 (8단계)
 *  - 정렬 (좌/중/우/양쪽)
 *  - 글머리 기호 / 번호 매기기 / 인용
 *  - 링크 삽입
 *  - 이미지 업로드 (Supabase Storage) + 이미지 정렬 (좌/중/우, 인라인)
 *  - 이미지 크기 조절 (드래그)
 */

import { useRef, useState, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { TextAlign } from '@tiptap/extension-text-align'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { Underline } from '@tiptap/extension-underline'
import { Link } from '@tiptap/extension-link'
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, Link2, Image as ImageIcon, Loader2,
  Type, Palette, RotateCcw,
} from 'lucide-react'
import { dataStore } from '../../lib/dataStore'

// 글자 크기 8단계 (px) — 컬러피커처럼 토글 가능
const FONT_SIZES = [
  { label: 'XS',  px: '12px' },
  { label: 'SM',  px: '14px' },
  { label: 'MD',  px: '16px' },
  { label: 'LG',  px: '18px' },
  { label: 'XL',  px: '20px' },
  { label: '2XL', px: '24px' },
  { label: '3XL', px: '30px' },
  { label: '4XL', px: '36px' },
]

const PRESET_COLORS = [
  '#111111', '#333333', '#666666', '#999999',
  '#c0392b', '#e67e22', '#f1c40f', '#27ae60',
  '#2980b9', '#8e44ad', '#5c4f44', '#1abc9c',
]

// ─── FontSize 확장 (text-style 위에 fontSize 속성 추가) ────────────────────
import { Extension } from '@tiptap/core'

const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return { types: ['textStyle'] }
  },
  addGlobalAttributes() {
    return [{
      types: this.options.types,
      attributes: {
        fontSize: {
          default: null,
          parseHTML: (el) => el.style.fontSize?.replace(/['"]+/g, '') || null,
          renderHTML: (attrs) => attrs.fontSize ? { style: `font-size: ${attrs.fontSize}` } : {},
        },
      },
    }]
  },
  addCommands() {
    return {
      setFontSize: (fontSize) => ({ chain }) =>
        chain().setMark('textStyle', { fontSize }).run(),
      unsetFontSize: () => ({ chain }) =>
        chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run(),
    }
  },
})

// ─── 이미지 정렬 확장 (이미지에 className 추가) ──────────────────────────
const AlignableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      align: {
        default: 'center',
        parseHTML: (el) => el.getAttribute('data-align') || 'center',
        renderHTML: (attrs) => ({ 'data-align': attrs.align }),
      },
      width: {
        default: null,
        parseHTML: (el) => el.getAttribute('width') || el.style.width || null,
        renderHTML: (attrs) => attrs.width ? { width: attrs.width, style: `width: ${attrs.width}` } : {},
      },
    }
  },
})

// ─── 메인 컴포넌트 ───────────────────────────────────────────────────────

export default function RichTextEditor({
  value = '',
  onChange,
  placeholder = '내용을 입력하세요...',
  minHeight = '200px',
  folder = 'editor',
}) {
  const fileRef = useRef(null)
  const [uploading, setUploading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
      Underline,
      TextStyle,
      Color.configure({ types: ['textStyle'] }),
      FontSize,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue-600 underline' } }),
      AlignableImage.configure({ inline: false, allowBase64: false }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none px-4 py-3',
        style: `min-height: ${minHeight}`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  // 이미지 업로드 → Supabase Storage → 에디터에 삽입
  const handleImageUpload = useCallback(async (file) => {
    if (!file || !editor) return
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('5MB 이하 파일만 업로드 가능합니다')
      return
    }
    setUploading(true)
    try {
      const url = await dataStore.uploadImage(file, folder)
      editor.chain().focus().setImage({ src: url, alt: file.name }).run()
    } catch (e) {
      alert('업로드 실패: ' + (e.message || '알 수 없는 오류'))
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }, [editor, folder])

  const handleImageButtonClick = () => fileRef.current?.click()
  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) handleImageUpload(file)
  }

  // 이미지 정렬 (선택된 이미지에 적용)
  const setImageAlign = (align) => {
    if (!editor) return
    const { state } = editor
    const node = state.selection.node
    if (node?.type.name !== 'image') {
      alert('이미지를 먼저 클릭한 뒤 정렬해 주세요')
      return
    }
    editor.chain().focus().updateAttributes('image', { align }).run()
  }

  // 이미지 너비 조절
  const setImageWidth = (width) => {
    if (!editor) return
    const node = editor.state.selection.node
    if (node?.type.name !== 'image') {
      alert('이미지를 먼저 클릭한 뒤 크기를 조정해 주세요')
      return
    }
    editor.chain().focus().updateAttributes('image', { width }).run()
  }

  // 링크 삽입
  const setLink = () => {
    if (!editor) return
    const prev = editor.getAttributes('link').href
    const url = window.prompt('링크 URL을 입력하세요', prev || 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run()
  }

  if (!editor) return null

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* 툴바 */}
      <div className="border-b border-gray-100 bg-gray-50/60 p-1.5 flex flex-wrap items-center gap-0.5">
        {/* 텍스트 스타일 */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="굵게 (Ctrl+B)"
        >
          <Bold size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="기울임 (Ctrl+I)"
        >
          <Italic size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          title="밑줄 (Ctrl+U)"
        >
          <UnderlineIcon size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          title="취소선"
        >
          <Strikethrough size={14} />
        </ToolbarButton>

        <Divider />

        {/* 글자 크기 */}
        <FontSizeDropdown editor={editor} />

        {/* 글자 색상 */}
        <ColorDropdown editor={editor} />

        <Divider />

        {/* 정렬 */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          active={editor.isActive({ textAlign: 'left' })}
          title="왼쪽 정렬"
        >
          <AlignLeft size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          active={editor.isActive({ textAlign: 'center' })}
          title="가운데 정렬"
        >
          <AlignCenter size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          active={editor.isActive({ textAlign: 'right' })}
          title="오른쪽 정렬"
        >
          <AlignRight size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          active={editor.isActive({ textAlign: 'justify' })}
          title="양쪽 정렬"
        >
          <AlignJustify size={14} />
        </ToolbarButton>

        <Divider />

        {/* 리스트 / 인용 */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="글머리 기호"
        >
          <List size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="번호 매기기"
        >
          <ListOrdered size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          title="인용"
        >
          <Quote size={14} />
        </ToolbarButton>

        <Divider />

        {/* 링크 / 이미지 */}
        <ToolbarButton onClick={setLink} active={editor.isActive('link')} title="링크">
          <Link2 size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={handleImageButtonClick} title="이미지 업로드" disabled={uploading}>
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <ImageIcon size={14} />}
        </ToolbarButton>

        <Divider />

        {/* 이미지 정렬 (이미지 선택 시 활성화) */}
        <ImageAlignControls
          editor={editor}
          onAlign={setImageAlign}
          onWidth={setImageWidth}
        />

        {/* 초기화 */}
        <div className="ml-auto">
          <ToolbarButton
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            title="서식 초기화"
          >
            <RotateCcw size={14} />
          </ToolbarButton>
        </div>
      </div>

      {/* 에디터 본문 */}
      <EditorContent editor={editor} />
      {!editor.getText() && (
        <div className="absolute pointer-events-none text-gray-300 px-4 py-3 -mt-[180px]">
          {placeholder}
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <style>{`
        .ProseMirror { outline: none; }
        .ProseMirror p { margin: 0.5em 0; }
        .ProseMirror h1 { font-size: 1.875em; font-weight: 700; margin: 0.6em 0 0.4em; }
        .ProseMirror h2 { font-size: 1.5em; font-weight: 700; margin: 0.6em 0 0.4em; }
        .ProseMirror h3 { font-size: 1.25em; font-weight: 600; margin: 0.6em 0 0.4em; }
        .ProseMirror h4 { font-size: 1.1em; font-weight: 600; margin: 0.6em 0 0.4em; }
        .ProseMirror ul, .ProseMirror ol { padding-left: 1.5em; margin: 0.5em 0; }
        .ProseMirror ul { list-style: disc; }
        .ProseMirror ol { list-style: decimal; }
        .ProseMirror blockquote {
          border-left: 3px solid #d1d5db;
          padding-left: 1em;
          color: #6b7280;
          margin: 0.5em 0;
        }
        .ProseMirror a { color: #2563eb; text-decoration: underline; cursor: pointer; }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 6px;
          cursor: pointer;
        }
        .ProseMirror img.ProseMirror-selectednode {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        .ProseMirror img[data-align="left"]   { float: left;  margin-right: 1em; margin-bottom: 0.5em; }
        .ProseMirror img[data-align="right"]  { float: right; margin-left: 1em;  margin-bottom: 0.5em; }
        .ProseMirror img[data-align="center"] { display: block; margin: 1em auto; }
        .ProseMirror img[data-align="inline"] { display: inline-block; margin: 0 0.3em; vertical-align: middle; }
        .ProseMirror p::after { content: ''; display: block; clear: both; }
      `}</style>
    </div>
  )
}

// ─── 툴바 서브 컴포넌트 ────────────────────────────────────────────────

function ToolbarButton({ onClick, active, title, disabled, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
        active
          ? 'bg-gray-900 text-white'
          : 'text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed'
      }`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-gray-200 mx-0.5" />
}

function FontSizeDropdown({ editor }) {
  const [open, setOpen] = useState(false)
  const current = editor.getAttributes('textStyle').fontSize || ''

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((x) => !x)}
        className="h-8 px-2 rounded-lg flex items-center gap-1 text-xs text-gray-600 hover:bg-gray-200"
        title="글자 크기"
      >
        <Type size={14} />
        <span>{current || 'MD'}</span>
      </button>
      {open && (
        <div
          className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-1 z-20 min-w-[100px]"
          onMouseLeave={() => setOpen(false)}
        >
          {FONT_SIZES.map((s) => (
            <button
              key={s.px}
              type="button"
              onClick={() => {
                editor.chain().focus().setMark('textStyle', { fontSize: s.px }).run()
                setOpen(false)
              }}
              className={`w-full text-left px-3 py-1.5 text-xs rounded hover:bg-gray-100 ${
                current === s.px ? 'bg-gray-100 font-bold' : ''
              }`}
              style={{ fontSize: s.px === '12px' ? '11px' : s.px === '14px' ? '12px' : '14px' }}
            >
              {s.label} <span className="text-gray-400 ml-1">{s.px}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().setMark('textStyle', { fontSize: null }).run()
              setOpen(false)
            }}
            className="w-full text-left px-3 py-1.5 text-xs rounded hover:bg-gray-100 text-gray-500 border-t border-gray-100 mt-1"
          >
            초기화
          </button>
        </div>
      )}
    </div>
  )
}

function ColorDropdown({ editor }) {
  const [open, setOpen] = useState(false)
  const current = editor.getAttributes('textStyle').color || ''

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((x) => !x)}
        className="h-8 px-2 rounded-lg flex items-center gap-1 text-xs text-gray-600 hover:bg-gray-200"
        title="글자 색상"
      >
        <Palette size={14} />
        <span
          className="w-3 h-3 rounded-sm border border-gray-300"
          style={{ backgroundColor: current || '#000' }}
        />
      </button>
      {open && (
        <div
          className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-20"
          onMouseLeave={() => setOpen(false)}
        >
          <div className="grid grid-cols-6 gap-1 mb-2">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  editor.chain().focus().setColor(c).run()
                  setOpen(false)
                }}
                className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5 border-t border-gray-100 pt-2">
            <input
              type="color"
              value={current || '#000000'}
              onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
              className="w-8 h-7 rounded cursor-pointer"
            />
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().unsetColor().run()
                setOpen(false)
              }}
              className="text-[10px] text-gray-500 hover:text-gray-800 ml-auto"
            >
              초기화
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ImageAlignControls({ editor, onAlign, onWidth }) {
  const isImage = editor.state.selection.node?.type.name === 'image'

  return (
    <div className={`flex items-center gap-0.5 ${isImage ? '' : 'opacity-40'}`}>
      <button
        type="button"
        onClick={() => onAlign('left')}
        title="이미지 좌측"
        disabled={!isImage}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:cursor-not-allowed text-xs"
      >
        ⬅️
      </button>
      <button
        type="button"
        onClick={() => onAlign('center')}
        title="이미지 가운데"
        disabled={!isImage}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:cursor-not-allowed text-xs"
      >
        ⬆️
      </button>
      <button
        type="button"
        onClick={() => onAlign('right')}
        title="이미지 우측"
        disabled={!isImage}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:cursor-not-allowed text-xs"
      >
        ➡️
      </button>
      {isImage && (
        <select
          onChange={(e) => onWidth(e.target.value)}
          className="h-8 px-1.5 text-[10px] rounded-lg border border-gray-200 bg-white"
          title="이미지 너비"
          defaultValue=""
        >
          <option value="" disabled>크기</option>
          <option value="25%">25%</option>
          <option value="50%">50%</option>
          <option value="75%">75%</option>
          <option value="100%">100%</option>
          <option value="auto">원본</option>
        </select>
      )}
    </div>
  )
}
