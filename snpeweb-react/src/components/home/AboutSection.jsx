import { useEffect, useRef, useState } from 'react'

export default function AboutSection() {
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
          ABOUT SNPE
        </h2>
        <div className="space-y-8 text-lg md:text-xl text-gray-600 leading-relaxed">
          <p className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="underline decoration-snpe decoration-4 underline-offset-4">바른자세벨트</span>와
            다양한 도구, 자세분석 APP을 활용한
          </p>
          <p className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            스스로 바른자세와 바른체형으로 회복하는{' '}
            <span className="underline decoration-snpe decoration-4 underline-offset-4">셀프 운동법</span>
          </p>
          <p className={`transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            근골격계 질환, 체형불균형, 오다리, 산후회복 등에 효과적인{' '}
            <span className="text-snpe font-semibold">새로운 패러다임의 운동</span>
          </p>
        </div>
      </div>
    </section>
  )
}
