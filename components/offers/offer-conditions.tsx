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
    <div className="border-t pt-6">
      <h3 className="mb-3 text-base font-semibold text-muted-foreground">Podmínky:</h3>
      <div className="space-y-1.5">
        {conditionsList.map((condition, index) => (
          <p key={index} className="text-sm text-muted-foreground">
            {condition}
          </p>
        ))}
      </div>
    </div>
  )
}
