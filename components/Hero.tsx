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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#090C17]">
      {/* Background poster image */}
      <div className="absolute inset-0">
        <Image
          src="/mbp_poster.webp"
          alt="Mossel Bay Padel players in action"
          fill
          className="object-cover object-right"
          priority
          quality={90}
        />
        {/* Left-to-right gradient: text area stays dark, image bleeds in on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090C17] from-[35%] via-[#090C17]/85 via-[55%] to-[#090C17]/25" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090C17] via-transparent to-transparent opacity-60" />
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24">
        <div className="max-w-[640px]">
          {/* Eyebrow tag */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-px bg-teal" />
            <span className="font-body text-teal text-xs tracking-[0.35em] uppercase">
              Hartenbos · Mossel Bay · Indoor Courts
            </span>
          </motion.div>

          {/* Main headline */}
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

          {/* Sub copy */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.28}
            className="mt-7 font-body text-white/60 text-lg leading-relaxed max-w-[420px]"
          >
            Mossel Bay's premier indoor padel club — world-class courts, expert coaching, and a community built around the game.
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.42}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#events"
              className="inline-flex items-center gap-2.5 bg-teal text-white font-body font-medium text-sm tracking-widest uppercase px-8 py-4 hover:bg-teal-mid transition-colors duration-200 group"
            >
              View Events
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="https://playtomic.com/clubs/mossel-bay-padel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-white/30 text-white font-body font-medium text-sm tracking-widest uppercase px-8 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-200"
            >
              Book a Court
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.58}
            className="mt-16 flex flex-wrap gap-8 pt-8 border-t border-white/10"
          >
            {[
              { value: '2', label: 'Indoor Courts' },
              { value: 'Pro', label: 'Coaching' },
              { value: 'All', label: 'Skill Levels' },
              { value: '365', label: 'Days Open' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display text-teal text-4xl leading-none">{stat.value}</span>
                <span className="font-body text-white/40 text-xs tracking-widest uppercase mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-body text-white/30 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </div>

      {/* Diagonal bottom edge accent */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full" fill="#F8F6F2" preserveAspectRatio="none">
          <polygon points="0,60 1440,0 1440,60" />
        </svg>
      </div>
    </section>
  )
}
