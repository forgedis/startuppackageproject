'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FolderTree, Users, FileText, Inbox, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const menuItems = [
  {
    title: 'Dashboard',
    icon: Home,
    href: '/admin',
  },
  {
    title: 'Kategorie',
    icon: FolderTree,
    href: '/admin/categories',
  },
  {
    title: 'Partneři',
    icon: Users,
    href: '/admin/partners',
  },
  {
    title: 'Nabídky',
    icon: FileText,
    href: '/admin/offers',
  },
  {
    title: 'Poptávky',
    icon: Inbox,
    href: '/admin/leads',
  },
  {
    title: 'Nastavení',
    icon: Settings,
    href: '/admin/settings',
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin-login')
    router.refresh()
  }

  return (
    <aside className="w-64 border-r bg-card">
      <div className="flex h-full flex-col">
        <div className="border-b p-6">
          <h2 className="text-xl font-bold">StartupPackage</h2>
          <p className="text-sm text-muted-foreground">Administrace</p>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href ||
              (item.href !== '/admin' && pathname?.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            )
          })}
        </nav>

        <div className="border-t p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-5 w-5" />
            Odhlásit se
          </button>
        </div>
      </div>
    </aside>
  )
}
