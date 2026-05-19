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
            <h2 className="font-heading font-bold text-[#111] leading-[1.1] tracking-[-0.035em] text-[32px] md:text-[42px] lg:text-[48px] mb-8 md:mb-10">
              작은 움직임이 만드는 큰 변화
            </h2>
            <div className="space-y-6 text-[#111] text-base md:text-xl lg:text-[26px] leading-[1.58] tracking-[-0.025em]">
              <p>
                SNPE 도구와 자세분석을 통해 인간 본연의 자세로 회복을 지향하며
                <br className="hidden md:block" />
                스스로 몸을 인식하고, 바로잡고, 회복하는 새로운 패러다임의 운동입니다.
              </p>
              <p>
                작고 단순한 움직임이 몸의 정렬을 바꾸고
                <br className="hidden md:block" />
                결국, 몸 전체의 균형을 바꿉니다.
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
