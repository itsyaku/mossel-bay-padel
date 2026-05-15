import Image from 'next/image'

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy border-t border-navy-border">
      {/* Pink accent bar at top */}
      <div className="h-0.5 bg-gradient-to-r from-teal via-pink to-teal"/>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Image
              src="/logo.png"
              alt="Mossel Bay Padel"
              width={150}
              height={54}
              className="h-11 w-auto brightness-0 invert mb-5 opacity-90"
            />
            <p className="font-body text-white/35 text-sm leading-relaxed max-w-xs">
              Mossel Bay's premier indoor padel facility — where the community comes to play, compete, and connect.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a
                href="https://www.facebook.com/mosselbaypadel/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/30 hover:text-pink transition-colors duration-200"
              >
                <FacebookIcon/>
              </a>
              <a
                href="https://www.instagram.com/mosselbaypadel/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/30 hover:text-pink transition-colors duration-200"
              >
                <InstagramIcon/>
              </a>
              <a
                href="https://playtomic.com/clubs/mossel-bay-padel"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-white/30 hover:text-teal text-xs tracking-widest uppercase transition-colors duration-200"
              >
                Playtomic ↗
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 md:col-start-7">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-4 h-px bg-pink"/>
              <h4 className="font-display text-white text-lg uppercase tracking-widest">Contact</h4>
            </div>
            <address className="font-body text-white/35 text-sm leading-loose not-italic">
              Hart &amp; Bosch Village<br/>
              R102 Road, Hartenbos<br/>
              Mossel Bay, 6500<br/>
              South Africa
            </address>
            <a href="tel:+27739263548" className="block font-body text-white/35 hover:text-teal text-sm mt-4 transition-colors duration-200">
              073 926 3548
            </a>
          </div>

          {/* Links */}
          <div className="md:col-span-2 md:col-start-11">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-4 h-px bg-teal"/>
              <h4 className="font-display text-white text-lg uppercase tracking-widest">Links</h4>
            </div>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Events', href: '#events' },
                { label: 'Book a Court', href: 'https://playtomic.com/clubs/mossel-bay-padel' },
                { label: 'Facebook', href: 'https://www.facebook.com/mosselbaypadel/' },
                { label: 'Instagram', href: 'https://www.instagram.com/mosselbaypadel/' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="font-body text-white/30 hover:text-white text-sm tracking-wide transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-white/20 text-xs">
            © {new Date().getFullYear()} Mossel Bay Padel. All rights reserved.
          </p>
          <p className="font-body text-white/15 text-xs">
            Manager: Demetrius Symms
          </p>
        </div>
      </div>
    </footer>
  )
}
