import { PasswordChangeForm } from '@/components/admin/password-change-form'
import { getAuthUser } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function SettingsPage() {
  const user = await getAuthUser()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Nastavení</h2>
        <p className="text-muted-foreground">
          Spravujte svůj účet a nastavení
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informace o účtu</CardTitle>
            <CardDescription>
              Vaše přihlašovací údaje
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">ID uživatele</p>
              <p className="text-sm text-muted-foreground font-mono">{user?.id}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Změna hesla</CardTitle>
            <CardDescription>
              Aktualizujte své heslo pro zabezpečení účtu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordChangeForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
