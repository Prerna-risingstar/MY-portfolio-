import type { Profile, Skill, Experience, Project, Certification, Education, Achievement } from '@/types/database'

export const mockProfile: Profile = {
  id: '1',
  name: 'Prerna Patel',
  role: 'Frontend Developer',
  bio: 'Building modern web experiences with Next.js, React, and TypeScript.',
  about_me: 'I\'m a passionate frontend developer who loves crafting beautiful, performant web applications. I specialize in React ecosystem and have a keen eye for design and user experience.',
  location: 'India',
  interests: ['Web Development', 'Open Source', 'UI/UX Design', 'Problem Solving'],
  career_objective: 'To build innovative web products that make a real difference, working with talented teams on challenging problems.',
  profile_picture_url: '/profile-photo.jpg',
  resume_url: null,
  github_url: 'https://github.com',
  linkedin_url: 'https://linkedin.com',
  email: 'hello@example.com',
  updated_at: null,
}

export const mockSkills: Skill[] = [
  { id: '1', name: 'React', category: 'Frontend', icon: '⚛️', sort_order: 1 },
  { id: '2', name: 'Next.js', category: 'Frontend', icon: '▲', sort_order: 2 },
  { id: '3', name: 'TypeScript', category: 'Frontend', icon: '📘', sort_order: 3 },
  { id: '4', name: 'Tailwind CSS', category: 'Frontend', icon: '🎨', sort_order: 4 },
  { id: '5', name: 'Supabase', category: 'Backend', icon: '⚡', sort_order: 5 },
  { id: '6', name: 'Power BI', category: 'Tools', icon: '📊', sort_order: 6 },
]

export const mockExperiences: Experience[] = [
  {
    id: '1',
    company: 'ABC Company',
    position: 'Frontend Intern',
    duration: 'Jan 2026 – Apr 2026',
    start_date: '2026-01-01',
    end_date: '2026-04-30',
    is_current: false,
    description: ['Built interactive dashboard with React', 'Improved page load performance by 40%', 'Added smooth animations with Framer Motion'],
    sort_order: 1,
  },
]

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Student Dashboard',
    description: 'A comprehensive student management dashboard with real-time data and beautiful charts.',
    tech_stack: ['Next.js', 'TypeScript', 'Supabase'],
    image_url: null,
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    category: 'Web',
    featured: true,
    sort_order: 1,
  },
]

export const mockCertifications: Certification[] = [
  {
    id: '1',
    title: 'Google Data Analytics',
    issuer: 'Coursera',
    year: '2026',
    certificate_url: null,
    image_url: null,
    sort_order: 1,
  },
]

export const mockEducation: Education[] = [
  {
    id: '1',
    degree: 'B.Tech Computer Science',
    institution: 'XYZ University',
    duration: '2023 – 2027',
    cgpa: '8.5',
    sort_order: 1,
  },
]

export const mockAchievements: Achievement[] = [
  { id: '1', title: 'Hackathon Finalist', description: 'Top 10 at national-level hackathon', icon: '🏆', sort_order: 1 },
  { id: '2', title: 'Open Source Contributor', description: 'Contributed to 5+ open source projects', icon: '🌟', sort_order: 2 },
  { id: '3', title: '500+ LeetCode Problems', description: 'Consistent problem solver', icon: '⚡', sort_order: 3 },
]
