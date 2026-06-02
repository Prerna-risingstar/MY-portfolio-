'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Layers } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import Image from 'next/image'
import type { Project } from '@/types/database'

interface ProjectsSectionProps {
  projects: Project[]
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category ?? 'Other').filter(Boolean)))]
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="section">
      <div className="section-container">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          custom={0}
          variants={fadeUp}
          style={{ marginBottom: '48px' }}
        >
          <span className="section-tag">
            <Layers size={12} />
            Projects
          </span>
          <h2 className="section-title">What I&apos;ve Built</h2>
          <p className="section-subtitle">A collection of projects showcasing my skills in building modern web applications.</p>
        </motion.div>

        {/* Filter tabs */}
        {categories.length > 2 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  transition: 'all 0.25s ease',
                  fontFamily: 'inherit',
                  background: activeFilter === cat ? 'var(--gradient-primary)' : 'transparent',
                  borderColor: activeFilter === cat ? 'transparent' : 'var(--border)',
                  color: activeFilter === cat ? 'white' : 'var(--text-secondary)',
                  boxShadow: activeFilter === cat ? '0 4px 15px rgba(139,92,246,0.3)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="glass-card"
                style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                {/* Project image / placeholder */}
                <div style={{
                  height: '180px',
                  background: project.image_url
                    ? 'var(--bg-secondary)'
                    : 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(6,182,212,0.15) 100%)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  ) : (
                    <Layers size={40} style={{ opacity: 0.2, color: 'var(--text-secondary)' }} />
                  )}
                  {project.featured && (
                    <span style={{
                      position: 'absolute', top: '12px', right: '12px',
                      fontSize: '11px', fontWeight: 700,
                      padding: '3px 10px', borderRadius: '999px',
                      background: 'rgba(139,92,246,0.85)',
                      color: 'white',
                      backdropFilter: 'blur(8px)',
                    }}>
                      Featured
                    </span>
                  )}
                  {project.category && (
                    <span style={{
                      position: 'absolute', top: '12px', left: '12px',
                      fontSize: '11px', fontWeight: 600,
                      padding: '3px 10px', borderRadius: '999px',
                      background: 'rgba(0,0,0,0.5)',
                      color: 'var(--text-secondary)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                      {project.category}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, gap: '12px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{project.title}</h3>
                  {project.description && (
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1 }}>
                      {project.description}
                    </p>
                  )}

                  {/* Tech stack */}
                  {project.tech_stack && project.tech_stack.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {project.tech_stack.map((tech) => (
                        <span key={tech} style={{
                          fontSize: '11px', fontWeight: 600,
                          padding: '3px 10px', borderRadius: '6px',
                          background: 'rgba(139,92,246,0.08)',
                          border: '1px solid rgba(139,92,246,0.2)',
                          color: '#c4b5fd',
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div style={{ display: 'flex', gap: '10px', paddingTop: '4px' }}>
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '6px',
                          fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)',
                          textDecoration: 'none', padding: '7px 14px',
                          borderRadius: '8px', border: '1px solid var(--border)',
                          transition: 'all 0.25s ease',
                        }}
                        onMouseEnter={e => {
                          const el = e.currentTarget
                          el.style.borderColor = 'rgba(139,92,246,0.4)'
                          el.style.color = '#c4b5fd'
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget
                          el.style.borderColor = 'var(--border)'
                          el.style.color = 'var(--text-secondary)'
                        }}
                      >
                        <FaGithub size={14} /> Code
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ fontSize: '13px', padding: '7px 14px' }}
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', paddingTop: '40px' }}>No projects in this category.</p>
        )}
      </div>
    </section>
  )
}
