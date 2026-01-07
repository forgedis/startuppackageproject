import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function FAQPage() {
  const faqs = [
    {
      question: 'Kdo může nabídky využít?',
      answer: 'Nabídky jsou určeny pro české a slovenské startupy ve všech fázích – od nápadu přes MVP až po firmy připravené na investici. Konkrétní podmínky závisí na jednotlivých nabídkách, ale většina je zaměřena na firmy mladší 5 let.'
    },
    {
      question: 'Budu muset něco platit předem?',
      answer: 'Ne! Všechny nabídky na StartupPackage jsou buď zcela zdarma, nebo nabízejí významnou slevu. Nikdy neplatíte za zprostředkování ani za přístup k nabídkám. Podmínky platby jsou vždy jasně uvedeny u každé nabídky.'
    },
    {
      question: 'To zní až moc hezky, kde je háček?',
      answer: 'Žádný háček tu není! Partneři poskytují tyto nabídky, protože chtějí podporovat startup ekosystém a získat nové dlouhodobé klienty. Pro ně je to investice do vztahu s vámi – pokud vám pomohou na začátku, pravděpodobně u nich zůstanete i později.'
    },
    {
      question: 'A proč těm partnerům věřit?',
      answer: 'Všechny partnery pečlivě vybíráme a ověřujeme. Pracujeme pouze se zavedenými firmami, které mají zkušenosti se startupy a dobré reference. Navíc – není to charita, partneři mají obchodní zájem na tom, aby vám dobře sloužili.'
    },
    {
      question: 'Jak dlouho trvá, než získám nabídku?',
      answer: 'Po vyplnění formuláře vás partner obvykle kontaktuje do 2-3 pracovních dnů. Rychlost závisí na konkrétním partnerovi a typu služby. Urgentní případy můžete označit v poznámce.'
    },
    {
      question: 'Můžu využít více nabídek najednou?',
      answer: 'Určitě! Naopak to doporučujeme. Každá nabídka pokrývá jinou oblast podnikání, takže si klidně vezměte nabídku na účetnictví, technologické řešení i coworking najednou.'
    },
    {
      question: 'Co když mi nabídka nevyhovuje?',
      answer: 'Žádný problém! Nejste k ničemu zavázáni. Pokud po kontaktu s partnerem zjistíte, že nabídka není pro vás, prostě ji nevyužijete. Žádné sankce ani poplatky.'
    },
    {
      question: 'Jak se mohu stát partnerem?',
      answer: 'Pokud nabízíte služby relevantní pro startupy a chcete se stát partnerem, kontaktujte nás na info@startuppackage.cz. Rádi si s vámi promluvíme o možnostech spolupráce.'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Často kladené otázky
          </h1>
          <p className="text-lg text-muted-foreground">
            Najděte odpovědi na nejčastější dotazy o StartupPackage
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Nenašli jste odpověď na svou otázku?{' '}
            <a
              href="mailto:info@startuppackage.cz"
              className="text-primary hover:underline"
            >
              Kontaktujte nás
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
