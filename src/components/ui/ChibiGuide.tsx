'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const SECTION_MESSAGES: Record<string, { text: string; emoji: string }> = {
  hero:           { text: "Hi! I'm Prerna! ✨", emoji: '✨' },
  about:          { text: "Let me tell you about myself~ 💜", emoji: '💜' },
  skills:         { text: "Look at all my skills! 🚀", emoji: '⚡' },
  experience:     { text: "Here's where I worked! 💼", emoji: '💼' },
  projects:       { text: "Check out my cool projects! 🎉", emoji: '🛠️' },
  certifications: { text: "I earned these certs! 🏆", emoji: '🎓' },
  contact:        { text: "Come say hello! 📬", emoji: '💌' },
}

export default function ChibiGuide() {
  const [activeSection, setActiveSection] = useState('hero')
  const [showBubble, setShowBubble] = useState(true)
  const [isWaving, setIsWaving] = useState(false)

  useEffect(() => {
    const sections = Object.keys(SECTION_MESSAGES)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (sections.includes(id)) {
              setActiveSection(id)
              setShowBubble(true)
              setIsWaving(true)
              setTimeout(() => setIsWaving(false), 1200)
              setTimeout(() => setShowBubble(false), 5000)
            }
          }
        }
      },
      { threshold: 0.4 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const msg = SECTION_MESSAGES[activeSection] || SECTION_MESSAGES.hero

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '24px',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '6px',
        pointerEvents: 'none',
      }}
      className="chibi-guide"
    >
      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, scale: 0.5, y: 16, x: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 12, x: 10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            style={{
              background: 'linear-gradient(135deg, rgba(20, 10, 45, 0.95), rgba(40, 15, 60, 0.95))',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(168,120,255,0.45)',
              borderRadius: '18px 18px 6px 18px',
              padding: '12px 18px',
              maxWidth: '230px',
              boxShadow: '0 6px 28px rgba(139,92,246,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
              pointerEvents: 'auto',
              cursor: 'default',
              position: 'relative',
            }}
          >
            {/* Sparkle decorations */}
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute', top: '-4px', left: '8px',
                fontSize: '10px', pointerEvents: 'none',
              }}
            >✦</motion.span>
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
              style={{
                position: 'absolute', top: '2px', right: '10px',
                fontSize: '8px', pointerEvents: 'none', color: '#c4b5fd',
              }}
            >✧</motion.span>

            <p style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#f0e6ff',
              margin: 0,
              lineHeight: 1.5,
              letterSpacing: '0.01em',
            }}>
              {msg.text}
            </p>
            {/* Tail of bubble */}
            <div style={{
              position: 'absolute',
              bottom: '-11px',
              right: '40px',
              width: 0,
              height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '0px solid transparent',
              borderTop: '12px solid rgba(20, 10, 45, 0.95)',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chibi Character */}
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotate: isWaving ? [0, -3, 3, -2, 0] : 0,
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 0.8, ease: 'easeInOut' },
        }}
        whileHover={{ scale: 1.1, y: -8 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setShowBubble(v => !v)
          setIsWaving(true)
          setTimeout(() => setIsWaving(false), 1200)
        }}
        style={{
          cursor: 'pointer',
          pointerEvents: 'auto',
          filter: 'drop-shadow(0 10px 30px rgba(139,92,246,0.4))',
          position: 'relative',
        }}
      >
        {/* Glow ring under chibi */}
        <motion.div
          animate={{ opacity: [0.35, 0.65, 0.35], scaleX: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            height: '24px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.5) 0%, rgba(168,85,247,0.2) 40%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Sparkle particles around chibi */}
        <motion.div
          animate={{ opacity: [0, 1, 0], y: [-5, -20], x: [-8, -15] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
          style={{
            position: 'absolute', top: '15px', left: '-5px',
            fontSize: '12px', pointerEvents: 'none',
          }}
        >✦</motion.div>
        <motion.div
          animate={{ opacity: [0, 1, 0], y: [-5, -22], x: [5, 12] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 1.2 }}
          style={{
            position: 'absolute', top: '20px', right: '-2px',
            fontSize: '10px', color: '#c4b5fd', pointerEvents: 'none',
          }}
        >✧</motion.div>
        <motion.div
          animate={{ opacity: [0, 0.8, 0], y: [0, -18], x: [0, 8] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: 0.8 }}
          style={{
            position: 'absolute', top: '5px', right: '15px',
            fontSize: '8px', color: '#e9d5ff', pointerEvents: 'none',
          }}
        >⭐</motion.div>

        <Image
          src="/chibi-standing.png"
          alt="Chibi guide character"
          width={160}
          height={200}
          style={{
            objectFit: 'contain',
            objectPosition: 'bottom',
            display: 'block',
          }}
          priority
        />
      </motion.div>

      <style>{`
        @media (max-width: 640px) {
          .chibi-guide {
            bottom: 10px !important;
            right: 10px !important;
          }
          .chibi-guide img {
            width: 110px !important;
            height: auto !important;
          }
        }
        @media print {
          .chibi-guide { display: none !important; }
        }
      `}</style>
    </div>
  )
}
