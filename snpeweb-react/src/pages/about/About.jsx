import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import {
  Activity,
  Wind,
  Scale,
  Eye,
  Sparkles,
  Heart,
  Quote,
  Target,
  Compass,
} from 'lucide-react'

const keyAreaIcons = [Activity, Wind, Scale, Eye, Sparkles, Heart]

const ABOUT_IMGS = [
  '/images/about/snpe-intro/image1.jpeg',
  '/images/about/snpe-intro/image2.jpeg',
  '/images/about/snpe-intro/image3.jpeg',
  '/images/about/snpe-intro/image4.jpeg',
]

function Paragraphs({ items, className = '' }) {
  return (
    <div className={`space-y-5 text-gray-700 leading-relaxed text-sm md:text-base ${className}`}>
      {items.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </div>
  )
}

export default function About() {
  const { t } = useTranslation()
  const keyAreas = t('aboutPage.keyAreas.items', { returnObjects: true })

  return (
    <>
      <PageBanner title={t('pages.about')} subtitle={t('pages.aboutSub')} />

      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-mint-lighter/30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">
              {t('aboutPage.what.eyebrow')}
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              {t('aboutPage.what.title')}
            </h2>
            <p className="text-xl md:text-2xl text-mint-darker font-medium">
              {t('aboutPage.what.subtitle')}
              <br />
              <span className="text-lg md:text-xl font-normal text-mint-darker/70">
                {t('aboutPage.what.subtitleEn')}
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img src={ABOUT_IMGS[0]} alt={t('aboutPage.what.imageAlt')} className="w-full h-auto block" loading="lazy" />
            </div>
            <Paragraphs items={t('aboutPage.what.body', { returnObjects: true })} />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">
              {t('aboutPage.beginning.eyebrow')}
            </p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-gray-900">
              {t('aboutPage.beginning.title')}
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-center mb-10">
            <div className="rounded-2xl overflow-hidden">
              <img src={ABOUT_IMGS[1]} alt={t('aboutPage.beginning.imageAlt')} className="w-full h-auto block" loading="lazy" />
            </div>
            <Paragraphs items={t('aboutPage.beginning.body', { returnObjects: true })} />
          </div>

          <div className="bg-mint-lighter/40 rounded-3xl p-8 md:p-10 mb-10 border border-mint/20">
            <Paragraphs items={t('aboutPage.beginning.note', { returnObjects: true })} className="space-y-4" />
          </div>

          <blockquote className="relative max-w-3xl mx-auto text-center px-6">
            <Quote size={32} className="text-mint/40 mx-auto mb-3" />
            <p className="text-lg md:text-xl text-gray-800 font-heading leading-relaxed italic whitespace-pre-line">
              {t('aboutPage.beginning.quote')}
            </p>
          </blockquote>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-mint-lighter/30 to-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">
              {t('aboutPage.expanding.eyebrow')}
            </p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-gray-900">
              {t('aboutPage.expanding.title')}
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
            <Paragraphs items={t('aboutPage.expanding.body', { returnObjects: true })} />
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img src={ABOUT_IMGS[2]} alt={t('aboutPage.expanding.imageAlt')} className="w-full h-auto block" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">
              {t('aboutPage.keyAreas.eyebrow')}
            </p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('aboutPage.keyAreas.title')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {keyAreas.map((area, index) => {
              const Icon = keyAreaIcons[index]
              return (
                <div
                  key={area.en}
                  className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-mint/40 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-mint-lighter/60 text-mint-darker flex items-center justify-center mb-5">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1.5 leading-snug">
                    {area.en}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{area.local}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-14 text-center bg-white rounded-3xl p-8 md:p-10 border border-mint/20">
            <p className="text-lg md:text-2xl font-heading text-mint-darker italic">
              {t('aboutPage.keyAreas.quote')}
            </p>
            <p className="mt-2 text-sm md:text-base text-gray-600">
              {t('aboutPage.keyAreas.quoteSub')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">
              {t('aboutPage.future.eyebrow')}
            </p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-gray-900">
              {t('aboutPage.future.title')}
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <Paragraphs items={t('aboutPage.future.body', { returnObjects: true })} />
            <div className="relative rounded-2xl overflow-hidden shadow-md">
              <img src={ABOUT_IMGS[3]} alt={t('aboutPage.future.imageAlt')} className="w-full h-auto block" loading="lazy" />
              <span className="absolute bottom-2 right-2 md:bottom-3 md:right-3 text-[10px] md:text-xs text-white/90 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
                Generated with AI
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-mint-darker mb-3">
              {t('aboutPage.missionVision.eyebrow')}
            </p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-gray-900">
              {t('aboutPage.missionVision.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-mint/20 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-mint-lighter/60 text-mint-darker flex items-center justify-center mb-5">
                <Target size={22} strokeWidth={1.8} />
              </div>
              <p className="text-xs md:text-sm font-semibold tracking-[0.2em] text-mint-darker mb-2">
                MISSION
              </p>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 leading-snug">
                {t('aboutPage.missionVision.missionTitle')}
              </h3>
              <Paragraphs items={t('aboutPage.missionVision.missionBody', { returnObjects: true })} className="space-y-3" />
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-10 border border-mint/20 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-mint-lighter/60 text-mint-darker flex items-center justify-center mb-5">
                <Compass size={22} strokeWidth={1.8} />
              </div>
              <p className="text-xs md:text-sm font-semibold tracking-[0.2em] text-mint-darker mb-2">
                VISION
              </p>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 leading-snug whitespace-pre-line">
                {t('aboutPage.missionVision.visionTitle')}
              </h3>
              <Paragraphs items={t('aboutPage.missionVision.visionBody', { returnObjects: true })} className="space-y-3" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-gradient-to-br from-mint-darker via-mint-dark to-mint text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-3xl md:text-5xl font-heading font-bold mb-3 leading-tight">
            Built on Self Recovery
          </p>
          <p className="text-xl md:text-3xl font-heading text-white/90 leading-tight">
            Evolving Through Movement Science
          </p>
        </div>
      </section>
    </>
  )
}
