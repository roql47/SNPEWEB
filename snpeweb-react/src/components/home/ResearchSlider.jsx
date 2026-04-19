import { Link } from 'react-router-dom'
import { ArrowUpRight, Youtube, Instagram, MessageCircle } from 'lucide-react'

const snsLinks = [
  {
    href: 'https://www.youtube.com/@snpe',
    label: '유튜브',
    bg: 'bg-[#ff3d00]',
    icon: <Youtube size={20} className="text-white" strokeWidth={2} />,
  },
  {
    href: 'https://www.instagram.com/snpe_official',
    label: '인스타그램',
    bg: 'bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]',
    icon: <Instagram size={20} className="text-white" strokeWidth={2} />,
  },
  {
    href: 'https://cafe.naver.com/snpe',
    label: '네이버카페',
    bg: 'bg-[#03c75a]',
    icon: <span className="text-white font-bold text-base">N</span>,
  },
  {
    href: 'https://blog.naver.com/snpe',
    label: '블로그',
    bg: 'bg-[#03c75a]',
    icon: <span className="text-white font-bold text-xs">blog</span>,
  },
  {
    href: 'https://pf.kakao.com/snpe',
    label: '카카오톡',
    bg: 'bg-[#fee500]',
    icon: <MessageCircle size={20} className="text-[#3c1e1e]" fill="#3c1e1e" />,
  },
]

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

          {/* Right: Press + Video + SNS */}
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

            {/* Video */}
            <div className="md:col-start-2 md:row-start-1">
              <p
                className="text-mint text-sm md:text-base font-semibold mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.015em' }}
              >
                Video
              </p>
              <Link to="/snpe-video" className="group block bg-white rounded-[14px] overflow-hidden">
                <div className="aspect-[325/179] overflow-hidden">
                  <img
                    src="/images/research/research-video.png"
                    alt="SNPE Foot Balance 풋 밸런스 사용법"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
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
              </Link>
            </div>

            {/* SNS Row - under Press */}
            <div className="md:col-span-2 bg-white rounded-[14px] px-4 md:px-6 py-4">
              <ul className="flex items-center justify-between gap-2 md:gap-4 flex-wrap">
                {snsLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2.5 group"
                    >
                      <span className={`w-11 h-11 rounded-md flex items-center justify-center ${s.bg}`}>
                        {s.icon}
                      </span>
                      <span className="text-[#696969] font-medium text-sm md:text-base group-hover:text-[#111] transition-colors">
                        {s.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
