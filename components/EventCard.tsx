'use client'

import { motion } from 'framer-motion'
import type { Event } from '@/data/events'

// Banner bg + which accent color to use
const bannerSchemes = {
  dark:  { bg: '#0C1C1C', accent: '#3BBFBF', accentClass: 'border-teal' },
  teal:  { bg: '#170D1A', accent: '#E8197D', accentClass: 'border-pink' },
  mid:   { bg: '#0C1A18', accent: '#3BBFBF', accentClass: 'border-teal' },
  deep:  { bg: '#0E1020', accent: '#E8197D', accentClass: 'border-pink' },
}

const categoryColors: Record<string, string> = {
  Tournament: 'border-amber-400/40 text-amber-400',
  Coaching:   'border-sky-400/40 text-sky-400',
  Social:     'border-emerald-400/40 text-emerald-400',
  Youth:      'border-pink/40 text-pink',
}

function BannerPattern({ scheme, accent }: { scheme: 'dark' | 'teal' | 'mid' | 'deep'; accent: string }) {
  if (scheme === 'dark') return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <g stroke={accent} strokeWidth="0.7" opacity="0.2">
        {[-80,-30,20,70,120,170,220,270,320,370,420].map((x, i) => (
          <line key={i} x1={x} y1="0" x2={x + 180} y2="200"/>
        ))}
      </g>
      <circle cx="340" cy="60" r="45" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.25"/>
      <circle cx="340" cy="60" r="22" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.2"/>
      <line x1="300" y1="0" x2="400" y2="130" stroke={accent} strokeWidth="2.5" opacity="0.5" strokeLinecap="round"/>
    </svg>
  )

  if (scheme === 'teal') return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <defs>
        <pattern id={`dots-${scheme}`} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="14" cy="14" r="2" fill={accent} opacity="0.25"/>
        </pattern>
      </defs>
      <rect width="400" height="200" fill={`url(#dots-${scheme})`}/>
      <rect x="310" y="0" width="90" height="200" fill={accent} opacity="0.08"/>
      <line x1="310" y1="0" x2="310" y2="200" stroke={accent} strokeWidth="1.5" opacity="0.4"/>
    </svg>
  )

  if (scheme === 'mid') return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <g stroke={accent} strokeWidth="1.2" fill="none" opacity="0.22">
        <polygon points="200,6 394,100 200,194 6,100"/>
        <polygon points="200,36 364,100 200,164 36,100"/>
        <polygon points="200,66 334,100 200,134 66,100"/>
        <polygon points="200,96 304,100 200,104 96,100"/>
      </g>
      <circle cx="200" cy="100" r="5" fill={accent} opacity="0.5"/>
    </svg>
  )

  // deep — brand M + diagonals
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <g stroke={accent} strokeWidth="0.6" opacity="0.12">
        {[0,50,100,150,200,250,300,350,400,450].map((x, i) => (
          <line key={i} x1={x} y1="0" x2={x - 100} y2="200"/>
        ))}
      </g>
      <g fill="none" stroke={accent} strokeWidth="2.5" opacity="0.3" strokeLinejoin="round" strokeLinecap="round">
        <polyline points="270,168 270,62 322,118 374,62 374,168"/>
        <circle cx="270" cy="168" r="11"/>
      </g>
    </svg>
  )
}

interface Props {
  event: Event
  index: number
  onClick: () => void
}

export default function EventCard({ event, index, onClick }: Props) {
  const scheme = bannerSchemes[event.colorScheme]
  const pct = Math.round((event.spotsRemaining / event.totalSpots) * 100)
  const almostFull = event.spotsRemaining <= 8
  const isPink = scheme.accentClass === 'border-pink'

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${event.name}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className="group relative cursor-pointer bg-navy-card border border-navy-border hover:border-opacity-0 transition-all duration-400 hover:-translate-y-2 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
      style={{
        boxShadow: 'none',
      }}
      whileHover={{
        boxShadow: isPink
          ? '0 20px 60px rgba(232,25,125,0.15), 0 0 0 1px rgba(232,25,125,0.3)'
          : '0 20px 60px rgba(59,191,191,0.15), 0 0 0 1px rgba(59,191,191,0.3)',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 z-10"
        style={{ backgroundColor: scheme.accent }}
      />

      {/* Banner */}
      <div className="relative h-48 overflow-hidden" style={{ backgroundColor: scheme.bg }}>
        <BannerPattern scheme={event.colorScheme} accent={scheme.accent}/>

        {/* Date badge */}
        <div className="absolute top-5 left-5 border border-white/15 bg-black/30 backdrop-blur-sm px-3.5 py-2.5 text-center min-w-[56px]">
          <div className="font-display text-white text-3xl leading-none">{event.dateDay}</div>
          <div className="font-body text-white/55 text-[10px] tracking-[0.25em] mt-0.5">{event.dateMonth}</div>
        </div>

        {/* Category */}
        <div className="absolute top-5 right-5">
          <span className={`font-body text-[10px] font-medium tracking-[0.2em] uppercase border px-3 py-1 bg-black/20 ${categoryColors[event.category] ?? 'border-white/20 text-white/60'}`}>
            {event.category}
          </span>
        </div>

        {/* Hover reveal */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40">
          <span
            className="font-display text-white text-xl uppercase tracking-widest px-6 py-2.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
            style={{ backgroundColor: scheme.accent, color: isPink ? '#fff' : '#090C17' }}
          >
            View Details
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3 className="font-display text-white text-[1.55rem] uppercase leading-tight tracking-tight group-hover:opacity-90 transition-opacity duration-200">
          {event.name}
        </h3>
        <p className="font-body text-white/40 text-sm leading-relaxed mt-2 mb-5">
          {event.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-3xl leading-none" style={{ color: scheme.accent }}>
              {event.price}
            </span>
            <span className="font-body text-white/30 text-xs">{event.priceUnit}</span>
          </div>
          <div className="flex items-center gap-1.5 font-body text-xs text-white/35">
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M8 5v3.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {event.time.split('–')[0].trim()}
          </div>
        </div>

        {/* Spots bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-body text-[11px] text-white/30 tracking-wide">Spots remaining</span>
            <span className={`font-body text-[11px] font-medium ${almostFull ? 'text-pink' : 'text-white/50'}`}>
              {almostFull && '⚡ '}{event.spotsRemaining} / {event.totalSpots}
            </span>
          </div>
          <div className="h-0.5 bg-white/10">
            <div
              className="h-full transition-all"
              style={{ width: `${pct}%`, backgroundColor: almostFull ? '#E8197D' : scheme.accent }}
            />
          </div>
        </div>
      </div>

      {/* Bottom sliding accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        style={{ backgroundColor: scheme.accent }}
      />
    </motion.article>
  )
}
