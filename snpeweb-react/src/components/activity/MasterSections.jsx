import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Activity,
  Sparkles,
  HeartPulse,
  Database,
  Award,
  Medal,
  Crown,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import useReveal from '../../hooks/useReveal'

function Reveal({ children, delay = 0, className = '' }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  )
}

const visionIcons = [Activity, Sparkles, HeartPulse, Database]
const gradeIcons = [Award, Medal, Crown]
const gradeStyles = [
  { color: 'text-amber-700', ring: 'border-amber-200' },
  { color: 'text-gray-500', ring: 'border-gray-200' },
  { color: 'text-yellow-600', ring: 'border-yellow-200' },
]

export default function MasterSections() {
  const { t } = useTranslation()
  const intro = t('masterPage.intro.body', { returnObjects: true })
  const whatYouLearn = t('masterPage.learn.items', { returnObjects: true })
  const visionPillars = t('masterPage.vision.pillars', { returnObjects: true })
  const grading = t('masterPage.grading.items', { returnObjects: true })

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-mint-lighter/30">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-snpe-dark/10 text-snpe-dark text-xs font-bold mb-4">
                  MASTER COURSE
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t('masterPage.intro.title')}</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                  {intro.map((paragraph, index) => (
                    <p key={index} className={index === intro.length - 1 ? 'text-gray-500' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-md">
                <img src="/images/master/intro.png" alt="SNPE MASTER COURSE" className="w-full h-auto block" loading="lazy" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
              <div className="rounded-3xl overflow-hidden shadow-md order-last lg:order-first">
                <img src="/images/master/learn.png" alt="What You Will Learn" className="w-full h-auto block" loading="lazy" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">WHAT YOU WILL LEARN</p>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t('masterPage.learn.title')}</h2>
                <ul className="space-y-3">
                  {whatYouLearn.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-snpe-dark flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
            <div className="rounded-3xl overflow-hidden shadow-md mb-12 max-h-[420px]">
              <img src="/images/master/vision.png" alt="SNPE MASTER COURSE Vision" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">VISION</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">{t('masterPage.vision.title')}</h2>
              <div className="space-y-3 text-gray-600 leading-relaxed">
                {t('masterPage.vision.body', { returnObjects: true }).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {visionPillars.map((pillar, index) => {
                const Icon = visionIcons[index] || Activity
                return (
                  <div key={pillar.title} className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                    <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center mx-auto mb-4">
                      <Icon size={22} />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{pillar.title}</h4>
                    <p className="text-xs text-gray-500">{pillar.desc}</p>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.3em] text-snpe-dark mb-3">MASTER GRADING SYSTEM</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('masterPage.grading.title')}</h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid md:grid-cols-3 gap-6">
              {grading.map((grade, index) => {
                const Icon = gradeIcons[index] || Award
                const style = gradeStyles[index] || gradeStyles[0]
                return (
                  <div key={grade.tier} className={`bg-gray-50 rounded-2xl p-7 border ${style.ring}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <Icon size={28} className={style.color} />
                      <h3 className="text-lg font-bold text-gray-900">{grade.tier}</h3>
                    </div>
                    <p className="text-xs font-semibold text-snpe-dark mb-2">{grade.label}</p>
                    <ul className="space-y-2 mb-4">
                      {grade.requirements.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-snpe-dark flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-200 pt-4">{grade.desc}</p>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-snpe-darker text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Reveal>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">{t('masterPage.cta.title')}</h2>
            <p className="text-white/85 leading-relaxed mb-8 max-w-2xl mx-auto">{t('masterPage.cta.desc')}</p>
            <Link
              to="/customerinquiry"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-snpe-darker rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              {t('masterPage.cta.button')} <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
