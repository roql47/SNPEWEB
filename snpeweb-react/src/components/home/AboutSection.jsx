import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function AboutSection() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-12">
          {t('home.aboutTitle')}
        </h2>
        <div className="space-y-8 text-lg md:text-xl text-gray-600 leading-relaxed">
          <p className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-snpe-dark font-semibold">{t('home.aboutBelt')}</span>
            {t('home.aboutLine1')}
          </p>
          <p className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t('home.aboutLine2')}{' '}
            <span className="text-snpe-dark font-semibold">{t('home.aboutSelf')}</span>
          </p>
          <p className={`transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t('home.aboutLine3')}{' '}
            <span className="text-snpe-dark font-semibold">{t('home.aboutAccent')}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
