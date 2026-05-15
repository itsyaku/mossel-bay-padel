'use client'

import { motion } from 'framer-motion'
import type { Event } from '@/data/events'

const schemes = {
  dark:  { bg: '#1A2E2E', accent: '#3BBFBF', badge: 'bg-teal/20 text-teal' },
  teal:  { bg: '#3BBFBF', accent: '#1A2E2E', badge: 'bg-teal-dark/20 text-teal-dark' },
  mid:   { bg: '#2A9D8F', accent: '#F0FAFA', badge: 'bg-white/20 text-white' },
  deep:  { bg: '#264653', accent: '#3BBFBF', badge: 'bg-teal/20 text-teal' },
}

const categoryColors: Record<string, string> = {
  Tournament: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
  Coaching:   'bg-sky-400/15 text-sky-300 border-sky-400/30',
  Social:     'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
  Youth:      'bg-rose-400/15 text-rose-300 border-rose-400/30',
}

function CardPattern({ scheme }: { scheme: 'dark' | 'teal' | 'mid' | 'deep' }) {
  const { accent } = schemes[scheme]

  if (scheme === 'dark') return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <g stroke={accent} strokeWidth="1" opacity="0.18">
        {[-100,-40,20,80,140,200,260,320,380,440].map((x, i) => (
          <line key={i} x1={x} y1="0" x2={x + 180} y2="200" />
        ))}
      </g>
      <line x1="310" y1="0" x2="400" y2="140" stroke={accent} strokeWidth="3" opacity="0.55" strokeLinecap="round" />
      <circle cx="355" cy="55" r="36" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.25" />
      <circle cx="355" cy="55" r="18" fill="none" stroke={accent} strokeWidth="1" opacity="0.2" />
    </svg>
  )

  if (scheme === 'teal') return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <g fill={accent} opacity="0.22">
        {Array.from({ length: 7 }).map((_, row) =>
          Array.from({ length: 14 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={20 + col * 28} cy={20 + row * 28} r="2.5" />
          ))
        )}
      </g>
      <rect x="310" y="0" width="90" height="200" fill={accent} opacity="0.12" />
      <line x1="310" y1="0" x2="310" y2="200" stroke={accent} strokeWidth="2" opacity="0.4" />
    </svg>
  )

  if (scheme === 'mid') return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <g stroke={accent} strokeWidth="1.5" fill="none" opacity="0.28">
        <polygon points="200,8 392,104 200,192 8,104" />
        <polygon points="200,38 362,104 200,162 38,104" />
        <polygon points="200,68 332,104 200,132 68,104" />
        <polygon points="200,98 302,104 200,102 98,104" />
      </g>
      <circle cx="200" cy="104" r="6" fill={accent} opacity="0.5" />
    </svg>
  )

  // deep — brand M mark
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <g stroke={accent} strokeWidth="0.8" opacity="0.12">
        {[0,40,80,120,160,200,240,280,320,360,400].map((x, i) => (
          <line key={i} x1={x} y1="0" x2={x - 100} y2="200" />
        ))}
      </g>
      <g fill="none" stroke={accent} strokeWidth="2.5" opacity="0.35" strokeLinejoin="round" strokeLinecap="round">
        <polyline points="270,165 270,60 320,115 370,60 370,165" />
        <circle cx="270" cy="165" r="12" />
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
  const scheme = schemes[event.colorScheme]
  const pct = Math.round((event.spotsRemaining / event.totalSpots) * 100)
  const almostFull = event.spotsRemaining <= 8

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
      className="group relative cursor-pointer bg-white shadow-sm hover:shadow-2xl hover:shadow-black/10 transition-all duration-400 hover:-translate-y-2 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
    >
      {/* Banner */}
      <div
        className="relative h-52 overflow-hidden"
        style={{ backgroundColor: scheme.bg }}
      >
        <CardPattern scheme={event.colorScheme} />

        {/* Date badge */}
        <div className="absolute top-5 left-5 bg-black/25 backdrop-blur-sm border border-white/15 px-3.5 py-2.5 text-center min-w-[56px]">
          <div className="font-display text-white text-3xl leading-none">{event.dateDay}</div>
          <div className="font-body text-white/65 text-[10px] tracking-[0.25em] mt-0.5">{event.dateMonth}</div>
        </div>

        {/* Category pill */}
        <div className="absolute top-5 right-5">
          <span className={`font-body text-[10px] font-medium tracking-[0.2em] uppercase border px-3 py-1 ${categoryColors[event.category] ?? 'bg-white/10 text-white border-white/20'}`}>
            {event.category}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-teal-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* "View Details" reveal on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="font-display text-white text-xl uppercase tracking-widest bg-teal px-6 py-2.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            View Details
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3 className="font-display text-teal-dark text-[1.6rem] uppercase leading-tight tracking-tight group-hover:text-teal transition-colors duration-200">
          {event.name}
        </h3>
        <p className="font-body text-gray-500 text-sm leading-relaxed mt-2 mb-5">
          {event.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-teal text-3xl leading-none">{event.price}</span>
            <span className="font-body text-gray-400 text-xs">{event.priceUnit}</span>
          </div>
          <div className="flex items-center gap-1.5 font-body text-xs text-gray-400">
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 5v3.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {event.time.split('–')[0].trim()}
          </div>
        </div>

        {/* Spots bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-body text-[11px] text-gray-400 tracking-wide">Spots remaining</span>
            <span className={`font-body text-[11px] font-medium ${almostFull ? 'text-rose-500' : 'text-teal-dark'}`}>
              {almostFull && '⚡ '}
              {event.spotsRemaining} / {event.totalSpots}
            </span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${almostFull ? 'bg-rose-400' : 'bg-teal'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom teal accent line — slides in on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.article>
  )
}
