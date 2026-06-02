import { readPortfolio } from '@/lib/portfolio-store'
import Link from 'next/link'
import { ArrowLeft, Mail, Globe, MapPin, Briefcase, GraduationCap, Award, Code, CheckSquare } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import type { Metadata } from 'next'
import PrintButton from '@/components/ui/PrintButton'

export const metadata: Metadata = {
  title: 'Resume | Prerna Patel',
  description: 'Professional CV and Resume of Prerna Patel',
}

export default async function ResumePage() {
  const { profile, skills, experiences, projects, certifications, education, achievements } = await readPortfolio()

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const cat = skill.category || 'General'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {} as Record<string, typeof skills>)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      paddingBottom: '80px',
    }}>
      {/* Floating Action Bar (Hidden on print) */}
      <header className="no-print" style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(5, 5, 15, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'between',
        maxWidth: '100%',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '1000px', margin: '0 auto', alignItems: 'center' }}>
          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'color 0.2s ease',
          }} className="back-link">
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <PrintButton />
        </div>
      </header>

      {/* Main Resume Sheet */}
      <main className="resume-sheet" style={{
        maxWidth: '850px',
        margin: '40px auto 0',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '50px',
        boxShadow: 'var(--shadow-md)',
      }}>
        {/* CV Header */}
        <section style={{ borderBottom: '2px solid var(--border)', paddingBottom: '30px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                background: 'var(--gradient-text)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '8px',
              }}>
                {profile.name}
              </h1>
              <p style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--accent-purple)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                {profile.role}
              </p>
            </div>
            
            {/* Contact Details Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '8px',
              fontSize: '13px',
              color: 'var(--text-secondary)',
            }}>
              {profile.email && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={14} style={{ color: 'var(--accent-purple)' }} />
                  <a href={`mailto:${profile.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {profile.email}
                  </a>
                </span>
              )}
              {profile.location && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={14} style={{ color: 'var(--accent-cyan)' }} />
                  {profile.location}
                </span>
              )}
              {profile.linkedin_url && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <FaLinkedin size={14} style={{ color: 'var(--accent-purple)' }} />
                  <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    LinkedIn Profile
                  </a>
                </span>
              )}
              {profile.github_url && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <FaGithub size={14} style={{ color: 'var(--text-primary)' }} />
                  <a href={profile.github_url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    GitHub Profile
                  </a>
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Objective / Summary */}
        <section className="avoid-break" style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-purple)' }}></span>
            Professional Summary
          </h2>
          <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {profile.bio} {profile.about_me}
          </p>
        </section>

        {/* Work Experience Section */}
        {experiences && experiences.length > 0 && (
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)' }}></span>
              Experience
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {experiences
                .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
                .map((exp) => (
                  <div key={exp.id} className="avoid-break" style={{
                    paddingLeft: '16px',
                    borderLeft: '2px solid var(--border)',
                    position: 'relative',
                  }}>
                    {/* Visual dot indicator */}
                    <div style={{
                      position: 'absolute',
                      left: '-6px',
                      top: '6px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: 'var(--bg-primary)',
                      border: '2px solid var(--accent-cyan)',
                    }}></div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '6px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {exp.position}
                      </h3>
                      <span style={{ fontSize: '12px', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                        {exp.duration}
                      </span>
                    </div>
                    
                    <p style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                      {exp.company}
                    </p>
                    
                    {exp.description && exp.description.length > 0 && (
                      <ul style={{
                        paddingLeft: '18px',
                        fontSize: '13.5px',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        margin: 0,
                      }}>
                        {exp.description.map((bullet, idx) => (
                          <li key={idx} style={{ marginBottom: '4px' }}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <section className="avoid-break" style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-purple)' }}></span>
              Core Expertise
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {Object.entries(skillsByCategory).map(([category, catSkills]) => (
                <div key={category} style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {category}:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {catSkills
                      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
                      .map((sk) => (
                        <span key={sk.id} style={{
                          fontSize: '12px',
                          padding: '3px 10px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border)',
                          borderRadius: '6px',
                          color: 'var(--text-secondary)',
                        }}>
                          {sk.name}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)' }}></span>
              Education
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {education
                .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
                .map((edu) => (
                  <div key={edu.id} className="avoid-break" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {edu.degree}
                      </h3>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {edu.institution} {edu.cgpa ? `• CGPA: ${edu.cgpa}` : ''}
                      </p>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {edu.duration}
                    </span>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {certifications && certifications.length > 0 && (
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-purple)' }}></span>
              Certifications
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '12px',
            }}>
              {certifications
                .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
                .map((cert) => (
                  <div key={cert.id} className="avoid-break" style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid var(--border)',
                  }}>
                    <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {cert.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      {cert.issuer} {cert.year ? `• ${cert.year}` : ''}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)' }}></span>
              Key Projects
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {projects
                .filter(p => p.featured)
                .slice(0, 3)
                .map((proj) => (
                  <div key={proj.id} className="avoid-break" style={{
                    paddingBottom: '12px',
                    borderBottom: '1px dashed var(--border)',
                  }}>
                    <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {proj.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '6px 0 8px', lineHeight: 1.5 }}>
                      {proj.description}
                    </p>
                    {proj.tech_stack && proj.tech_stack.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {proj.tech_stack.map((t, idx) => (
                          <span key={idx} style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </section>
        )}
      </main>

      {/* Global CSS Stylesheet injected for handling print layout override */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (hover: hover) {
          .back-link:hover {
            color: var(--text-primary) !important;
          }
        }

        /* Print Media CSS Overrides */
        @media print {
          body, html, .resume-sheet {
            background: #ffffff !important;
            color: #0f172a !important;
          }
          
          .no-print {
            display: none !important;
          }
          
          .resume-sheet {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
          
          h1, h2, h3, p, span, li, a {
            color: #0f172a !important;
          }
          
          h1 {
            background: none !important;
            -webkit-text-fill-color: initial !important;
            color: #000000 !important;
          }
          
          h2 {
            border-bottom: 1.5px solid #cbd5e1 !important;
            padding-bottom: 4px !important;
            color: #0f172a !important;
          }
          
          /* Visual dot indicators in CV experience */
          span[style*="background"] {
            background: #0f172a !important;
          }
          
          /* Skill tags print border */
          span[style*="background: rgba"] {
            background: #f1f5f9 !important;
            border: 1px solid #cbd5e1 !important;
            color: #334155 !important;
          }
          
          /* Page break behaviors */
          @page {
            size: A4;
            margin: 18mm 15mm;
          }
          
          .avoid-break {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}} />
    </div>
  )
}
