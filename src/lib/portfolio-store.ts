import fs from 'fs/promises'
import path from 'path'
import type { Profile, Skill, Experience, Project, Certification, Education, Achievement } from '@/types/database'

export interface PortfolioData {
  profile: Profile
  skills: Skill[]
  experiences: Experience[]
  projects: Project[]
  certifications: Certification[]
  education: Education[]
  achievements: Achievement[]
}

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'portfolio.json')

export async function readPortfolio(): Promise<PortfolioData> {
  const raw = await fs.readFile(DATA_FILE, 'utf-8')
  return JSON.parse(raw) as PortfolioData
}

export async function writePortfolio(data: PortfolioData): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

export async function updateSection<K extends keyof PortfolioData>(
  section: K,
  value: PortfolioData[K]
): Promise<void> {
  const current = await readPortfolio()
  current[section] = value
  await writePortfolio(current)
}
