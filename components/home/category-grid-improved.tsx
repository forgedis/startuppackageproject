import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import * as Icons from 'lucide-react'

interface CategoryWithOffers {
  id: string
  slug: string
  name_cs: string
  description_cs: string | null
  icon: string | null
  offers?: Array<{
    id: string
    partner: {
      name: string
      slug: string
    } | null
  }>
}

interface CategoryGridImprovedProps {
  categories: CategoryWithOffers[]
}

export function CategoryGridImproved({ categories }: CategoryGridImprovedProps) {
  return (
    <section id="kategorie" className="bg-muted/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Prozkoumejte nabídky od partnerů
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            // Get unique partner names for this category
            const partners = category.offers
              ?.filter(offer => offer.partner)
              .map(offer => offer.partner!.name)
              .filter((name, index, self) => self.indexOf(name) === index) // unique
              .slice(0, 3) // max 3 partners to show

            // Get icon component
            const IconComponent = category.icon
              ? (Icons[category.icon as keyof typeof Icons] as React.ElementType)
              : Icons.Box

            return (
              <Link key={category.id} href={`/kategorie/${category.slug}`} className="block h-full">
                <Card className="flex flex-col h-full border-2 transition-all hover:shadow-xl hover:shadow-purple-200 hover:border-purple-500 hover:scale-[1.02] cursor-pointer">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {IconComponent && <IconComponent className="h-6 w-6" />}
                    </div>
                    <CardTitle className="text-xl font-bold">
                      {category.name_cs}
                    </CardTitle>
                    {category.description_cs && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {category.description_cs}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className="flex-1">
                    {partners && partners.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold mb-2">
                          Nabídky od:
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {partners.join(', ')}
                        </p>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="justify-center">
                    <Button className="px-8 hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-300 hover:scale-105 transition-all" variant="default">
                      Tohle mě zajímá
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
