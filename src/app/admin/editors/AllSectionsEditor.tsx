'use client'

import type { PortfolioData } from '@/lib/portfolio-store'
import ProfileEditor from './ProfileEditor'
import SkillsEditor from './SkillsEditor'
import ExperienceEditor from './ExperienceEditor'
import ProjectsEditor from './ProjectsEditor'
import CertificationsEditor from './CertificationsEditor'
import EducationEditor from './EducationEditor'
import AchievementsEditor from './AchievementsEditor'

export default function AllSectionsEditor({ data }: { data: PortfolioData }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <ProfileEditor initialProfile={data.profile} />
      <SkillsEditor initialSkills={data.skills} />
      <ExperienceEditor initialExperiences={data.experiences} />
      <ProjectsEditor initialProjects={data.projects} />
      <CertificationsEditor initialCertifications={data.certifications} />
      <EducationEditor initialEducation={data.education} />
      <AchievementsEditor initialAchievements={data.achievements} />
    </div>
  )
}
