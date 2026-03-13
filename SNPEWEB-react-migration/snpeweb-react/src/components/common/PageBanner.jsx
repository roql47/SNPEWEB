import { Link } from 'react-router-dom'

export default function PageBanner({ title, subtitle, breadcrumb = [] }) {
  return (
    <section className="bg-gradient-to-br from-snpe-darker to-snpe-dark text-white py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">{title}</h1>
        {subtitle && (
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">{subtitle}</p>
        )}
        {breadcrumb.length > 0 && (
          <nav className="mt-6 flex items-center justify-center gap-2 text-sm text-white/60">
            <Link to="/" className="hover:text-white transition-colors">HOME</Link>
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>/</span>
                {item.path ? (
                  <Link to={item.path} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>
    </section>
  )
}
