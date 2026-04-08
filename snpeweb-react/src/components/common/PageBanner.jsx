import CategoryTabBar from './CategoryTabBar'

export default function PageBanner({ title, subtitle, backgroundImage }) {
  const bgStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {}

  return (
    <>
      <section
        className={`text-white py-16 md:py-24 relative ${!backgroundImage ? 'bg-gradient-to-br from-snpe-darker to-snpe-dark' : ''}`}
        style={bgStyle}
      >
        {backgroundImage && <div className="absolute inset-0 bg-black/40" />}
        <div className="max-w-[1440px] mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">{title}</h1>
          {subtitle && (
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      </section>
      <CategoryTabBar />
    </>
  )
}
