'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Event } from '@/data/events'

const schemes = {
  dark:  { bg: '#1A2E2E', accent: '#3BBFBF', textAccent: '#3BBFBF' },
  teal:  { bg: '#3BBFBF', accent: '#1A2E2E', textAccent: '#1A2E2E' },
  mid:   { bg: '#2A9D8F', accent: '#F0FAFA', textAccent: '#F0FAFA' },
  deep:  { bg: '#264653', accent: '#3BBFBF', textAccent: '#3BBFBF' },
}

function DialogPattern({ scheme }: { scheme: 'dark' | 'teal' | 'mid' | 'deep' }) {
  const { accent } = schemes[scheme]
  return (
    <svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g stroke={accent} strokeWidth="1" opacity="0.15">
        {[-80,0,80,160,240,320,400,480,560,640].map((x, i) => (
          <line key={i} x1={x} y1="0" x2={x + 200} y2="220" />
        ))}
      </g>
      <circle cx="500" cy="50" r="80" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.2" />
      <circle cx="500" cy="50" r="50" fill="none" stroke={accent} strokeWidth="1" opacity="0.15" />
      <line x1="450" y1="0" x2="600" y2="180" stroke={accent} strokeWidth="3" opacity="0.35" strokeLinecap="round" />
    </svg>
  )
}

interface Props {
  event: Event | null
  onClose: () => void
}

export default function EventDialog({ event, onClose }: Props) {
  const [showToast, setShowToast] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const firstFocusable = useRef<HTMLButtonElement>(null)

  const handleBuyTicket = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3500)
  }

  const handleClose = useCallback(() => {
    setShowToast(false)
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!event) return
    document.body.style.overflow = 'hidden'
    // Focus the close button when dialog opens
    setTimeout(() => closeRef.current?.focus(), 50)
    return () => { document.body.style.overflow = '' }
  }, [event])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleClose])

  const scheme = event ? schemes[event.colorScheme] : schemes.dark
  const pct = event ? Math.round((event.spotsRemaining / event.totalSpots) * 100) : 0
  const almostFull = event ? event.spotsRemaining <= 8 : false

  return (
    <AnimatePresence>
      {event && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-event-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-teal-dark/85 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative bg-warm-white w-full max-w-2xl max-h-[92vh] overflow-y-auto no-scrollbar shadow-2xl"
          >
            {/* Header banner */}
            <div
              className="relative h-52 sm:h-60 flex flex-col justify-end p-7 sm:p-9 overflow-hidden"
              style={{ backgroundColor: scheme.bg }}
            >
              <DialogPattern scheme={event.colorScheme} />

              {/* Close button */}
              <button
                ref={closeRef}
                onClick={handleClose}
                aria-label="Close dialog"
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              {/* Category tag */}
              <div className="mb-3">
                <span className="font-body text-[10px] tracking-[0.3em] uppercase border border-white/25 text-white/60 px-3 py-1">
                  {event.category}
                </span>
              </div>

              {/* Event name + date */}
              <div className="flex items-end justify-between gap-4">
                <h2
                  id="dialog-event-title"
                  className="font-display text-white text-3xl sm:text-4xl uppercase leading-tight tracking-tight"
                >
                  {event.name}
                </h2>
                <div className="text-right flex-shrink-0">
                  <div className="font-display leading-none text-5xl" style={{ color: scheme.accent }}>
                    {event.dateDay}
                  </div>
                  <div className="font-body text-white/55 text-sm tracking-[0.2em] mt-0.5">
                    {event.dateMonth} 2026
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-7 sm:p-9">
              {/* Detail grid */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-8">
                {[
                  { label: 'Date', value: event.date, icon: '📅' },
                  { label: 'Time', value: event.time, icon: '⏱' },
                  { label: 'Price', value: `${event.price} ${event.priceUnit}`, icon: '🎟' },
                  { label: 'Location', value: 'Hart & Bosch Village, Hartenbos', icon: '📍' },
                ].map((d) => (
                  <div key={d.label} className="flex gap-3">
                    <div className="w-8 h-8 bg-teal-light rounded-sm flex items-center justify-center text-sm flex-shrink-0">
                      {d.icon}
                    </div>
                    <div>
                      <div className="font-body text-[10px] text-gray-400 tracking-widest uppercase mb-0.5">
                        {d.label}
                      </div>
                      <div className="font-body text-teal-dark text-sm font-medium leading-snug">
                        {d.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Availability bar */}
              <div className="mb-6 p-4 bg-white border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-xs text-gray-500 tracking-wide uppercase">Availability</span>
                  <span className={`font-display text-xl ${almostFull ? 'text-rose-500' : 'text-teal'}`}>
                    {event.spotsRemaining}
                    <span className="font-body text-xs text-gray-400 ml-1">/ {event.totalSpots} spots left</span>
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${almostFull ? 'bg-rose-400' : 'bg-teal'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                {almostFull && (
                  <p className="font-body text-rose-500 text-xs mt-2">⚡ Selling fast — only a few spots left!</p>
                )}
              </div>

              {/* Full description */}
              <p className="font-body text-gray-500 text-sm leading-relaxed mb-8">
                {event.fullDescription}
              </p>

              {/* CTA */}
              <button
                ref={firstFocusable}
                onClick={handleBuyTicket}
                className="w-full bg-teal text-white font-display text-2xl uppercase tracking-wide py-5 hover:bg-teal-mid transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              >
                Buy Ticket — {event.price}
              </button>

              <p className="font-body text-center text-gray-400 text-xs mt-3">
                Secure checkout · No booking fees · Instant confirmation
              </p>
            </div>
          </motion.div>

          {/* Toast */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                key="toast"
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] bg-teal-dark text-white font-body text-sm px-6 py-3.5 shadow-2xl flex items-center gap-3 border-l-4 border-teal whitespace-nowrap"
                role="status"
                aria-live="polite"
              >
                <span className="text-base">🎾</span>
                <span>Ticket purchasing coming soon — stay tuned!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  )
}
