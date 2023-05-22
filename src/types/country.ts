export interface Country {
    name: string
    code: string
    emoji: string
    native?: string
    phone?: string
    capital?: string
    currency?: string
    languages?: Array<{
        name: string
    }>
    continent?: {
        name: string
    }
}