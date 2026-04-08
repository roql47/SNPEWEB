import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function AboutSection() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
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
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className={`text-sm uppercase tracking-widest text-snpe-dark font-medium mb-6 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          SNPE VISION
        </p>
        <h2 className={`text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          가장 단순한 것이<br />가장 강력할 수 있다
        </h2>
        <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed">
          <p className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            100세 시대, 건강한 삶의 주도권은 자신에게 있습니다.
          </p>
          <p className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            SNPE는 <span className="text-snpe-dark font-semibold">바른자세벨트</span>와 다양한 도구, AI 자세분석 APP을 활용하여
            스스로 바른자세와 바른체형으로 회복하는{' '}
            <span className="text-snpe-dark font-semibold">셀프 운동법</span>입니다.
          </p>
          <p className={`transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            근골격계 질환, 체형 불균형, 만성 통증에 효과적이며,
            ACSM 국제 학술지에 등재된 과학적 근거를 바탕으로
            세계인의 건강을 책임지는 새로운 패러다임의 운동입니다.
          </p>
        </div>
        <div className={`mt-10 transition-all duration-700 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link
            to="/about"
            className="inline-block px-8 py-3 rounded-full bg-snpe-darker text-white text-sm font-medium hover:bg-snpe-dark transition-colors"
          >
            About SNPE →
          </Link>
        </div>
      </div>
    </section>
  )
}
