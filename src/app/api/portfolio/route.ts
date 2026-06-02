import { readPortfolio, updateSection } from '@/lib/portfolio-store'
import { cookies } from 'next/headers'

/** Verify the admin session cookie */
async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get('portfolio_admin')?.value
  return token === process.env.ADMIN_SECRET
}

export async function GET() {
  try {
    const data = await readPortfolio()
    return Response.json(data)
  } catch {
    return Response.json({ error: 'Failed to read data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json() as { section: string; data: unknown }
    const validSections = ['profile', 'skills', 'experiences', 'projects', 'certifications', 'education', 'achievements']

    if (!validSections.includes(body.section)) {
      return Response.json({ error: 'Invalid section' }, { status: 400 })
    }

    await updateSection(body.section as any, body.data as any)
    return Response.json({ ok: true })
  } catch (e: any) {
    return Response.json({ error: e.message ?? 'Write failed' }, { status: 500 })
  }
}
