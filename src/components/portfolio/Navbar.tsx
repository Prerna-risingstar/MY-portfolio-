'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certs' },
  { href: '#contact', label: 'Contact' },
  { href: '/resume', label: 'Resume' },
]

export default function Navbar({ name }: { name?: string | null }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 24px',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(5, 5, 15, 0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span style={{
          fontWeight: 800,
          fontSize: '18px',
          background: 'linear-gradient(135deg, #c4b5fd, #67e8f9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          {name ? name.split(' ')[0] : 'Portfolio'}
        </span>
      </Link>

      {/* Desktop nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="nav-desktop">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              color: 'rgba(248,250,252,0.7)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              padding: '6px 12px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              ;(e.target as HTMLElement).style.color = '#c4b5fd'
              ;(e.target as HTMLElement).style.background = 'rgba(139,92,246,0.08)'
            }}
            onMouseLeave={e => {
              ;(e.target as HTMLElement).style.color = 'rgba(248,250,252,0.7)'
              ;(e.target as HTMLElement).style.background = 'transparent'
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="nav-mobile-btn"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          display: 'none',
          padding: '4px',
        }}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '68px',
          left: 0,
          right: 0,
          background: 'rgba(5,5,15,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '16px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: 500,
                padding: '12px 16px',
                borderRadius: '10px',
                transition: 'all 0.2s ease',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
