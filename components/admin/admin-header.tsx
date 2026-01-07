import { getAuthUser } from '@/lib/auth'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export async function AdminHeader() {
  const user = await getAuthUser()

  return (
    <header className="border-b bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Administrace</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <ExternalLink className="h-4 w-4" />
            Zobrazit web
          </Link>
          <div className="text-sm">
            <p className="font-medium">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
