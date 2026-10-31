import { addDays, addMonths } from "date-fns"
import type { ActivityItem, Purchase } from "@/types/purchase"

export const mockPurchases: Purchase[] = [
  {
    id: "samsung-galaxy-a55",
    product: "Samsung Galaxy A55",
    category: "Smartphones",
    retailer: "Slot Nigeria",
    purchaseDate: "2026-10-18",
    price: 485000,
    warrantyMonths: 12,
    returnWindowDays: 14,
    status: "active",
    accent: "sage",
  },
  {
    id: "hp-elitebook",
    product: "HP EliteBook 840 G10",
    category: "Computers",
    retailer: "Konga",
    purchaseDate: "2026-09-26",
    price: 1240000,
    warrantyMonths: 24,
    returnWindowDays: 7,
    status: "active",
    accent: "ink",
  },
  {
    id: "oraimo-power-bank",
    product: "Oraimo Power Bank 20,000mAh",
    category: "Accessories",
    retailer: "Jumia",
    purchaseDate: "2026-09-09",
    price: 38500,
    warrantyMonths: 12,
    returnWindowDays: 14,
    status: "active",
    accent: "amber",
  },
  {
    id: "sony-headphones",
    product: "Sony WH-1000XM5",
    category: "Audio",
    retailer: "Game Stores",
    purchaseDate: "2026-07-22",
    price: 685000,
    warrantyMonths: 12,
    returnWindowDays: 14,
    status: "active",
    accent: "terracotta",
  },
  {
    id: "ikea-desk-lamp",
    product: "IKEA NÄVLINGE Desk Lamp",
    category: "Home office",
    retailer: "IKEA",
    purchaseDate: "2026-06-14",
    price: 72000,
    warrantyMonths: 12,
    returnWindowDays: 30,
    status: "active",
    accent: "sage",
  },
]

export const mockActivity: ActivityItem[] = [
  {
    id: "activity-1",
    title: "Purchase added",
    description: "Samsung Galaxy A55 · Slot Nigeria",
    date: "2026-10-18",
    kind: "purchase",
  },
  {
    id: "activity-2",
    title: "Return window closes soon",
    description: "HP EliteBook 840 G10 · 3 days left",
    date: "2026-10-30",
    kind: "return",
  },
  {
    id: "activity-3",
    title: "Warranty reminder set",
    description: "Sony WH-1000XM5 · expires 22 Jul 2027",
    date: "2026-07-22",
    kind: "warranty",
  },
  {
    id: "activity-4",
    title: "Purchase added",
    description: "Oraimo Power Bank · Jumia",
    date: "2026-09-09",
    kind: "purchase",
  },
]

export function getReturnDeadline(purchase: Purchase): Date {
  return addDays(new Date(purchase.purchaseDate), purchase.returnWindowDays)
}

export function getWarrantyExpiry(purchase: Purchase): Date {
  return addMonths(new Date(purchase.purchaseDate), purchase.warrantyMonths)
}
