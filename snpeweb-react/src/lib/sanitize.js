import DOMPurify from 'dompurify'

/**
 * DOMPurify로 HTML 정제 — XSS 방지하면서 RichTextEditor가 만든
 * inline style/font-size/color/이미지 정렬 속성은 보존.
 */
export function sanitizeHtml(html) {
  if (!html || typeof html !== 'string') return ''
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'div', 'span', 'strong', 'em', 'u', 's',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote',
      'a', 'img',
      'b', 'i',
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'class',
      'src', 'alt', 'width', 'height', 'data-align',
      'style',
    ],
    // style은 안전한 속성만 통과
    ALLOWED_CSS_PROPERTIES: [
      'color', 'background-color',
      'font-size', 'font-weight', 'font-style', 'font-family',
      'text-align', 'text-decoration', 'line-height',
      'width', 'height',
      'margin', 'padding',
      'float', 'display', 'vertical-align',
    ],
  })
}
