'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Event } from '@/data/events'

const bannerSchemes = {
  dark:  { bg: '#0C1C1C', accent: '#3BBFBF' },
  teal:  { bg: '#170D1A', accent: '#E8197D' },
  mid:   { bg: '#0C1A18', accent: '#3BBFBF' },
  deep:  { bg: '#0E1020', accent: '#E8197D' },
}

interface Props {
  event: Event | null
  onClose: () => void
}

export default function EventDialog({ event, onClose }: Props) {
  const [showToast, setShowToast] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

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
    setTimeout(() => closeRef.current?.focus(), 50)
    return () => { document.body.style.overflow = '' }
  }, [event])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleClose])

  const scheme = event ? bannerSchemes[event.colorScheme] : bannerSchemes.dark
  const pct = event ? Math.round((event.spotsRemaining / event.totalSpots) * 100) : 0
  const almostFull = event ? event.spotsRemaining <= 8 : false
  const isPink = event ? (event.colorScheme === 'teal' || event.colorScheme === 'deep') : false

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
            className="absolute inset-0 bg-navy/90 backdrop-blur-md"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative bg-navy-card border border-navy-border w-full max-w-2xl max-h-[92vh] overflow-y-auto no-scrollbar shadow-2xl"
            style={{
              boxShadow: isPink
                ? '0 40px 100px rgba(232,25,125,0.2), 0 0 0 1px rgba(232,25,125,0.2)'
                : '0 40px 100px rgba(59,191,191,0.15), 0 0 0 1px rgba(59,191,191,0.15)',
            }}
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 z-10" style={{ backgroundColor: scheme.accent }}/>

            {/* Banner */}
            <div
              className="relative h-52 sm:h-60 flex flex-col justify-end p-7 sm:p-9 overflow-hidden"
              style={{ backgroundColor: scheme.bg }}
            >
              {/* Geometric overlay on banner */}
              <div className="absolute inset-0 opacity-[0.07]">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dialog-diamonds" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke={scheme.accent} strokeWidth="0.8"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dialog-diamonds)"/>
                </svg>
              </div>

              {/* Close */}
              <button
                ref={closeRef}
                onClick={handleClose}
                aria-label="Close dialog"
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Category */}
              <div className="mb-3">
                <span className="font-body text-[10px] tracking-[0.3em] uppercase border border-white/20 text-white/50 px-3 py-1">
                  {event.category}
                </span>
              </div>

              {/* Name + date */}
              <div className="flex items-end justify-between gap-4">
                <h2 id="dialog-event-title" className="font-display text-white text-3xl sm:text-4xl uppercase leading-tight tracking-tight">
                  {event.name}
                </h2>
                <div className="text-right flex-shrink-0">
                  <div className="font-display leading-none text-5xl" style={{ color: scheme.accent }}>
                    {event.dateDay}
                  </div>
                  <div className="font-body text-white/45 text-sm tracking-[0.2em] mt-0.5">
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
                    <div className="w-8 h-8 flex items-center justify-center text-sm flex-shrink-0 border border-navy-border">
                      {d.icon}
                    </div>
                    <div>
                      <div className="font-body text-[10px] text-white/30 tracking-widest uppercase mb-0.5">{d.label}</div>
                      <div className="font-body text-white/80 text-sm font-medium leading-snug">{d.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Availability */}
              <div className="mb-6 p-4 bg-navy border border-navy-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-xs text-white/30 tracking-wide uppercase">Availability</span>
                  <span className="font-display text-xl" style={{ color: almostFull ? '#E8197D' : scheme.accent }}>
                    {event.spotsRemaining}
                    <span className="font-body text-xs text-white/30 ml-1">/ {event.totalSpots} spots</span>
                  </span>
                </div>
                <div className="h-1.5 bg-white/8">
                  <div
                    className="h-full transition-all"
                    style={{ width: `${pct}%`, backgroundColor: almostFull ? '#E8197D' : scheme.accent }}
                  />
                </div>
                {almostFull && (
                  <p className="font-body text-pink text-xs mt-2">⚡ Selling fast — only a few spots left!</p>
                )}
              </div>

              {/* Description */}
              <p className="font-body text-white/45 text-sm leading-relaxed mb-8">
                {event.fullDescription}
              </p>

              {/* CTA */}
              <button
                onClick={handleBuyTicket}
                className="w-full font-display text-2xl uppercase tracking-wide py-5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  backgroundColor: scheme.accent,
                  color: isPink ? '#fff' : '#090C17',
                }}
              >
                Buy Ticket — {event.price}
              </button>

              <p className="font-body text-center text-white/20 text-xs mt-3">
                Secure checkout · No booking fees · Instant confirmation
              </p>
            </div>
          </motion.div>

          {/* Toast */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                key="toast"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] bg-navy-card text-white font-body text-sm px-6 py-3.5 shadow-2xl flex items-center gap-3 border border-navy-border border-l-2 whitespace-nowrap"
                style={{ borderLeftColor: scheme.accent }}
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
