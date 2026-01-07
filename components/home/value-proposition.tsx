import { CheckCircle2, Users, Zap } from 'lucide-react'

const benefits = [
  {
    icon: CheckCircle2,
    title: 'Vyberete si oblast',
    description: 'kterou právě řešíte',
  },
  {
    icon: Users,
    title: 'Otevřete nabídky partnerů',
    description: 'včetně výhodné nabídky',
  },
  {
    icon: Zap,
    title: 'Požádejte poptávku',
    description: 'partner se vám ozve a dojdete k podrobnosti',
  },
]

export function ValueProposition() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Bez závazků, bez plateb předem, bez háčků
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
