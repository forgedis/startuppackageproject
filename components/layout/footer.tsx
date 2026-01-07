import Link from 'next/link'
import { CONTACT, SOCIAL_LINKS } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand & About */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">StartupPackage</h3>
            <p className="text-sm text-muted-foreground">
              Vše, co váš startup potřebuje k rozjezdu
            </p>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Provozovatel:</p>
              <a
                href={CONTACT.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                StartupPackage.eu
              </a>
            </div>
          </div>

          {/* Navigation & FAQ */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Navigace</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#kategorie" className="hover:text-primary transition-colors">
                  Kategorie
                </Link>
              </li>
              <li>
                <Link href="/#jak-to-funguje" className="hover:text-primary transition-colors">
                  Jak to funguje
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/zasady-ochrany-udaju" className="hover:text-primary transition-colors">
                  Ochrana osobních údajů
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Kontakt</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="hover:text-primary transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* FAQ Highlights */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Často kladené otázky</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  Kdo může nabídky využít?
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  Budu muset něco platit předem?
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  Kde je háček?
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  Proč partnerům věřit?
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} StartupPackage. Všechna práva vyhrazena.</p>
            <p>
              Vytvořil a spravuje{' '}
              <a
                href="https://dype.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                DYPE
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
