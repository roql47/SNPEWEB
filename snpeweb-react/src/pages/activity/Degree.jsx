import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { dataStore } from '../../lib/dataStore'
import { BookOpen, Users, Target, Layers, Award, Sparkles, HeartPulse, Activity, Heart, Star, GraduationCap, Info } from 'lucide-react'
import { sanitizeHtml } from '../../lib/sanitize'

// HTML 렌더링용 유틸 — DB에 _html 필드가 있으면 우선 사용, 없으면 plain text를 줄바꿈만 적용
function RichText({ html, fallback, className = '' }) {
  if (html) {
    return (
      <div
        className={`rt-content ${className}`}
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
      />
    )
  }
  if (fallback) {
    return <div className={`whitespace-pre-line ${className}`}>{fallback}</div>
  }
  return null
}

const ICON_MAP = { Layers, BookOpen, Users, Target, Award, Sparkles, HeartPulse, Activity, Heart, Star, GraduationCap, Info }

const STATUS_LABEL = {
  open: { key: 'degreePage.status.open', cls: 'bg-green-50 text-green-700' },
  closing: { key: 'degreePage.status.closing', cls: 'bg-amber-50 text-amber-700' },
  closed: { key: 'degreePage.status.closed', cls: 'bg-gray-100 text-gray-600' },
  done: { key: 'degreePage.status.done', cls: 'bg-gray-100 text-gray-500' },
}

const DEFAULT_ORDER = ['intro', 'philosophy', 'features', 'target', 'roadmap', 'schedule', 'career', 'contact']

// 성장 로드맵 도식 (PPT 슬라이드 20) — LEVEL 1 → MASTER
const GROWTH_ROADMAP = [
  {
    level: 'LEVEL 1',
    subtitle: { ko: 'Foundation', en: 'Foundation', ja: '基礎課程' },
    descKey: 'degreePage.roadmap.steps.level1.desc',
    path: '/level1',
  },
  {
    level: 'LEVEL 2',
    subtitle: { ko: 'Certified Instructor', en: 'Certified Instructor', ja: '認定指導者' },
    descKey: 'degreePage.roadmap.steps.level2.desc',
    path: '/level2',
  },
  {
    level: 'LEVEL 3',
    subtitle: { ko: 'Advanced Specialist', en: 'Advanced Specialist', ja: '上級スペシャリスト' },
    descKey: 'degreePage.roadmap.steps.level3.desc',
    path: '/level3',
  },
  {
    level: 'MASTER',
    subtitle: { ko: 'Educator & Leader', en: 'Educator & Leader', ja: '教育者・リーダー' },
    descKey: 'degreePage.roadmap.steps.master.desc',
    path: '/master',
  },
]

