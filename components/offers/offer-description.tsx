import { CheckCircle2 } from 'lucide-react'

interface OfferDescriptionProps {
  description: string
}

export function OfferDescription({ description }: OfferDescriptionProps) {
  // Split description into sentences - either by newlines or periods
  const descriptionLines = description
    .split(/[.\n]+/) // Split by period or newline
    .map(line => line.trim())
    .filter(line => line.length > 0)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Nabídka</h2>
      <ul className="space-y-3">
        {descriptionLines.map((line, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
            <span className="text-lg leading-relaxed text-foreground">{line}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
