import Image from "next/image"

export default function WelcomeMessage() {
  return (
    <section className="border-y border-white/10 bg-[#121210]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative min-h-72 lg:min-h-full">
          <Image src="/backgroundImages/seats.jpeg" alt="The church auditorium" fill className="object-cover grayscale" sizes="(min-width: 1024px) 45vw, 100vw" />
        </div>
        <div className="px-6 py-16 md:px-12 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d8b267]">Welcome</p>
          <h2 className="mt-5 max-w-xl text-balance font-display text-4xl font-semibold leading-tight text-white md:text-5xl">This Is Church. This Is Home.</h2>
          <div className="mt-7 max-w-xl space-y-5 text-base leading-8 text-white/70 md:text-lg">
            <p>We are a community of believers committed to serving God and sharing His love. There is a place for you here, wherever you are on your journey of faith.</p>
            <p>Come worship, grow in the Word, and serve with a people who are ready for God.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
