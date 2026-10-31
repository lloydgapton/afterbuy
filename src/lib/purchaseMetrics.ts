import { getDaysRemaining, getReturnDeadline, getWarrantyExpiry } from "@/lib/purchaseDates"
import type { Purchase } from "@/types/purchase"

export interface PurchaseMetrics {
  totalPurchases: number
  returnWindowsClosingSoon: number
  activeWarranties: number
  returnedPurchases: number
}

export function getPurchaseMetrics(purchases: Purchase[]): PurchaseMetrics {
  const activePurchases = purchases.filter((purchase) => purchase.status !== "returned")
  const returnedPurchases = purchases.filter((purchase) => purchase.status === "returned")
  const returnWindowsClosingSoon = activePurchases.filter((purchase) => {
    const daysRemaining = getDaysRemaining(getReturnDeadline(purchase))
    return daysRemaining >= 0 && daysRemaining <= 30
  })
  const activeWarranties = activePurchases.filter(
    (purchase) => getDaysRemaining(getWarrantyExpiry(purchase)) >= 0,
  )

  return {
    totalPurchases: purchases.length,
    returnWindowsClosingSoon: returnWindowsClosingSoon.length,
    activeWarranties: activeWarranties.length,
    returnedPurchases: returnedPurchases.length,
  }
}
