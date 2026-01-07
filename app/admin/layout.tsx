import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminHeader } from '@/components/admin/admin-header'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const adminAccess = await isAdmin()

  if (!adminAccess) {
    redirect('/admin-login')
  }

  return (
    <div className="flex h-screen bg-muted/30">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
