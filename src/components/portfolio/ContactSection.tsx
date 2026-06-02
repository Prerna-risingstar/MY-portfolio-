'use client'

import { useState } from 'react'
import { Mail, Send, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

import { FaGithub, FaLinkedin } from 'react-icons/fa'
import type { Profile } from '@/types/database'

interface ContactSectionProps {
  profile: Profile
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('idle')
        alert('Failed to send message. Please try again.')
      }
    } catch (err) {
      console.error(err)
      setStatus('idle')
      alert('An error occurred. Please try again later.')
    }

    setTimeout(() => {
      setStatus('idle')
    }, 4000)
  }

  return (
    <section id="contact" className="section">
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
            <Mail size={12} />
            Contact
          </span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Have a project in mind or just want to say hi? I&apos;d love to hear from you.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

          {/* Left: Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            custom={1}
            variants={fadeUp}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {/* Info cards */}
            {[
              profile.email && {
                icon: <Mail size={18} />,
                label: 'Email',
                value: profile.email,
                href: `mailto:${profile.email}`,
                color: '#ec4899',
                bg: 'rgba(236,72,153,0.1)',
                border: 'rgba(236,72,153,0.25)',
              },
              profile.github_url && {
                icon: <FaGithub size={18} />,
                label: 'GitHub',
                value: profile.github_url.replace('https://', ''),
                href: profile.github_url,
                color: '#c4b5fd',
                bg: 'rgba(139,92,246,0.1)',
                border: 'rgba(139,92,246,0.25)',
              },
              profile.linkedin_url && {
                icon: <FaLinkedin size={18} />,
                label: 'LinkedIn',
                value: profile.linkedin_url.replace('https://', ''),
                href: profile.linkedin_url,
                color: '#67e8f9',
                bg: 'rgba(6,182,212,0.1)',
                border: 'rgba(6,182,212,0.25)',
              },
              profile.location && {
                icon: <MapPin size={18} />,
                label: 'Location',
                value: profile.location,
                href: null,
                color: '#fbbf24',
                bg: 'rgba(251,191,36,0.1)',
                border: 'rgba(251,191,36,0.25)',
              },
            ].filter(Boolean).map((item: any) => (
              <div
                key={item.label}
                className="glass-card"
                style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                  background: item.bg, border: `1px solid ${item.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: item.color,
                }}>
                  {item.icon}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)',
                        textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap', display: 'block', transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = item.color)}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            custom={2}
            variants={fadeUp}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card"
              style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                Send a Message
              </h3>

              <div>
                <label className="admin-label" htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Jane Doe"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-label" htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="jane@example.com"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-label" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Hey, I'd love to collaborate on..."
                  className="admin-input"
                  style={{ resize: 'vertical', minHeight: '120px' }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary"
                style={{
                  justifyContent: 'center',
                  opacity: status === 'sending' ? 0.7 : 1,
                  cursor: status === 'sending' ? 'wait' : 'pointer',
                }}
              >
                {status === 'sent' ? '✓ Message Sent!' : status === 'sending' ? 'Sending…' : (
                  <><Send size={15} /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
