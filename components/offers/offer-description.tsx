interface OfferDescriptionProps {
  description: string
}

export function OfferDescription({ description }: OfferDescriptionProps) {
  return (
    <div className="prose prose-gray max-w-none">
      <h2 className="text-2xl font-bold">O nabídce</h2>
      <div className="mt-4 whitespace-pre-wrap text-base leading-relaxed text-muted-foreground">
        {description}
      </div>
    </div>
  )
}
