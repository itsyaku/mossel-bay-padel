'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { events } from '@/data/events'
import EventCard from './EventCard'
import EventDialog from './EventDialog'
import type { Event } from '@/data/events'

export default function EventsSection() {
  const [selected, setSelected] = useState<Event | null>(null)

  return (
    <section id="events" className="relative bg-navy py-24 md:py-32 px-6 overflow-hidden">
      {/* Diamond grid texture */}
      <div className="absolute inset-0 opacity-[0.055]" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="events-diamonds" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <polygon points="24,2 46,24 24,46 2,24" fill="none" stroke="#3BBFBF" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#events-diamonds)"/>
        </svg>
      </div>

      {/* Pink glow — top right */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-pink/6 blur-[130px] pointer-events-none" aria-hidden="true"/>
      {/* Teal glow — bottom left */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-teal/6 blur-[100px] pointer-events-none" aria-hidden="true"/>

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-5"
          >
            <div className="w-10 h-px bg-pink" />
            <span className="font-body text-pink text-xs tracking-[0.35em] uppercase">Calendar 2026</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-white uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}
          >
            Upcoming<br />
            <span className="text-teal">Events</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-5 font-body text-white/40 text-base max-w-md leading-relaxed"
          >
            From competitive tournaments to beginner clinics and social nights — there's always something on.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {events.map((event, i) => (
            <EventCard
              key={event.id}
              event={event}
              index={i}
              onClick={() => setSelected(event)}
            />
          ))}
        </div>

        {/* Follow nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="font-body text-white/30 text-sm">
            More events added regularly —{' '}
            <a
              href="https://www.instagram.com/mosselbaypadel/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:text-pink transition-colors duration-200 underline underline-offset-4"
            >
              follow us on Instagram
            </a>{' '}
            to stay up to date.
          </p>
        </motion.div>
      </div>

      <EventDialog event={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
