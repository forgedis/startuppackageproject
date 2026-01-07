import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-purple-50 to-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Vše, co váš startup potřebuje k rozjezdu
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            StartupPackage přináší startupům v rané fázi zvýhodněné balíčky nástrojů,
            služeb a know-how od ověřených partnerů. Šetříme vám čas, peníze i energii
            při vstupu na trh.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a href="#kategorie">
              <Button size="lg">Prozkoumat nabídky</Button>
            </a>
            <a href="#jak-to-funguje">
              <Button size="lg" variant="outline">
                Jak to funguje
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
