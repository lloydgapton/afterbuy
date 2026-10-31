import { Plus } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { MobileSidebar } from "@/components/layout/AppSidebar"

const currentDateLabel = format(new Date(), "EEEE, d MMMM yyyy")

export function DashboardHeader({ onAddPurchase }: { onAddPurchase: () => void }) {
  return (
    <header className="flex items-center justify-between border-b border-[#E2E6DF] px-5 py-4 sm:px-8 lg:px-12 lg:py-5">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <div>
          <p className="hidden text-xs font-medium text-[#84918A] sm:block">{currentDateLabel}</p>
          <p className="text-sm font-semibold text-[#193C32] sm:hidden">Overview</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={onAddPurchase} className="hidden rounded-xl bg-[#285D4B] px-4 text-xs text-white shadow-none hover:bg-[#193C32] sm:inline-flex">
          <Plus className="size-4" /> Add purchase
        </Button>
      </div>
    </header>
  )
}
