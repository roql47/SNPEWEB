import { useTranslation } from 'react-i18next'

const partners = [
  '/images/partner_1.png',
  '/images/partner_2.png',
  '/images/partner_3.png',
  '/images/partner_4.png',
]

export default function PartnerSlider() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-24 bg-[#f0f0f0]">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[2.2vw]">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-[#111] tracking-[-0.035em]">
            {t('home.partnersTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {partners.map((src, i) => (
            <div
              key={i}
              className="group bg-white rounded-[33px] aspect-[338/176] flex items-center justify-center p-6 md:p-8 hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={src}
                alt={`Partner ${i + 1}`}
                className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
