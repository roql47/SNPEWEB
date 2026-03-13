const effects = [
  { icon: '/images/main_icon1.png', title: '정서적 안정', desc: 'Emotional Stability' },
  { icon: '/images/main_icon2.png', title: '생리학적 효과', desc: 'Physiological Effect' },
  { icon: '/images/main_icon3.png', title: '긍정적 마인드', desc: 'Positive Mind Increase' },
  { icon: '/images/main_icon4.png', title: '교정 효과', desc: 'Orthodontic Effect' },
  { icon: '/images/main_icon5.png', title: '만성통증 완화', desc: 'Chronic Pain Relief' },
  { icon: '/images/main_icon6.png', title: '체력 향상', desc: 'Physical Improvement' },
]

export default function EffectList() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {effects.map((e, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 bg-white rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-full bg-snpe-light/30 flex items-center justify-center mb-4">
                <img src={e.icon} alt={e.title} className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">{e.title}</h3>
              <p className="text-xs text-gray-500">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
