import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { dataStore } from '../../lib/dataStore'

export default function MainCarousel() {
  const { t } = useTranslation()
  const [branches, setBranches] = useState([])

  useEffect(() => {
    dataStore.getBranches()
      .then(setBranches)
      .catch(() => setBranches([]))
  }, [])

  if (branches.length === 0) return null

  return (
    <section className="py-20 md:py-24 bg-mint-lighter/30">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t('home.branchesTitle')}</h2>
          <p className="text-sm md:text-base text-gray-600">{t('home.branchesSubtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {branches.map((b) => (
            <a
              key={b.id}
              href={b.map_url || undefined}
              target={b.map_url ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group block bg-white rounded-2xl overflow-hidden border border-mint-light/40 hover:shadow-xl hover:-translate-y-1 hover:border-mint transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                {b.image_url && (
                  <img
                    src={b.image_url}
                    alt={b.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                )}
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-mint-darker text-white text-[11px] font-bold tracking-wider shadow-sm">
                  <MapPin size={11} /> {t('home.branchBadge')}
                </span>
              </div>
              <div className="p-5 flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1">{b.name}</h3>
                  {b.address && <p className="text-xs md:text-sm text-gray-500 truncate">{b.address}</p>}
                </div>
                {b.map_url && (
                  <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-mint-darker text-white flex items-center justify-center group-hover:bg-mint-dark transition-colors">
                    <ExternalLink size={14} />
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/search-center"
            className="inline-flex items-center gap-2 px-6 py-3 border border-mint-darker rounded-full text-sm text-mint-darker font-medium hover:bg-mint-darker hover:text-white transition-all"
          >
            <MapPin size={16} /> {t('home.findCenters')}
          </Link>
        </div>
      </div>
    </section>
  )
}
