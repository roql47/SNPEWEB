import { useTranslation } from 'react-i18next'

export default function AppSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-28 bg-mint-lighter/80 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[2.2vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <p
              className="text-mint text-base md:text-lg font-semibold tracking-tight mb-5"
              style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.015em' }}
            >
              SNPE APP
            </p>
            <h2 className="font-heading font-bold text-[#111] leading-[1.28] tracking-[-0.035em] text-[32px] md:text-[42px] lg:text-[48px] mb-8 md:mb-10">
              {t('home.appHeadlineLine1')}
              <br />
              {t('home.appHeadlineLine2')}
            </h2>
            <div className="space-y-5 text-[#111] text-base md:text-xl lg:text-[26px] leading-[1.58] tracking-[-0.025em]">
              <p>
                {t('home.appSectionP1Line1')}
                <br className="hidden md:block" />
                {t('home.appSectionP1Line2')}
              </p>
              <p>
                {t('home.appSectionP2Line1')}
                <br className="hidden md:block" />
                {t('home.appSectionP2Line2')}
              </p>
            </div>
            <div className="mt-10 md:mt-12 flex flex-wrap gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.snpe.Android"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-mint hover:bg-mint-dark text-white text-base font-medium tracking-tight rounded-full px-7 py-3 transition-colors min-w-[177px]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 01-.609-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.698-2.302 2.698-2.302zM5.864 2.658l10.937 6.333-2.302 2.302-8.635-8.635z"/></svg>
                Google Play
              </a>
              <div
                className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-500 text-base font-medium tracking-tight rounded-full px-7 py-3 min-w-[177px] cursor-not-allowed select-none"
                aria-disabled="true"
                title={t('home.appStoreComingTitle')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                {t('home.appStoreComing')}
              </div>
            </div>
            <p className="mt-5 text-sm md:text-base text-gray-500 leading-relaxed">
              {t('home.appAvailability')}
            </p>
          </div>

          <div className="order-1 lg:order-2 flex justify-center relative">
            <img
              src="/images/app-1-1.png"
              alt="SNPE App"
              className="relative w-[280px] md:w-[380px] lg:w-[460px] drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