function GrowthRoadmap() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.resolvedLanguage || i18n.language || 'ko').split('-')[0]

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-mint-lighter/30">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">CERTIFICATION ROADMAP</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{t('degreePage.roadmap.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('degreePage.roadmap.intro')}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4 md:gap-3 relative">
          {GROWTH_ROADMAP.map((step, i) => (
            <div key={step.level} className="relative">
              <Link
                to={step.path}
                className="block h-full bg-white rounded-2xl p-6 border border-gray-200 hover:border-snpe-dark hover:shadow-lg transition-all group text-center"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-snpe-darker text-white text-sm font-bold mb-4">
                  {i + 1}
                </span>
                <p className="text-base font-bold text-gray-900 group-hover:text-snpe-dark transition-colors">{step.level}</p>
                <p className="text-xs text-snpe-dark font-semibold mb-2">{step.subtitle[lang] || step.subtitle.en}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{t(step.descKey)}</p>
              </Link>
              {i < GROWTH_ROADMAP.length - 1 && (
                <span className="hidden md:flex absolute top-1/2 -right-2 z-10 -translate-y-1/2 text-snpe-dark/40 text-xl">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const fmtPeriod = (start, end) => {
  if (!start && !end) return '-'
  const f = (d) => (d ? d.replace(/-/g, '.') : '')
  if (start && end) return `${f(start)} ~ ${f(end)}`
  return f(start || end)
}

export default function Degree() {
  const { t } = useTranslation()
  const [content, setContent] = useState(null)
  const [educations, setEducations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [pageContent, eduRows] = await Promise.all([
          dataStore.getPageContent('degree').catch(() => null),
          dataStore.getEducations().catch(() => []),
        ])
        setContent(pageContent)
        setEducations(eduRows || [])
      } catch (e) {
        console.warn('[Degree] load failed:', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <>
        <PageBanner title={t('pages.degree')} subtitle={t('pages.degreeSub')} />
        <div className="py-24 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full" />
        </div>
      </>
    )
  }

  if (!content) {
    return (
      <>
        <PageBanner title={t('pages.degree')} subtitle={t('pages.degreeSub')} />
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <p className="text-gray-500">{t('common.contentUnavailable')}</p>
        </div>
      </>
    )
  }

  const order = content._sectionOrder || DEFAULT_ORDER
  const eduByCategory = ['level1', 'level2', 'level3']
    .map((cat) => {
      const rows = educations.filter((r) => r.category === cat)
      if (rows.length === 0) return null
      const sorted = [...rows].sort((a, b) => (b.start_date || '').localeCompare(a.start_date || ''))
      return { ...sorted[0], _label: cat.toUpperCase().replace('LEVEL', 'LEVEL ') }
    })
    .filter(Boolean)

  return (
    <>
      <PageBanner title={t('pages.degree')} subtitle={t('pages.degreeSub')} />

      <GrowthRoadmap />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 space-y-20">
          {order.map((key) => {
            const sec = content[key]
            if (!sec || sec.hidden) return null

            switch (key) {
              case 'intro':
                return <IntroSection key={key} sec={sec} />
              case 'philosophy':
                return <PhilosophySection key={key} sec={sec} />
              case 'features':
                return <FeaturesSection key={key} sec={sec} />
              case 'target':
                return <TargetSection key={key} sec={sec} />
              case 'roadmap':
                return <RoadmapSection key={key} sec={sec} />
              case 'schedule':
                return <ScheduleSection key={key} eduByCategory={eduByCategory} />
              case 'career':
                return <CareerSection key={key} sec={sec} />
              case 'contact':
                return <ContactSection key={key} sec={sec} />
              default:
                return null
            }
          })}
        </div>
      </section>
    </>
  )
}

// ─── LayoutWrapper: 텍스트 + 이미지 좌우/상하 배치 ──────────────────────

function LayoutWrapper({ children, image, layout = 'text-only', ratio = 50, alt = '' }) {
  if (!image || layout === 'text-only') return <>{children}</>

  if (layout === 'image-top' || layout === 'image-bottom') {
    const img = (
      <div className="rounded-2xl overflow-hidden bg-gray-100">
        <img src={image} alt={alt} className="w-full h-auto object-cover" />
      </div>
    )
    return (
      <div className="space-y-8">
        {layout === 'image-top' && img}
        <div>{children}</div>
        {layout === 'image-bottom' && img}
      </div>
    )
  }

  // image-left / image-right
  const r = Math.max(20, Math.min(70, ratio || 50))
  const imgCol = `${r}fr`
  const textCol = `${100 - r}fr`
  const gridStyle = layout === 'image-left'
    ? { gridTemplateColumns: `${imgCol} ${textCol}` }
    : { gridTemplateColumns: `${textCol} ${imgCol}` }

  const imgEl = (
    <div className="rounded-2xl overflow-hidden bg-gray-100 self-center">
      <img src={image} alt={alt} className="w-full h-auto object-cover" />
    </div>
  )
  return (
    <div className="grid lg:gap-10 gap-6 grid-cols-1 lg:grid-cols-[var(--g)] items-center" style={{ ['--g']: gridStyle.gridTemplateColumns }}>
      {layout === 'image-left' && imgEl}
      <div className="min-w-0">{children}</div>
      {layout === 'image-right' && imgEl}
    </div>
  )
}

// ─── 섹션 컴포넌트 ──────────────────────────────────────────────────────

function IntroSection({ sec }) {
  return (
    <LayoutWrapper image={sec.image_url} layout={sec.layout} ratio={sec.image_ratio} alt={sec.title}>
      <div className={sec.layout && sec.layout !== 'text-only' ? '' : 'text-center'}>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{sec.title}</h2>
        <RichText
          html={sec.body_html}
          fallback={sec.body}
          className="text-gray-600 leading-relaxed max-w-3xl mx-auto"
        />
      </div>
    </LayoutWrapper>
  )
}

function PhilosophySection({ sec }) {
  if (!sec.items?.length) return null
  return (
    <LayoutWrapper image={sec.image_url} layout={sec.layout} ratio={sec.image_ratio} alt={sec.title}>
      <div className="bg-gray-50 rounded-3xl p-8 md:p-10 h-full">
        <h3 className="text-2xl font-bold text-gray-900 mb-5">{sec.title}</h3>
        <ul className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
          {sec.items.map((line, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-snpe-dark flex-shrink-0" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </LayoutWrapper>
  )
}

function FeaturesSection({ sec }) {
  if (!sec.items?.length) return null
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{sec.title}</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {sec.items.map((f, i) => {
          const Icon = ICON_MAP[f.icon] || Layers
          return (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
              {f.image_url && (
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  <img src={f.image_url} alt={f.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex gap-4 p-6">
                <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center flex-shrink-0">
                  <Icon size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{f.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TargetSection({ sec }) {
  if (!sec.items?.length) return null
  return (
    <LayoutWrapper image={sec.image_url} layout={sec.layout} ratio={sec.image_ratio} alt={sec.title}>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-5">{sec.title}</h3>
        <RichText html={sec.intro_html} fallback={sec.intro} className="text-gray-600 mb-4" />
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <ul className="space-y-2.5 text-sm md:text-base text-gray-700">
            {sec.items.map((line, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-snpe-dark mt-0.5">✓</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </LayoutWrapper>
  )
}

function RoadmapSection({ sec }) {
  if (!sec.items?.length) return null
  const cols = sec.items.length
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-5 text-center">{sec.title}</h3>
      <RichText html={sec.intro_html} fallback={sec.intro} className="text-gray-600 text-center mb-8 max-w-2xl mx-auto" />
      <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {sec.items.map((r, i) => (
          <Link
            key={i}
            to={r.path || '#'}
            className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-snpe-dark hover:shadow-lg transition-all group"
          >
            {r.image_url && (
              <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                <img src={r.image_url} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            )}
            <div className="p-6">
              <span className="text-xs font-bold text-snpe-dark">{r.level}</span>
              <h4 className="text-lg font-bold text-gray-900 mt-2 mb-2 group-hover:text-snpe-dark transition-colors">{r.name}</h4>
              <p className="text-sm text-gray-500">{r.desc}</p>
            </div>
            {i < cols - 1 && !r.image_url && (
              <span className="hidden md:block absolute top-1/2 -right-4 text-gray-300 text-xl">→</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

function ScheduleSection({ eduByCategory }) {
  const { t } = useTranslation()

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-5">{t('degreePage.schedule.title')}</h3>
      <p className="text-sm text-gray-500 mb-4">{t('degreePage.schedule.intro')}</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="text-left px-4 py-3 font-semibold rounded-tl-xl">{t('degreePage.schedule.course')}</th>
              <th className="text-left px-4 py-3 font-semibold">{t('degreePage.schedule.period')}</th>
              <th className="text-left px-4 py-3 font-semibold">{t('degreePage.schedule.location')}</th>
              <th className="text-center px-4 py-3 font-semibold">{t('degreePage.schedule.status')}</th>
              <th className="text-center px-4 py-3 font-semibold rounded-tr-xl">{t('degreePage.schedule.apply')}</th>
            </tr>
          </thead>
          <tbody>
            {eduByCategory.length > 0 ? (
              eduByCategory.map((r) => {
                const st = STATUS_LABEL[r.status] || STATUS_LABEL.open
                const canApply = r.status === 'open' || r.status === 'closing'
                return (
                  <tr key={r.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3.5 font-medium text-gray-900">{r._label}</td>
                    <td className="px-4 py-3.5 text-gray-600">{fmtPeriod(r.start_date, r.end_date)}</td>
                    <td className="px-4 py-3.5 text-gray-600">{r.location || '-'}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${st.cls}`}>{t(st.key)}</span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      {canApply && r.apply_url ? (
                        <a href={r.apply_url} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-snpe-dark underline">
                          {t('degreePage.schedule.applyNow')}
                        </a>
                      ) : (
                        <span className="text-xs font-medium text-gray-400">{t('degreePage.schedule.preparing')}</span>
                      )}
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-400 text-sm">{t('degreePage.schedule.empty')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CareerSection({ sec }) {
  if (!sec.items?.length) return null
  return (
    <LayoutWrapper image={sec.image_url} layout={sec.layout} ratio={sec.image_ratio} alt={sec.title}>
      <div className="bg-gray-50 rounded-2xl p-6 md:p-8 h-full">
        <h4 className="font-bold text-gray-900 mb-3">{sec.title}</h4>
        <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
          {sec.items.map((line, i) => (
            <li key={i}>• {line}</li>
          ))}
        </ul>
      </div>
    </LayoutWrapper>
  )
}

function ContactSection({ sec }) {
  const { t } = useTranslation()

  return (
    <LayoutWrapper image={sec.image_url} layout={sec.layout} ratio={sec.image_ratio} alt={sec.title}>
      <div className="bg-snpe-dark/10 rounded-2xl p-6 md:p-8 h-full">
        <h4 className="font-bold text-gray-900 mb-3">{sec.title}</h4>
        {sec.intro && <p className="text-sm text-gray-600 mb-3">{sec.intro}</p>}
        <ul className="space-y-1.5 text-sm text-gray-700">
          {sec.team && <li>• {sec.team}</li>}
          {sec.email && (
            <li>{t('degreePage.contact.email')}: <a href={`mailto:${sec.email}`} className="text-snpe-dark underline">{sec.email}</a></li>
          )}
          {sec.phone && <li>{t('degreePage.contact.phone')}: {sec.phone}</li>}
          {sec.hours && <li className="text-gray-500 pt-1">{t('degreePage.contact.hours')}: {sec.hours}</li>}
        </ul>
      </div>
    </LayoutWrapper>
  )
}
