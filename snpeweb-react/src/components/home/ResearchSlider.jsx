import { Link } from 'react-router-dom'
import { ArrowUpRight, Play } from 'lucide-react'

// TODO #7: 메인의 SNS 행은 푸터와 중복되어 단일 source(`Footer.jsx` + `data/socialLinks.js`)로 통합.
// 메인에서는 Research·Press·Video 콘텐츠에 집중하고, SNS 진입은 푸터에서 일괄 제공.

export default function ResearchSlider() {
  return (
    <section className="py-20 md:py-28 bg-[#f9f9f9]">
      <div className="max-w-[1657px] mx-auto px-4 md:px-8 lg:px-[2.2vw]">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading font-bold text-[#111] leading-[1.1] tracking-[-0.035em] text-[32px] md:text-[42px] lg:text-[58px]">
            SNPE Research &amp; Media
          </h2>
          <p className="mt-5 text-[#111] text-base md:text-xl lg:text-[26px] tracking-[-0.025em]">
            연구 결과와 미디어를 통해 검증된 SNPE
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[758fr_849fr] gap-8 lg:gap-[50px]">

          {/* Left: Research card */}
          <div>
            <p
              className="text-mint text-sm md:text-base font-semibold mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.015em' }}
            >
              Research
            </p>
            <Link
              to="/research"
              className="group block bg-white rounded-[24px] md:rounded-[35px] p-6 md:p-10 h-[calc(100%-2rem)] transition-shadow hover:shadow-lg relative"
            >
              <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
                <div className="sm:w-[200px] md:w-[253px] shrink-0">
                  <div className="aspect-[253/361] bg-[#eaeaea] rounded-sm overflow-hidden">
                    <img
                      src="/images/research/research-paper.png"
                      alt="SNPE 연구보고서"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="text-[#111] font-bold text-xl md:text-2xl tracking-tight mb-4">
                    SNPE 연구보고서
                  </h3>
                  <p className="text-[#616161] text-sm md:text-base leading-relaxed mb-4">
                    SNPE 효과 검증을 위한 체험사례 분석
                    <br />
                    2006년부터 2018년의 약 1,000건의 자료를 분석
                  </p>
                  <p className="text-[#737272] text-xs md:text-sm leading-relaxed">
                    만성 통증, 교정 치료, 생리학적 변화와
                    <br className="hidden md:block" />
                    정서적·임상적 및 심리적 증상에 대한 효과를 검증하였으며,
                    <br className="hidden md:block" />
                    SNPE 도구와 동작별 효과에 대한 비교 분석 결과를
                    <br className="hidden md:block" />
                    확인할 수 있습니다.
                  </p>
                </div>
              </div>
              <div className="absolute right-6 md:right-10 bottom-6 md:bottom-8 inline-flex items-center gap-1.5 text-xs md:text-sm text-[#515151] font-medium tracking-[0.05em]">
                VIEW MORE
                <span className="w-6 h-6 rounded-full bg-mint-lighter flex items-center justify-center">
                  <ArrowUpRight size={14} className="text-mint-darker group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2.5} />
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Press + Video (TODO #7: SNS 행은 푸터로 통합) */}
          <div className="grid grid-cols-1 md:grid-cols-[496fr_325fr] gap-6 md:gap-[30px] auto-rows-min">

            {/* Press */}
            <div className="md:col-start-1 md:row-start-1">
              <p
                className="text-mint text-sm md:text-base font-semibold mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.015em' }}
              >
                Press
              </p>
              <Link to="/news" className="block bg-white rounded-[14px] overflow-hidden">
                <div className="aspect-[496/283] bg-white">
                  <img
                    src="/images/research/research-photo.png"
                    alt="SNPE Press"
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Video — SNPE 공식 유튜브 채널로 이동 (별도 운동영상 페이지 없음) */}
            <div className="md:col-start-2 md:row-start-1">
              <p
                className="text-mint text-sm md:text-base font-semibold mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.015em' }}
              >
                Video
              </p>
              <a
                href="https://www.youtube.com/watch?v=LfWjDXopI4Y"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SNPE Foot Balance 풋 밸런스 사용법 영상 (새 탭에서 열기)"
                className="group block bg-white rounded-[14px] overflow-hidden"
              >
                <div className="aspect-[325/179] overflow-hidden relative">
                  <img
                    src="/images/research/research-video.png"
                    alt="SNPE Foot Balance 풋 밸런스 사용법"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                      <Play size={22} className="text-[#ff3d00] ml-0.5" fill="#ff3d00" />
                    </span>
                  </span>
                </div>
                <div className="px-5 py-4 relative">
                  <h4 className="text-[#454545] font-semibold text-sm md:text-base mb-1.5 tracking-tight pr-6">
                    SNPE Foot Balance 풋 밸런스 사용법
                  </h4>
                  <p className="text-[#616161] text-xs leading-relaxed pr-6">
                    발 균형을 바로잡는 가장 쉬운 시작
                    <br />
                    SNPE 풋 밸런스 사용법을 단계별로 알려드립니다
                  </p>
                  <span className="absolute right-5 bottom-4 w-6 h-6 rounded-full bg-mint-lighter flex items-center justify-center">
                    <ArrowUpRight size={14} className="text-mint-darker" strokeWidth={2.5} />
                  </span>
                </div>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
