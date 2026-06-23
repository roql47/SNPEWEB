import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function AboutSection() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="about-section"
      ref={ref}
      className="py-20 md:py-28 bg-white"
    >
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[2.2vw]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,715fr)_minmax(0,1133fr)] gap-10 md:gap-14 items-center">
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="text-mint text-base md:text-lg font-semibold tracking-tight mb-5" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.015em' }}>
              {t('home.aboutTitle')}
            </p>
            <h2 className="font-heading font-bold text-[#111] leading-[1.2] tracking-[-0.03em] text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8">
              {t('home.aboutSectionTitle')}
              <br />
              <span className="text-lg md:text-xl lg:text-2xl font-medium text-gray-500">{t('home.aboutSectionSubtitle')}</span>
            </h2>
            <div className="space-y-5 text-[#111] text-sm md:text-base lg:text-lg leading-relaxed tracking-[-0.01em]">
              <p>
                {t('home.aboutSectionP1Line1')}
                <br className="hidden md:block" />
                {t('home.aboutSectionP1Line2')}
                <br className="hidden md:block" />
                {t('home.aboutSectionP1Line3')}
              </p>
              <p>
                {t('home.aboutSectionP2Line1')}
                <br className="hidden md:block" />
                {t('home.aboutSectionP2Line2')}
                <br className="hidden md:block" />
                {t('home.aboutSectionP2Line3')}
              </p>
            </div>
            <div className="mt-10 md:mt-12">
              <Link
                to="/about"
                className="inline-flex items-center justify-center bg-mint hover:bg-mint-dark text-white text-base font-medium tracking-tight rounded-full px-8 py-3.5 transition-colors"
              >
                {t('home.learnMore')}
              </Link>
            </div>
          </div>

          <div className={`relative transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="relative aspect-[1133/632] w-full overflow-hidden rounded-[32px] md:rounded-[40px] bg-mint-lighter">
              <img
                src="/images/L-move2.png"
                alt="SNPE"
                className="absolute inset-0 w-full h-full object-contain"
                onError={() => setImgFailed(true)}
              />
              {imgFailed && (
                <img
                  src="/images/main_img2.png"
                  alt="SNPE"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
