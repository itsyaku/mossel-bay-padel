'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] },
  }),
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy">
      {/* Diamond pattern — very subtle on hero */}
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-diamonds" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <polygon points="24,2 46,24 24,46 2,24" fill="none" stroke="#3BBFBF" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-diamonds)"/>
        </svg>
      </div>

      {/* Background poster image */}
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Indoor padel match in action"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Dark overlay — navy with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090C17] from-[40%] via-[#090C17]/88 via-[60%] to-[#090C17]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090C17] via-transparent to-[#090C17]/40 opacity-80" />
      </div>

      {/* Pink accent glow — top left */}
      <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-pink/5 blur-[120px] pointer-events-none" aria-hidden="true" />
      {/* Teal accent glow — right */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[600px] bg-teal/8 blur-[100px] pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24">
        <div className="max-w-[660px]">
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-px bg-pink" />
            <span className="font-body text-pink text-xs tracking-[0.35em] uppercase">
              Hartenbos · Mossel Bay · Indoor Courts
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.12}
            className="font-display text-white uppercase leading-[0.88] tracking-tight"
            style={{ fontSize: 'clamp(4.5rem, 10vw, 9rem)' }}
          >
            Play.<br />
            Compete.<br />
            <span className="text-teal">Connect.</span>
          </motion.h1>

          {/* Divider line with pink dot */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.22}
            className="flex items-center gap-3 mt-8 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-pink" />
            <div className="flex-1 h-px bg-white/10 max-w-xs" />
          </motion.div>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="font-body text-white/55 text-lg leading-relaxed max-w-[420px]"
          >
            Mossel Bay's premier indoor padel club — world-class courts, expert coaching, and a community built around the game.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.44}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#events"
              className="inline-flex items-center gap-2.5 bg-teal text-navy font-body font-semibold text-sm tracking-widest uppercase px-8 py-4 hover:bg-teal/90 transition-all duration-200 group"
            >
              View Events
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="https://playtomic.com/clubs/mossel-bay-padel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-pink/60 text-pink font-body font-medium text-sm tracking-widest uppercase px-8 py-4 hover:bg-pink hover:text-white hover:border-pink transition-all duration-200"
            >
              Book a Court
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.58}
            className="mt-16 flex flex-wrap gap-10 pt-8 border-t border-white/8"
          >
            {[
              { value: '2', label: 'Indoor Courts', accent: 'teal' },
              { value: 'Pro', label: 'Coaching', accent: 'pink' },
              { value: 'All', label: 'Skill Levels', accent: 'teal' },
              { value: '365', label: 'Days Open', accent: 'pink' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className={`font-display text-4xl leading-none ${stat.accent === 'pink' ? 'text-pink' : 'text-teal'}`}>
                  {stat.value}
                </span>
                <span className="font-body text-white/35 text-xs tracking-widest uppercase mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-body text-white/25 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-teal/40 to-transparent" />
      </div>

      {/* Bottom wedge into next section */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 40" className="w-full" fill="#090C17" preserveAspectRatio="none">
          <polygon points="0,40 1440,0 1440,40"/>
        </svg>
      </div>
    </section>
  )
}
