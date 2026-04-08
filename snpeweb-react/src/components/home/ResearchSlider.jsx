import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Award, BookOpen, GraduationCap } from 'lucide-react'

const highlights = [
  { icon: BookOpen, label: '서울대 15년 종단연구' },
  { icon: Award, label: 'ACSM / SSCI 논문 등재' },
  { icon: GraduationCap, label: '차의과대 석사과정 개설' },
]

export default function ResearchSlider() {
  const { t } = useTranslation()

  return (
    <section className="py-14 md:py-20 bg-snpe-darker">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
          {t('home.researchTitle')}
        </h2>
        <p className="text-white/60 text-sm mb-8">
          {t('home.researchDesc')}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {highlights.map((h) => (
            <div key={h.label} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <h.icon size={16} className="text-white/70" />
              <span className="text-white text-xs font-medium">{h.label}</span>
            </div>
          ))}
        </div>

        <Link
          to="/research"
          className="inline-block px-6 py-2.5 rounded-full bg-white text-snpe-darker font-medium text-sm hover:bg-snpe-light transition-colors"
        >
          연구논문 전체 보기 →
        </Link>
      </div>
    </section>
  )
}
