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
    <section id="events" className="bg-warm-white py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-5"
          >
            <div className="w-10 h-px bg-teal" />
            <span className="font-body text-teal text-xs tracking-[0.35em] uppercase">
              Calendar 2026
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-teal-dark uppercase leading-none tracking-tight"
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
            className="mt-5 font-body text-gray-500 text-base max-w-md leading-relaxed"
          >
            From competitive tournaments to beginner clinics and social nights — there's always something on at Mossel Bay Padel.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {events.map((event, i) => (
            <EventCard
              key={event.id}
              event={event}
              index={i}
              onClick={() => setSelected(event)}
            />
          ))}
        </div>

        {/* View all nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="font-body text-gray-400 text-sm">
            More events added regularly —{' '}
            <a
              href="https://www.instagram.com/mosselbaypadel/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:text-teal-mid underline underline-offset-4 transition-colors"
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
