import { addDays, addMonths, differenceInCalendarDays, parseISO, startOfToday } from "date-fns"
import type { Purchase } from "@/types/purchase"

/** Parse a date-only purchase value as a local calendar date. */
function purchaseDate(purchase: Purchase): Date {
  return parseISO(purchase.purchaseDate)
}

export function getReturnDeadline(purchase: Purchase): Date {
  return addDays(purchaseDate(purchase), purchase.returnWindowDays)
}

export function getWarrantyExpiry(purchase: Purchase): Date {
  return addMonths(purchaseDate(purchase), purchase.warrantyMonths)
}

export function getDaysRemaining(deadline: Date): number {
  return differenceInCalendarDays(deadline, startOfToday())
}
