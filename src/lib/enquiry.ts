import { businessConfig } from '@/config/business'

export type EnquiryKind = 'product' | 'look' | 'outfit'

export function buildEnquiryMessage({
  kind,
  lookName,
  productNames,
  pageUrl,
}: {
  kind: EnquiryKind
  lookName?: string
  productNames?: string[]
  pageUrl: string
}): string {
  const lines: string[] = []
  lines.push('Hello Suit Galleria · Buckingham Street Co.')
  lines.push('')
  lines.push('I would like to make an enquiry:')

  if (kind === 'look' && lookName) {
    lines.push('')
    lines.push(`Look: ${lookName}`)
  }

  if (productNames?.length) {
    lines.push('')
    lines.push('Products:')
    productNames.forEach((name, i) => {
      lines.push(`${i + 1}. ${name}`)
    })
  }

  if (kind === 'outfit') {
    lines.push('')
    lines.push('Request: Enquire about the complete outfit above.')
  }

  lines.push('')
  lines.push(`Reference page: ${pageUrl}`)
  lines.push('')
  lines.push(
    'Please confirm availability and sizing. Suit Galleria is a catalogue and enquiry-based business; this is not an order.',
  )

  return lines.join('\n')
}

export function openWhatsApp(text: string): void {
  const whatsapp = businessConfig.contact.whatsapp
  if (!whatsapp) {
    // Never open a fake number. Configuration must be set in src/config/business.ts
    return
  }
  const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function getWhatsAppUrl(): string | null {
  return businessConfig.contact.whatsapp
    ? `https://wa.me/${businessConfig.contact.whatsapp}`
    : null
}
