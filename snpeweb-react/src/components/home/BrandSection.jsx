export default function BrandSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-mint-lighter/40 to-mint-lighter/70 py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 text-center">
        <p className="font-heading text-xl md:text-3xl lg:text-4xl text-gray-800 tracking-wide mb-6 md:mb-8">
          <strong className="font-bold">S</strong>elf{' '}
          <strong className="font-bold">N</strong>atural{' '}
          <strong className="font-bold">P</strong>osture{' '}
          <strong className="font-bold">E</strong>xercise
        </p>

        <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-mint-darker leading-tight mb-8 md:mb-10">
          <span className="inline-block border-b-2 border-mint-darker pb-2">
            스스로 회복할 수 있다는 자신감
          </span>
        </h2>

        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
          당신의 통증과 체형 고민,
          <br />
          SNPE가 새로운 시작이 됩니다.
        </p>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-12 md:h-20 text-white"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,60 C240,10 520,90 780,50 C1020,15 1240,70 1440,30 L1440,80 L0,80 Z" fill="currentColor" />
      </svg>
    </section>
  )
}
