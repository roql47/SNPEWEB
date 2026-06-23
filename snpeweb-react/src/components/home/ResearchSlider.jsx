import { Link } from 'react-router-dom'
import { ArrowUpRight, Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'

// TODO #7: 메인의 SNS 행은 푸터와 중복되어 단일 source(`Footer.jsx` + `data/socialLinks.js`)로 통합.
// 메인에서는 Research·Press·Video 콘텐츠에 집중하고, SNS 진입은 푸터에서 일괄 제공.

export default function ResearchSlider() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-28 bg-[#f9f9f9]">
      <div className="max-w-[1657px] mx-auto px-4 md:px-8 lg:px-[2.2vw]">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading font-bold text-[#111] leading-[1.1] tracking-[-0.035em] text-[32px] md:text-[42px] lg:text-[58px]">
            SNPE Research &amp; Media
          </h2>
          <p className="mt-5 text-[#111] text-base md:text-xl lg:text-[26px] tracking-[-0.025em]">
            {t('home.researchMediaSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[50px]">

          {/* Left: Research card */}
          <div className="flex flex-col">
            <p
              className="text-mint text-sm md:text-base font-semibold mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.015em' }}
            >
              Research
            </p>
            <Link
              to="/research"
              className="group flex-1 block bg-white rounded-[24px] md:rounded-[35px] p-6 md:p-10 transition-shadow hover:shadow-lg relative"
            >
              <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
                <div className="sm:w-[200px] md:w-[253px] shrink-0">
                  <div className="aspect-[253/361] bg-[#eaeaea] rounded-sm overflow-hidden">
                    <img
                      src="/images/research/research-paper.png"
                      alt={t('home.researchCardTitle')}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="text-[#111] font-bold text-xl md:text-2xl tracking-tight mb-4">
                    {t('home.researchCardTitle')}
                  </h3>
                  <p className="text-[#616161] text-sm md:text-base leading-relaxed mb-4">
                    {t('home.researchCardLead1')}
                    <br />
                    {t('home.researchCardLead2')}
                  </p>
                  <p className="text-[#737272] text-xs md:text-sm leading-relaxed">
                    {t('home.researchCardDesc1')}
                    <br className="hidden md:block" />
                    {t('home.researchCardDesc2')}
                    <br className="hidden md:block" />
                    {t('home.researchCardDesc3')}
                    <br className="hidden md:block" />
                    {t('home.researchCardDesc4')}
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

          {/* Right: Video */}
          <div className="flex flex-col">
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
              aria-label={t('home.videoAria')}
              className="group flex-1 block bg-white rounded-[24px] md:rounded-[35px] overflow-hidden transition-shadow hover:shadow-lg"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src="/images/research/research-video.png"
                  alt={t('home.videoTitle')}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                    <Play size={26} className="text-[#ff3d00] ml-0.5" fill="#ff3d00" />
                  </span>
                </span>
              </div>
              <div className="px-6 md:px-10 py-6 md:py-8 relative">
                <h4 className="text-[#454545] font-semibold text-base md:text-lg mb-2 tracking-tight pr-8">
                  {t('home.videoTitle')}
                </h4>
                <p className="text-[#616161] text-sm leading-relaxed pr-8">
                  {t('home.videoDesc1')}
                  <br />
                  {t('home.videoDesc2')}
                </p>
                <span className="absolute right-6 md:right-10 bottom-6 md:bottom-8 w-6 h-6 rounded-full bg-mint-lighter flex items-center justify-center">
                  <ArrowUpRight size={14} className="text-mint-darker" strokeWidth={2.5} />
                </span>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
