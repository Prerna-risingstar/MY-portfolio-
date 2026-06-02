// TypeScript types matching the Supabase database schema

export interface Profile {
  id: string
  name: string | null
  role: string | null
  bio: string | null
  about_me: string | null
  location: string | null
  interests: string[] | null
  career_objective: string | null
  profile_picture_url: string | null
  resume_url: string | null
  github_url: string | null
  linkedin_url: string | null
  email: string | null
  updated_at: string | null
}

export interface Skill {
  id: string
  name: string
  category: string | null
  icon: string | null
  sort_order: number
}

export interface Experience {
  id: string
  company: string
  position: string
  duration: string | null
  start_date: string | null
  end_date: string | null
  is_current: boolean
  description: string[] | null
  certificate_url?: string | null
  offer_letter_url?: string | null
  sort_order: number
}

export interface Project {
  id: string
  title: string
  description: string | null
  tech_stack: string[] | null
  image_url: string | null
  github_url: string | null
  live_url: string | null
  category: string | null
  featured: boolean
  sort_order: number
}

export interface Certification {
  id: string
  title: string
  issuer: string | null
  year: string | null
  certificate_url: string | null
  image_url: string | null
  sort_order: number
}

export interface Education {
  id: string
  degree: string
  institution: string | null
  duration: string | null
  cgpa: string | null
  sort_order: number
}

export interface Achievement {
  id: string
  title: string
  description: string | null
  icon: string | null
  sort_order: number
}
