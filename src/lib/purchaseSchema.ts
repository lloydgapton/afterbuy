import { isAfter, isValid, parseISO, startOfToday } from "date-fns"
import { z } from "zod"
import { purchaseStatuses } from "@/types/purchase"

export const purchaseSchema = z.object({
  product: z.string().trim().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  retailer: z.string().trim().min(1, "Retailer is required"),
  purchaseDate: z
    .string()
    .min(1, "Purchase date is required")
    .refine((value) => isValid(parseISO(value)), "Enter a valid purchase date")
    .refine((value) => !isAfter(parseISO(value), startOfToday()), "Purchase date cannot be in the future"),
  price: z.number().positive("Price must be greater than zero"),
  returnWindowDays: z.number().positive("Select a return window"),
  warrantyMonths: z.number().positive("Select a warranty duration"),
  status: z.enum(purchaseStatuses),
})

export type PurchaseFormValues = z.infer<typeof purchaseSchema>
