'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Download, ArrowDown } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import Image from 'next/image'
import type { Profile } from '@/types/database'

interface HeroSectionProps {
  profile: Profile
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const displayName = profile.name || 'Hey'
  const [typedName, setTypedName] = useState('')

  useEffect(() => {
    let index = 0
    const timeoutIds: NodeJS.Timeout[] = []
    
    // start typing after a small delay
    const startDelay = setTimeout(() => {
      const intervalId = setInterval(() => {
        setTypedName(displayName.slice(0, index + 1))
        index++
        if (index >= displayName.length) {
          clearInterval(intervalId)
        }
      }, 120) // typing speed
      timeoutIds.push(intervalId)
    }, 600) // delay before typing starts
    
    timeoutIds.push(startDelay)
    return () => timeoutIds.forEach(clearTimeout)
  }, [displayName])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
        paddingBottom: '40px',
      }}
    >
      {/* Subtle Background Image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: "url('/hero-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.08,
        zIndex: 0,
        pointerEvents: 'none',
        mixBlendMode: 'luminosity'
      }} />
      {/* Fade overlay so it blends into the dark site */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(5,5,15,0) 50%, rgba(5,5,15,1) 100%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Subtle background glow — pink toned */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 75% 50%, rgba(236,72,153,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 50% 60% at 25% 40%, rgba(139,92,246,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Main split layout */}
      <div
        className="section-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '60px',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── LEFT: Text Content ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            flex: '1 1 55%',
            maxWidth: '580px',
          }}
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: '15px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              marginBottom: '12px',
              letterSpacing: '0.04em',
            }}
          >
            Hello, World! 👋
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '8px',
              color: 'var(--text-primary)',
            }}
          >
            Hi, It&apos;s{' '}
            <span style={{
              background: 'linear-gradient(135deg, #ec4899, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              minWidth: '20px'
            }}>
              {typedName}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                style={{ 
                  WebkitTextFillColor: '#f472b6', 
                  marginLeft: '2px',
                  display: 'inline-block'
                }}
              >
                |
              </motion.span>
            </span>
          </motion.h1>

          {/* Role subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
              fontWeight: 700,
              marginBottom: '24px',
              color: 'var(--text-primary)',
            }}
          >
            I&apos;m a{' '}
            <span style={{
              background: 'linear-gradient(135deg, #c4b5fd, #f9a8d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {profile.role || 'Web Developer'}
            </span>
          </motion.h2>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontSize: '0.95rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '32px',
              maxWidth: '480px',
            }}
          >
            {profile.bio || 'Building beautiful digital experiences.'}
          </motion.p>

          {/* CTA Buttons - Replaced Hire Me with explicit links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}
          >
            {profile.resume_url && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-primary"
              >
                <Download size={15} />
                Download Resume
              </a>
            )}
            
            {profile.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-outline"
                style={{ padding: '11px 20px' }}
              >
                <FaGithub size={18} />
                GitHub
              </a>
            )}
            
            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-outline"
                style={{ padding: '11px 20px' }}
              >
                <FaLinkedin size={18} />
                LinkedIn
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Profile Photo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring', bounce: 0.3 }}
          style={{
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
          className="hero-photo-wrapper"
        >
          {/* Glow ring behind photo */}
          <div className="hero-glow-ring" />

          {/* Photo container */}
          <div style={{
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 2,
            border: '4px solid rgba(236,72,153,0.25)',
          }}
          className="hero-photo-circle"
          >
            {profile.profile_picture_url ? (
              <Image
                src={profile.profile_picture_url}
                alt={profile.name || 'Profile'}
                width={320}
                height={320}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
                priority
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                background: 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '80px',
              }}>
                👩‍💻
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-muted)',
          fontSize: '11px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          animation: 'float 2s ease-in-out infinite',
        }}
      >
        <span>Scroll</span>
        <ArrowDown size={14} />
      </motion.div>

      {/* Scoped styles */}
      <style>{`
        .hero-social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.12);
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.3s ease;
          background: transparent;
        }
        .hero-social-icon:hover {
          border-color: rgba(236,72,153,0.5);
          color: #f9a8d4;
          transform: translateY(-3px);
          background: rgba(236,72,153,0.08);
          box-shadow: 0 4px 20px rgba(236,72,153,0.15);
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          color: #fff;
          background: linear-gradient(135deg, #ec4899, #db2777);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(236,72,153,0.3);
        }
        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(236,72,153,0.4);
        }

        .hero-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 28px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          color: var(--text-primary);
          background: transparent;
          border: 1.5px solid rgba(236,72,153,0.35);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .hero-btn-outline:hover {
          border-color: #ec4899;
          color: #f9a8d4;
          transform: translateY(-2px);
          background: rgba(236,72,153,0.06);
        }

        /* Glow ring */
        .hero-glow-ring {
          position: absolute;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            rgba(236,72,153,0.0) 0deg,
            rgba(236,72,153,0.35) 90deg,
            rgba(244,114,182,0.5) 180deg,
            rgba(236,72,153,0.35) 270deg,
            rgba(236,72,153,0.0) 360deg
          );
          filter: blur(2px);
          z-index: 1;
          animation: hero-ring-rotate 8s linear infinite;
        }
        @keyframes hero-ring-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Outer ambient glow */
        .hero-photo-wrapper::before {
          content: '';
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%);
          z-index: 0;
          pointer-events: none;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          #hero .section-container {
            flex-direction: column-reverse !important;
            text-align: center !important;
            gap: 40px !important;
          }
          #hero .section-container > div:first-child {
            align-items: center;
            display: flex;
            flex-direction: column;
          }
          #hero .section-container > div:first-child p {
            text-align: center;
          }
          .hero-photo-circle {
            width: 220px !important;
            height: 220px !important;
          }
          .hero-glow-ring {
            width: 260px !important;
            height: 260px !important;
          }
          .hero-photo-wrapper::before {
            width: 300px !important;
            height: 300px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-photo-circle {
            width: 180px !important;
            height: 180px !important;
          }
          .hero-glow-ring {
            width: 210px !important;
            height: 210px !important;
          }
          .hero-photo-wrapper::before {
            width: 250px !important;
            height: 250px !important;
          }
        }
      `}</style>
    </section>
  )
}
