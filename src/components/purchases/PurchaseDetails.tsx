import { format } from "date-fns"
import { CalendarDays, CircleDollarSign, Clock3, Pencil, Store, Tag, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getReturnDeadline, getWarrantyExpiry } from "@/lib/purchaseDates"
import type { Purchase, PurchaseStatus } from "@/types/purchase"

interface PurchaseDetailsProps {
  purchase?: Purchase | null
  onOpenChange: (open: boolean) => void
  onEdit: (purchase: Purchase) => void
}

const statusLabels: Record<PurchaseStatus, string> = {
  considering: "Considering",
  kept: "Kept",
  returned: "Returned",
  claim_open: "Warranty claim",
}

export function PurchaseDetails({ purchase, onOpenChange, onEdit }: PurchaseDetailsProps) {
  if (!purchase) return null

  return (
    <Dialog open={Boolean(purchase)} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{purchase.product}</DialogTitle>
          <DialogDescription>{purchase.retailer} · {purchase.category}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          <Detail icon={Tag} label="Category" value={purchase.category} />
          <Detail icon={Store} label="Retailer" value={purchase.retailer} />
          <Detail icon={CalendarDays} label="Purchase date" value={format(new Date(`${purchase.purchaseDate}T00:00:00`), "d MMM yyyy")} />
          <Detail icon={CircleDollarSign} label="Price" value={`₦${purchase.price.toLocaleString("en-NG")}`} />
          <Detail icon={Clock3} label="Return deadline" value={format(getReturnDeadline(purchase), "d MMM yyyy")} />
          <Detail icon={Clock3} label="Warranty expiry" value={format(getWarrantyExpiry(purchase), "d MMM yyyy")} />
          <div className="rounded-xl border border-border bg-background p-3 sm:col-span-2">
            <p className="text-[11px] text-muted-foreground">Current status</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{statusLabels[purchase.status]}</p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => onEdit(purchase)}><Pencil className="size-4" /> Edit purchase</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function Detail({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <div className="flex items-center gap-2 text-muted-foreground"><Icon className="size-3.5" /><p className="text-[11px]">{label}</p></div>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  )
}
