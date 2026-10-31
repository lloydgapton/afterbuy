export type PurchaseStatus = "active" | "returned"

export type AttentionKind = "return" | "warranty"

export interface Purchase {
  id: string
  product: string
  category: string
  retailer: string
  purchaseDate: string
  price: number
  warrantyMonths: number
  returnWindowDays: number
  status: PurchaseStatus
  accent: "sage" | "amber" | "terracotta" | "ink"
}

export interface ActivityItem {
  id: string
  title: string
  description: string
  date: string
  kind: "purchase" | "return" | "warranty"
}
