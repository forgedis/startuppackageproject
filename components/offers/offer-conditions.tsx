import { CheckCircle2 } from 'lucide-react'
import type { OfferConditions as OfferConditionsType } from '@/types'

interface OfferConditionsProps {
  conditions: OfferConditionsType | any
}

export function OfferConditions({ conditions }: OfferConditionsProps) {
  if (!conditions || typeof conditions !== 'object') return null

  const conditionsList = []

  if (conditions.company_age) {
    conditionsList.push(`Stáří firmy: ${conditions.company_age}`)
  }
  if (conditions.revenue) {
    conditionsList.push(`Obrat: ${conditions.revenue}`)
  }
  if (conditions.employees) {
    conditionsList.push(`Počet zaměstnanců: ${conditions.employees}`)
  }
  if (conditions.other && Array.isArray(conditions.other)) {
    conditionsList.push(...conditions.other)
  }

  if (conditionsList.length === 0) return null

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Podmínky</h2>
      <div className="space-y-2">
        {conditionsList.map((condition, index) => (
          <div key={index} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <span className="text-muted-foreground">{condition}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
