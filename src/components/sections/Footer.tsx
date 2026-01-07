'use client'

import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  main: [
    { href: '/projects', label: 'Projects' },
    { href: '/products', label: 'Products' },
    { href: '/services', label: 'Services' },
    { href: '/articles', label: 'Articles' },
    { href: '/academy', label: 'Academy' },
  ],
  company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  social: [
    { href: '#', label: 'GitHub' },
    { href: '#', label: 'LinkedIn' },
  ]
}

export default function Footer() {
  return (
    <footer className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid md:grid-cols-12 gap-12 mb-20">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-8 h-8">
                <Image src="/logo_in_black.jpeg" alt="CRATER CODE" fill className="object-contain" />
              </div>
              <span 
                className="font-display text-sm tracking-[0.25em]"
                style={{ color: 'var(--color-text)' }}
              >
                CRATER CODE
              </span>
            </Link>
            <p 
              className="max-w-sm leading-relaxed text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Engineering the future through technology that matters. 
              We build what others imagine.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h4 
              className="text-xs tracking-[0.2em] mb-6"
              style={{ color: 'var(--color-text)' }}
            >
              WORK
            </h4>
            <ul className="space-y-4">
              {footerLinks.main.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm transition-colors hover:text-[var(--color-text)]"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 
              className="text-xs tracking-[0.2em] mb-6"
              style={{ color: 'var(--color-text)' }}
            >
              COMPANY
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm transition-colors hover:text-[var(--color-text)]"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 
              className="text-xs tracking-[0.2em] mb-6"
              style={{ color: 'var(--color-text)' }}
            >
              CONNECT
            </h4>
            <ul className="space-y-4">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-sm transition-colors hover:text-[var(--color-text)]"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div 
          className="pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'color-mix(in srgb, var(--color-secondary) 15%, transparent)' }}
        >
          <p 
            className="text-xs"
            style={{ color: 'var(--color-text-muted)' }}
          >
            © {new Date().getFullYear()} CRATER CODE
          </p>
          <p 
            className="text-xs"
            style={{ color: 'color-mix(in srgb, var(--color-text-muted) 50%, transparent)' }}
          >
            Pakistan
          </p>
        </div>
      </div>
    </footer>
  )
}
