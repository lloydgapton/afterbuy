import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PurchaseForm } from "@/components/purchases/PurchaseForm"
import type { Purchase } from "@/types/purchase"
import type { PurchaseFormValues } from "@/lib/purchaseSchema"

interface PurchaseDialogProps {
  open: boolean
  purchase?: Purchase | null
  onOpenChange: (open: boolean) => void
  onSubmit: (values: PurchaseFormValues) => void
}

export function PurchaseDialog({ open, purchase, onOpenChange, onSubmit }: PurchaseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{purchase ? "Edit purchase" : "Add purchase"}</DialogTitle>
          <DialogDescription>
            {purchase ? "Update the details for this purchase." : "Keep your purchase details and deadlines in one place."}
          </DialogDescription>
        </DialogHeader>
        <PurchaseForm purchase={purchase} onSubmit={onSubmit} onCancel={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
