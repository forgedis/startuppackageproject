import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-purple-50 to-background py-16 md:py-24">
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
          <div className="flex justify-center">
            <a href="#kategorie">
              <Button size="lg" className="text-lg px-8 py-6 hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-300 hover:scale-105 transition-all">Prozkoumat nabídky</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
