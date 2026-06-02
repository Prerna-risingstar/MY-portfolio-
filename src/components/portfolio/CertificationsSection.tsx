'use client'

import { motion } from 'framer-motion'
import { Award, ExternalLink, Medal, Star, ShieldCheck } from 'lucide-react'
import type { Certification } from '@/types/database'

interface CertificationsSectionProps {
  certifications: Certification[]
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const colors = [
  { icon: '#f97316', badge: '#ef4444' }, // Orange/Red
  { icon: '#22c55e', badge: '#22c55e' }, // Green
  { icon: '#3b82f6', badge: '#3b82f6' }, // Blue
  { icon: '#eab308', badge: '#eab308' }, // Yellow
  { icon: '#a855f7', badge: '#ec4899' }, // Purple/Pink
  { icon: '#06b6d4', badge: '#0ea5e9' }, // Cyan
]

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  if (certifications.length === 0) return null

  return (
    <section id="certifications" className="section" style={{ backgroundColor: '#0A0A0B', position: 'relative', overflow: 'hidden' }}>
      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          custom={0}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span className="section-tag" style={{ marginBottom: '16px' }}>
            <Award size={12} />
            Certifications
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '16px', letterSpacing: '-0.02em' }}>Credentials & Learning</h2>
          <p style={{ color: 'var(--text-muted)' }}>Certificates and courses that have shaped my skills and knowledge.</p>
        </motion.div>

        {/* Grid matching the requested style */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {certifications.map((cert, i) => {
            const colorTheme = colors[i % colors.length]
            
            return (
              <motion.div
                key={cert.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                custom={i + 1}
                variants={fadeUp}
                style={{
                  backgroundColor: '#13131A',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  padding: '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '16px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
              >
                {/* Icon / Image */}
                <div style={{ marginBottom: '4px' }}>
                  {cert.image_url ? (
                    <img src={cert.image_url} alt={cert.title} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                  ) : (
                    <ShieldCheck size={36} color={colorTheme.icon} />
                  )}
                </div>

                {/* Text Content */}
                <h3 style={{ color: 'white', fontSize: '1.15rem', fontWeight: 700, margin: 0, lineHeight: 1.4 }}>
                  {cert.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                  Issued by <span style={{ fontWeight: 600, color: '#e2e8f0' }}>{cert.issuer}</span>
                </p>

                {/* Bottom Badges */}
                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  paddingTop: '8px'
                }}>
                  {cert.year && (
                    <span style={{
                      padding: '6px 16px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      {cert.year}
                    </span>
                  )}
                  {cert.certificate_url && (
                    <a
                      href={cert.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 16px',
                        borderRadius: '999px',
                        backgroundColor: colorTheme.badge,
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textDecoration: 'none',
                        boxShadow: `0 4px 14px ${colorTheme.badge}40`,
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <ExternalLink size={12} /> View
                    </a>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
