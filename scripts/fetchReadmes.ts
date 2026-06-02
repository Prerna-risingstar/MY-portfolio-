// scripts/fetchReadmes.ts
// Using built-in fetch; no external import needed
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

interface Repo {
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
}

interface ReadmeResponse {
  content: string; // base64
  encoding: string;
}

interface Portfolio {
  profile: any;
  skills: any[];
  experiences: any[];
  projects: any[];
  certifications: any[];
  education: any[];
  achievements: any[];
}

const USER = 'Prerna-risingstar';
const REPO_LIST_URL = `https://api.github.com/users/${USER}/repos?per_page=100`;
const PORTFOLIO_PATH = path.resolve(process.cwd(), 'src', 'data', 'portfolio.json');

async function getRepos(): Promise<Repo[]> {
  const res = await fetch(REPO_LIST_URL);
  if (!res.ok) throw new Error(`Failed to fetch repos: ${res.status}`);
  const data = (await res.json()) as any[];
  return data.map(r => ({
    name: r.name,
    html_url: r.html_url,
    description: r.description,
    homepage: r.homepage,
  }));
}

async function getReadme(repo: string): Promise<string> {
  const url = `https://api.github.com/repos/${USER}/${repo}/readme`;
  const res = await fetch(url);
  if (!res.ok) return '';
  const data = (await res.json()) as ReadmeResponse;
  const buff = Buffer.from(data.content, 'base64');
  return buff.toString('utf-8');
}

async function main() {
  console.log('Fetching repository list...');
  const repos = await getRepos();

  console.log(`Found ${repos.length} repos. Loading portfolio...`);
  const portfolioRaw = await readFile(PORTFOLIO_PATH, 'utf-8');
  const portfolio: Portfolio = JSON.parse(portfolioRaw);

  const existingIds = new Set(portfolio.projects.map(p => p.id));
  const newProjects = [] as any[];

  for (const repo of repos) {
    const id = `proj-${repo.name}`;
    if (existingIds.has(id)) continue; // skip if already present
    const readme = await getReadme(repo.name);
    const description = readme.split('\n\n')[0] || repo.description || '';
    newProjects.push({
      id,
      title: repo.name,
      description,
      tech_stack: [],
      image_url: null,
      github_url: repo.html_url,
      live_url: repo.homepage || null,
      category: 'Web',
      featured: false,
      sort_order: portfolio.projects.length + newProjects.length,
    });
  }

  if (newProjects.length > 0) {
    portfolio.projects = [...portfolio.projects, ...newProjects];
    await writeFile(PORTFOLIO_PATH, JSON.stringify(portfolio, null, 2), 'utf-8');
    console.log(`Added ${newProjects.length} new project entries to portfolio.json`);
  } else {
    console.log('No new projects to add.');
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
