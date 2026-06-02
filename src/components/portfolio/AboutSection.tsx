'use client'

import { motion } from 'framer-motion'
import { MapPin, Target, Sparkles } from 'lucide-react'
import type { Profile, Achievement, Education } from '@/types/database'

interface AboutSectionProps {
  profile: Profile
  achievements: Achievement[]
  education: Education[]
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function AboutSection({ profile, achievements, education }: AboutSectionProps) {
  return (
    <section id="about" className="section">
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
            <Sparkles size={12} />
            About Me
          </span>
          <h2 className="section-title">Who I Am</h2>
          <p className="section-subtitle">{profile.about_me || 'Passionate developer crafting digital experiences.'}</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>

          {/* Left: Info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Location + Objective */}
            <motion.div
              className="glass-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={1}
              variants={fadeUp}
              style={{ padding: '28px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <MapPin size={16} color="#8b5cf6" />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Location</span>
              </div>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                {profile.location || 'India'}
              </p>
            </motion.div>

            <motion.div
              className="glass-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={2}
              variants={fadeUp}
              style={{ padding: '28px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Target size={16} color="#06b6d4" />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Career Objective</span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {profile.career_objective || 'Building innovative web products that make a real difference.'}
              </p>
            </motion.div>

            {/* Interests */}
            {profile.interests && profile.interests.length > 0 && (
              <motion.div
                className="glass-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={3}
                variants={fadeUp}
                style={{ padding: '28px' }}
              >
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>Interests</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {profile.interests.map((interest) => (
                    <span key={interest} className="skill-tag">{interest}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Education + Achievements */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Education */}
            {education.length > 0 && (
              <motion.div
                className="glass-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={2}
                variants={fadeUp}
                style={{ padding: '28px' }}
              >
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>Education</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {education.map((edu) => (
                    <div key={edu.id} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0,
                        background: 'var(--gradient-primary)', marginTop: '6px',
                        boxShadow: '0 0 10px rgba(139,92,246,0.5)',
                      }} />
                      <div>
                        <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{edu.degree}</p>
                        <p style={{ color: 'var(--accent-purple)', fontSize: '0.85rem', fontWeight: 600 }}>{edu.institution}</p>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                          {edu.duration && <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{edu.duration}</span>}
                          {edu.cgpa && <span style={{ color: 'var(--accent-cyan)', fontSize: '12px', fontWeight: 600 }}>CGPA: {edu.cgpa}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Achievements */}
            {achievements.length > 0 && (
              <motion.div
                className="glass-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={3}
                variants={fadeUp}
                style={{ padding: '28px' }}
              >
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>Achievements</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {achievements.map((ach) => (
                    <div key={ach.id} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '22px', lineHeight: 1 }}>{ach.icon || '🏆'}</span>
                      <div>
                        <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{ach.title}</p>
                        {ach.description && <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '2px' }}>{ach.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
