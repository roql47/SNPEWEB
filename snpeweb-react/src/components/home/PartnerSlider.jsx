import { useTranslation } from 'react-i18next'

const partners = [
  '/images/partner_6.png',
  '/images/partner_1.png',
  '/images/partner_2.png',
  '/images/partner_3.png',
]

export default function PartnerSlider() {
  const { t } = useTranslation()

  return (
    <section className="py-16 md:py-20 bg-[#f0f0f0]">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-[#111] tracking-[-0.035em]">
            {t('home.partnersTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {partners.map((src, i) => (
            <div
              key={i}
              className="group bg-white rounded-[18px] aspect-[338/176] flex items-center justify-center p-3 md:p-4 hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={src}
                alt={`Partner ${i + 1}`}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
