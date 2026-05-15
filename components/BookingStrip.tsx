'use client'

import { motion } from 'framer-motion'

export default function BookingStrip() {
  return (
    <section className="relative bg-navy-card border-y border-navy-border overflow-hidden py-20 px-6">
      {/* Diamond texture */}
      <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="strip-diamonds" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke="#E8197D" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#strip-diamonds)"/>
        </svg>
      </div>

      {/* Accent glows */}
      <div className="absolute inset-y-0 left-0 w-[300px] bg-teal/8 blur-[80px] pointer-events-none" aria-hidden="true"/>
      <div className="absolute inset-y-0 right-0 w-[300px] bg-pink/8 blur-[80px] pointer-events-none" aria-hidden="true"/>

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-pink"/>
            <span className="font-body text-pink text-xs tracking-[0.35em] uppercase">Playtomic Booking</span>
          </div>
          <h3
            className="font-display text-white uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
          >
            Ready<br className="md:hidden"/> to Play?
          </h3>
        </motion.div>

        {/* Divider */}
        <div className="hidden md:block w-px h-16 bg-white/10" aria-hidden="true"/>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex flex-col items-center md:items-end gap-4"
        >
          <p className="font-body text-white/40 text-sm">
            Book your court in 30 seconds on Playtomic.
          </p>
          <a
            href="https://playtomic.com/clubs/mossel-bay-padel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-teal text-navy font-display text-lg uppercase tracking-wide px-10 py-4 hover:bg-teal/90 transition-all duration-200 group font-semibold"
          >
            Book on Playtomic
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
