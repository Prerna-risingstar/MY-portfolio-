'use client'

import { motion } from 'framer-motion'
import { Briefcase, Calendar, Award, FileText } from 'lucide-react'
import type { Experience } from '@/types/database'

interface ExperienceSectionProps {
  experiences: Experience[]
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="section">
      <div className="section-container">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          custom={0}
          variants={fadeUp}
          style={{ marginBottom: '60px' }}
        >
          <span className="section-tag">
            <Briefcase size={12} />
            Experience
          </span>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">My journey building real-world products and growing as an engineer.</p>
        </motion.div>

        {/* Timeline */}
        {experiences.length === 0 ? (
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}
          >
            No experience entries yet.
          </motion.p>
        ) : (
          <div style={{ position: 'relative', paddingLeft: '32px' }}>
            {/* Vertical line */}
            <div className="timeline-line" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  custom={i + 1}
                  variants={fadeUp}
                  style={{ position: 'relative' }}
                >
                  {/* Timeline dot */}
                  <div className="timeline-dot" />

                  <div className="glass-card" style={{ padding: '28px 32px' }}>
                    {/* Header row */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                          {exp.position}
                        </h3>
                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-purple)' }}>
                          {exp.company}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                        {exp.is_current && (
                          <span style={{
                            fontSize: '11px', fontWeight: 700, padding: '3px 10px',
                            borderRadius: '999px',
                            background: 'rgba(6,182,212,0.12)',
                            border: '1px solid rgba(6,182,212,0.3)',
                            color: '#67e8f9',
                            letterSpacing: '0.06em',
                          }}>
                            Current
                          </span>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '13px' }}>
                          <Calendar size={13} />
                          <span>{exp.duration || `${exp.start_date ?? ''} – ${exp.is_current ? 'Present' : (exp.end_date ?? '')}`}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description bullets */}
                    {exp.description && exp.description.length > 0 && (
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: 0, listStyle: 'none' }}>
                        {exp.description.map((point, pi) => (
                          <li key={pi} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            <span style={{
                              width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                              background: 'var(--accent-purple)', marginTop: '8px',
                              boxShadow: '0 0 6px rgba(139,92,246,0.5)',
                            }} />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Action Links */}
                    {(exp.certificate_url || exp.offer_letter_url) && (
                      <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
                        {exp.certificate_url && (
                          <a href={exp.certificate_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#c084fc', background: 'rgba(192,132,252,0.1)', border: '1px solid rgba(192,132,252,0.2)', padding: '6px 14px', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s' }}>
                            <Award size={15} /> Certificate of Internship
                          </a>
                        )}
                        {exp.offer_letter_url && (
                          <a href={exp.offer_letter_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#38bdf8', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', padding: '6px 14px', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s' }}>
                            <FileText size={15} /> Offer Letter
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
