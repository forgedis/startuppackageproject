import { ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Přijďe na homepage',
    description: 'Vidíš silný nadpis + vysvětlení',
  },
  {
    number: '02',
    title: 'Okamžitě vidíš přehled partnerů + nabídkou',
    description: 'Vybereš kategorii (HR, Finance, Tech…)',
  },
  {
    number: '03',
    title: 'Klikneš na "Mám zájem"',
    description: 'partner se vám ozve a dojdete k podrobnostem',
  },
]

export function HowItWorks() {
  return (
    <section id="jak-to-funguje" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Jak to funguje
          </h2>
          <p className="text-lg text-muted-foreground">
            Tři jednoduché kroky k vašemu startupu balíčku
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="mb-4">
                  <span className="text-5xl font-bold text-primary/20">
                    {step.number}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="absolute -right-4 top-8 hidden md:block">
                    <ArrowRight className="h-6 w-6 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
