import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Category } from '@/types'
import * as Icons from 'lucide-react'

interface CategoryGridProps {
  categories: Category[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section id="kategorie" className="bg-muted/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Vyberte si kategorii
          </h2>
          <p className="text-lg text-muted-foreground">
            Prozkoumejte nabídky v oblasti, kterou právě potřebujete
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => {
            const IconComponent = category.icon
              ? (Icons[category.icon as keyof typeof Icons] as React.ElementType)
              : Icons.Box

            return (
              <Link
                key={category.id}
                href={`/kategorie/${category.slug}`}
                className="group"
              >
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      {IconComponent && <IconComponent className="h-6 w-6" />}
                    </div>
                    <CardTitle className="text-lg">{category.name_cs}</CardTitle>
                  </CardHeader>
                  {category.description_cs && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {category.description_cs}
                      </p>
                    </CardContent>
                  )}
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
