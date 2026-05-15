'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-navy/95 backdrop-blur-md border-b border-navy-border' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Mossel Bay Padel"
              width={150}
              height={54}
              className="h-11 w-auto brightness-0 invert"
              priority
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#events" className="font-body text-white/55 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200">
              Events
            </a>
            <a href="#contact" className="font-body text-white/55 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200">
              Contact
            </a>
            <a
              href="https://playtomic.com/clubs/mossel-bay-padel"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm font-medium tracking-widest uppercase bg-pink text-white px-6 py-2.5 hover:bg-pink-dark transition-colors duration-200"
            >
              Book a Court
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden bg-navy-card/98 backdrop-blur-md overflow-hidden transition-all duration-300 border-b border-navy-border ${
        menuOpen ? 'max-h-64' : 'max-h-0'
      }`}>
        <div className="px-6 py-6 flex flex-col gap-5">
          <a href="#events" className="font-body text-white/60 hover:text-white text-sm tracking-widest uppercase" onClick={() => setMenuOpen(false)}>Events</a>
          <a href="#contact" className="font-body text-white/60 hover:text-white text-sm tracking-widest uppercase" onClick={() => setMenuOpen(false)}>Contact</a>
          <a
            href="https://playtomic.com/clubs/mossel-bay-padel"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm font-medium tracking-widest uppercase bg-pink text-white px-6 py-3 text-center hover:bg-pink-dark transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Book a Court
          </a>
        </div>
      </div>
    </nav>
  )
}
