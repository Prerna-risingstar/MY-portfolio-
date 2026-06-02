import Navbar from '@/components/portfolio/Navbar'
import HeroSection from '@/components/portfolio/HeroSection'
import AboutSection from '@/components/portfolio/AboutSection'
import SkillsSection from '@/components/portfolio/SkillsSection'
import ExperienceSection from '@/components/portfolio/ExperienceSection'
import ProjectsSection from '@/components/portfolio/ProjectsSection'
import CertificationsSection from '@/components/portfolio/CertificationsSection'
import { ResearchSection } from '@/components/portfolio/ResearchSection'
import ContactSection from '@/components/portfolio/ContactSection'
import { readPortfolio } from '@/lib/portfolio-store'

export default async function Home() {
  const { profile, skills, experiences, projects, certifications, education, achievements } =
    await readPortfolio()

  return (
    <>
      <Navbar name={profile.name} />
      <main>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} achievements={achievements} education={education} />
        <SkillsSection skills={skills} />
        <ExperienceSection experiences={experiences} />
        <ProjectsSection projects={projects} />
        <ResearchSection />
        <CertificationsSection certifications={certifications} />
        <ContactSection profile={profile} />
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '32px 24px',
        color: 'var(--text-muted)',
        fontSize: '13px',
        borderTop: '1px solid var(--border)',
      }}>
        <p>
          Built by{' '}
          <span style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>{profile.name}</span>
          {' '}with Next.js
        </p>
        <p style={{ marginTop: '6px', fontSize: '11px' }}>© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </>
  )
}
