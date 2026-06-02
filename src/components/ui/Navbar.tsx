'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
    { href: '/resume', label: 'Resume' },
  ];

  return (
    <header
      className="navbar fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-300"
      style={{ background: solid ? 'rgba(13,13,30,0.7)' : 'transparent', backdropFilter: solid ? 'blur(8px)' : 'none' }}
    >
      <Link href="#hero" className="text-xl font-bold text-white">
        Portfolio
      </Link>
      {/* Desktop menu */}
      <nav className="hidden md:flex gap-6 text-white">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-primary transition-colors">
            {l.label}
          </Link>
        ))}
      </nav>
      {/* Mobile hamburger */}
      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen((p) => !p)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="absolute inset-x-0 top-full bg-primary/90 backdrop-blur-md md:hidden">
          <nav className="flex flex-col p-4 space-y-4 text-center text-white">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block hover:text-primary transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
