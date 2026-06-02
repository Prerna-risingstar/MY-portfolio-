'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import {
  User, Code, Briefcase, FolderOpen, Award,
  GraduationCap, Trophy, LogOut, Eye, ChevronRight, Menu, X, Edit,
} from 'lucide-react'
import type { PortfolioData } from '@/lib/portfolio-store'

import ProfileEditor from './editors/ProfileEditor'
import AllSectionsEditor from './editors/AllSectionsEditor'
import SkillsEditor from './editors/SkillsEditor'
import ExperienceEditor from './editors/ExperienceEditor'
import ProjectsEditor from './editors/ProjectsEditor'
import CertificationsEditor from './editors/CertificationsEditor'
import EducationEditor from './editors/EducationEditor'
import AchievementsEditor from './editors/AchievementsEditor'

type Section = 'profile' | 'skills' | 'experience' | 'projects' | 'certifications' | 'education' | 'achievements' | 'all'

const NAV_ITEMS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'profile',        label: 'Profile',        icon: <User size={16} /> },
  { id: 'skills',         label: 'Skills',         icon: <Code size={16} /> },
  { id: 'experience',     label: 'Experience',     icon: <Briefcase size={16} /> },
  { id: 'projects',       label: 'Projects',       icon: <FolderOpen size={16} /> },
  { id: 'certifications', label: 'Certifications', icon: <Award size={16} /> },
  { id: 'education',      label: 'Education',      icon: <GraduationCap size={16} /> },
  { id: 'achievements',   label: 'Achievements',   icon: <Trophy size={16} /> },
  { id: 'all',            label: 'Edit All',       icon: <Edit size={16} /> },
]

export default function AdminDashboard({ initialData }: { initialData: PortfolioData }) {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<Section>('profile')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    toast.success('Signed out')
    router.push('/admin/login')
    router.refresh()
  }

  const sectionContent: Record<Section, React.ReactNode> = {
    profile:        <ProfileEditor        initialProfile={initialData.profile} />,
    skills:         <SkillsEditor         initialSkills={initialData.skills} />,
    experience:     <ExperienceEditor     initialExperiences={initialData.experiences} />,
    projects:       <ProjectsEditor       initialProjects={initialData.projects} />,
    certifications: <CertificationsEditor initialCertifications={initialData.certifications} />,
    education:      <EducationEditor      initialEducation={initialData.education} />,
    achievements:   <AchievementsEditor   initialAchievements={initialData.achievements} />,
    all:            <AllSectionsEditor    data={initialData} />,
  }

  const SidebarContent = () => (
    <>
      <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 800, background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Portfolio CMS
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Local file-based admin</div>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="sidebar-close" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <X size={18} />
        </button>
      </div>

      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => { setActiveSection(item.id); setSidebarOpen(false) }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '10px',
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontSize: '14px', fontWeight: 500, width: '100%', textAlign: 'left',
              transition: 'all 0.2s ease',
              background: activeSection === item.id ? 'rgba(139,92,246,0.12)' : 'transparent',
              color: activeSection === item.id ? '#c4b5fd' : 'var(--text-secondary)',
              borderLeft: activeSection === item.id ? '2px solid #8b5cf6' : '2px solid transparent',
            }}
          >
            {item.icon}
            {item.label}
            {activeSection === item.id && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
          </button>
        ))}
      </nav>

      <div style={{ padding: '12px 10px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <a href="/" target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'all 0.2s ease' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.08)'; e.currentTarget.style.color = '#67e8f9' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' }}
        >
          <Eye size={16} /> View Portfolio
        </a>
        <button onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', border: 'none', cursor: 'pointer', background: 'transparent', color: 'var(--text-muted)', fontFamily: 'inherit', fontSize: '14px', fontWeight: 500, width: '100%', textAlign: 'left', transition: 'all 0.2s ease' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.color = '#fca5a5' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)' }}
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </>
  )

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px', flexShrink: 0,
        background: 'rgba(255,255,255,0.02)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, bottom: 0, zIndex: 50,
      }} className="admin-sidebar">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 49, backdropFilter: 'blur(4px)' }} />
      )}
      {/* Mobile sidebar */}
      <aside style={{
        width: '240px', flexShrink: 0,
        background: 'rgba(5,5,15,0.98)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, bottom: 0, zIndex: 51,
        transition: 'transform 0.3s ease',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
      }} className="admin-sidebar-mobile">
        <SidebarContent />
      </aside>

      {/* Main */}
      <div style={{ flex: 1, marginLeft: '240px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="admin-main">
        <header style={{
          position: 'sticky', top: 0, zIndex: 40,
          padding: '0 32px', height: '60px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(5,5,15,0.9)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setSidebarOpen(true)} className="sidebar-toggle" style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'none' }}>
              <Menu size={20} />
            </button>
            <h1 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {NAV_ITEMS.find(n => n.id === activeSection)?.label}
            </h1>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)', padding: '4px 12px', borderRadius: '999px' }}>
            Editing portfolio.json
          </div>
        </header>
        <main style={{ flex: 1, padding: '32px' }}>
          {sectionContent[activeSection]}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar { display: none !important; }
          .admin-main { margin-left: 0 !important; }
          .sidebar-toggle { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
