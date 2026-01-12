import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">StartupPackage</span>
        </Link>

        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/#kategorie"
            className="transition-colors hover:text-primary"
          >
            Přehled nabídek
          </Link>
          <Link href="/faq" className="transition-colors hover:text-primary">
            Jak to funguje
          </Link>
        </nav>
      </div>
    </header>
  )
}
