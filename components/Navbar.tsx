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

  const navLinks = [
    { label: 'Events', href: '#events' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-teal-dark/95 backdrop-blur-md shadow-xl shadow-black/20'
          : 'bg-transparent'
      }`}
    >
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
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-white/70 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://playtomic.com/clubs/mossel-bay-padel"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm font-medium tracking-widest uppercase bg-teal text-white px-6 py-2.5 hover:bg-teal-mid transition-colors duration-200"
            >
              Book a Court
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 group"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden bg-teal-dark/98 backdrop-blur-md overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64 border-t border-white/10' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-white/70 hover:text-white text-sm tracking-widest uppercase"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://playtomic.com/clubs/mossel-bay-padel"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm font-medium tracking-widest uppercase bg-teal text-white px-6 py-3 text-center hover:bg-teal-mid transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Book a Court
          </a>
        </div>
      </div>
    </nav>
  )
}
