'use client'

import { motion } from 'framer-motion'

export default function BookingStrip() {
  return (
    <section className="relative bg-teal overflow-hidden py-20 px-6">
      {/* Background court lines */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <svg viewBox="0 0 1440 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <g stroke="white" strokeWidth="1">
            {Array.from({ length: 14 }).map((_, i) => (
              <line key={i} x1={-200 + i * 130} y1="0" x2={i * 130 + 100} y2="160" />
            ))}
          </g>
          <line x1="0" y1="80" x2="1440" y2="80" stroke="white" strokeWidth="1.5" />
          <circle cx="720" cy="80" r="50" fill="none" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="font-body text-white/70 text-xs tracking-[0.35em] uppercase mb-2">
            Indoor Courts · Hartenbos
          </p>
          <h3 className="font-display text-white uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
          >
            Ready<br className="md:hidden" /> to Play?
          </h3>
        </motion.div>

        {/* Divider */}
        <div className="hidden md:block w-px h-16 bg-white/20" aria-hidden="true" />

        {/* Right CTA */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex flex-col items-center md:items-end gap-4"
        >
          <p className="font-body text-white/70 text-sm">
            Book your court on Playtomic — it only takes 30 seconds.
          </p>
          <a
            href="https://playtomic.com/clubs/mossel-bay-padel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-teal-dark text-white font-display text-lg uppercase tracking-wide px-10 py-4 hover:bg-white hover:text-teal transition-all duration-300 group"
          >
            Book on Playtomic
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
