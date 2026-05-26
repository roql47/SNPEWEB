import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function AboutSection() {
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
              ABOUT SNPE
            </p>
            <h2 className="font-heading font-bold text-[#111] leading-[1.2] tracking-[-0.03em] text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8">
              스스로 회복할 수 있다는 자신감
            </h2>
            <div className="space-y-5 text-[#111] text-sm md:text-base lg:text-lg leading-relaxed tracking-[-0.01em]">
              <p>
                SNPE는 몸의 정렬과 움직임 회복을 통해
                <br className="hidden md:block" />
                만성적인 불편감과 무너진 균형을 스스로 인지하고 회복하도록 돕는
                <br className="hidden md:block" />
                자기 주도형 움직임 시스템입니다.
              </p>
              <p>
                척추에서 시작된 SNPE는
                <br className="hidden md:block" />
                이제 발·골반·호흡·움직임 체인까지 연결하며
                <br className="hidden md:block" />
                더 건강하게 움직이는 삶을 위한 웰니스 시스템으로 발전하고 있습니다.
              </p>
            </div>
            <div className="mt-10 md:mt-12">
              <Link
                to="/about"
                className="inline-flex items-center justify-center bg-mint hover:bg-mint-dark text-white text-base font-medium tracking-tight rounded-full px-8 py-3.5 transition-colors"
              >
                자세히 보기
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
