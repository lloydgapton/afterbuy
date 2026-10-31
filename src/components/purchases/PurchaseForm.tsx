import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { format, startOfToday } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { purchaseSchema, type PurchaseFormValues } from "@/lib/purchaseSchema"
import type { Purchase } from "@/types/purchase"

const categories = ["Smartphones", "Computers", "Accessories", "Audio", "Home office", "Home appliances", "Other"]
const returnWindows = [7, 14, 30]
const warrantyDurations = [6, 12, 18, 24, 36]
const statuses = [
  { value: "considering", label: "Considering" },
  { value: "kept", label: "Kept" },
  { value: "returned", label: "Returned" },
  { value: "claim_open", label: "Warranty claim" },
] as const

interface PurchaseFormProps {
  purchase?: Purchase | null
  onSubmit: (values: PurchaseFormValues) => void
  onCancel: () => void
}

function getDefaultValues(purchase?: Purchase | null): PurchaseFormValues {
  return {
    product: purchase?.product ?? "",
    category: purchase?.category ?? "",
    retailer: purchase?.retailer ?? "",
    purchaseDate: purchase?.purchaseDate ?? format(startOfToday(), "yyyy-MM-dd"),
    price: purchase?.price ?? 0,
    returnWindowDays: purchase?.returnWindowDays ?? 14,
    warrantyMonths: purchase?.warrantyMonths ?? 12,
    status: purchase?.status ?? "considering",
  }
}

export function PurchaseForm({ purchase, onSubmit, onCancel }: PurchaseFormProps) {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: getDefaultValues(purchase),
  })

  useEffect(() => {
    reset(getDefaultValues(purchase))
  }, [purchase, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit, () => toast.error("Please review the highlighted fields"))} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="product">Product name</Label>
          <Input id="product" placeholder="e.g. Samsung Galaxy A55" aria-invalid={Boolean(errors.product)} {...register("product")} />
          {errors.product && <p className="text-xs text-destructive">{errors.product.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="category" className="w-full" aria-invalid={Boolean(errors.category)}><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>{categories.map((category) => <SelectItem key={category} value={category}>{category}</SelectItem>)}</SelectContent>
              </Select>
            )}
          />
          {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="retailer">Retailer</Label>
          <Input id="retailer" placeholder="e.g. Jumia" aria-invalid={Boolean(errors.retailer)} {...register("retailer")} />
          {errors.retailer && <p className="text-xs text-destructive">{errors.retailer.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchaseDate">Purchase date</Label>
          <Input id="purchaseDate" type="date" max={format(startOfToday(), "yyyy-MM-dd")} aria-invalid={Boolean(errors.purchaseDate)} {...register("purchaseDate")} />
          {errors.purchaseDate && <p className="text-xs text-destructive">{errors.purchaseDate.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (₦)</Label>
          <Input id="price" type="number" min="0.01" step="0.01" aria-invalid={Boolean(errors.price)} {...register("price", { valueAsNumber: true })} />
          {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="returnWindowDays">Return window</Label>
          <Controller
            name="returnWindowDays"
            control={control}
            render={({ field }) => (
              <Select value={String(field.value)} onValueChange={(value) => field.onChange(Number(value))}>
                <SelectTrigger id="returnWindowDays" className="w-full" aria-invalid={Boolean(errors.returnWindowDays)}><SelectValue /></SelectTrigger>
                <SelectContent>{returnWindows.map((days) => <SelectItem key={days} value={String(days)}>{days} days</SelectItem>)}</SelectContent>
              </Select>
            )}
          />
          {errors.returnWindowDays && <p className="text-xs text-destructive">{errors.returnWindowDays.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="warrantyMonths">Warranty duration</Label>
          <Controller
            name="warrantyMonths"
            control={control}
            render={({ field }) => (
              <Select value={String(field.value)} onValueChange={(value) => field.onChange(Number(value))}>
                <SelectTrigger id="warrantyMonths" className="w-full" aria-invalid={Boolean(errors.warrantyMonths)}><SelectValue /></SelectTrigger>
                <SelectContent>{warrantyDurations.map((months) => <SelectItem key={months} value={String(months)}>{months} months</SelectItem>)}</SelectContent>
              </Select>
            )}
          />
          {errors.warrantyMonths && <p className="text-xs text-destructive">{errors.warrantyMonths.message}</p>}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="status">Status</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="status" className="w-full" aria-invalid={Boolean(errors.status)}><SelectValue /></SelectTrigger>
                <SelectContent>{statuses.map((status) => <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>)}</SelectContent>
              </Select>
            )}
          />
          {errors.status && <p className="text-xs text-destructive">{errors.status.message}</p>}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>{purchase ? "Save changes" : "Save purchase"}</Button>
      </div>
    </form>
  )
}
