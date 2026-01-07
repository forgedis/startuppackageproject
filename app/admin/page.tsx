import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderTree, Users, FileText, Inbox } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch counts
  const [
    { count: categoriesCount },
    { count: partnersCount },
    { count: offersCount },
    { count: leadsCount },
  ] = await Promise.all([
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('partners').select('*', { count: 'exact', head: true }),
    supabase.from('offers').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    {
      title: 'Kategorie',
      value: categoriesCount || 0,
      icon: FolderTree,
      href: '/admin/categories',
    },
    {
      title: 'Partneři',
      value: partnersCount || 0,
      icon: Users,
      href: '/admin/partners',
    },
    {
      title: 'Nabídky',
      value: offersCount || 0,
      icon: FileText,
      href: '/admin/offers',
    },
    {
      title: 'Poptávky',
      value: leadsCount || 0,
      icon: Inbox,
      href: '/admin/leads',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Přehled</h2>
        <p className="text-muted-foreground">
          Vítejte v administračním panelu StartupPackage
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rychlé akce</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <a
            href="/admin/categories/new"
            className="block rounded-lg border p-4 hover:bg-muted"
          >
            <h3 className="font-semibold">Přidat kategorii</h3>
            <p className="text-sm text-muted-foreground">
              Vytvořte novou kategorii nabídek
            </p>
          </a>
          <a
            href="/admin/partners/new"
            className="block rounded-lg border p-4 hover:bg-muted"
          >
            <h3 className="font-semibold">Přidat partnera</h3>
            <p className="text-sm text-muted-foreground">
              Zaregistrujte nového partnera do systému
            </p>
          </a>
          <a
            href="/admin/offers/new"
            className="block rounded-lg border p-4 hover:bg-muted"
          >
            <h3 className="font-semibold">Přidat nabídku</h3>
            <p className="text-sm text-muted-foreground">
              Vytvořte novou nabídku pro startupy
            </p>
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
