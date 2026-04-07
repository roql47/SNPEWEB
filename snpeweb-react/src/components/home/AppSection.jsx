import { useTranslation } from 'react-i18next'

export default function AppSection() {
  const { t } = useTranslation()

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/images/app-1-1.png"
              alt="SNPE App"
              className="w-[260px] md:w-[340px] drop-shadow-2xl"
            />
          </div>

          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {t('home.appTitle')}
            </h2>
            <p className="text-snpe-dark text-lg font-medium mb-6">
              {t('home.appSubtitle')}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {t('home.appDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a
                href="https://play.google.com/store/apps/details?id=com.snpe.Android"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 01-.609-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.698-2.302 2.698-2.302zM5.864 2.658l10.937 6.333-2.302 2.302-8.635-8.635z"/></svg>
                Google Play
              </a>
              <a
                href="https://itunes.apple.com/app/id1303149719"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                App Store
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
