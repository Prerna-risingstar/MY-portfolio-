import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { readPortfolio } from '@/lib/portfolio-store'
import AdminDashboard from './AdminDashboard'

export default async function AdminPage() {
  // Auth check via cookie
  const cookieStore = await cookies()
  const token = cookieStore.get('portfolio_admin')?.value
  if (!token || token !== process.env.ADMIN_SECRET) {
    redirect('/admin/login')
  }

  const data = await readPortfolio()

  return <AdminDashboard initialData={data} />
}
