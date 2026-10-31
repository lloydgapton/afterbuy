import { Bell, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileSidebar } from "@/components/layout/AppSidebar"

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between border-b border-[#E2E6DF] px-5 py-4 sm:px-8 lg:px-12 lg:py-5">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <div>
          <p className="hidden text-xs font-medium text-[#84918A] sm:block">Thursday, 30 October 2026</p>
          <p className="text-sm font-semibold text-[#193C32] sm:hidden">Overview</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative text-[#60716A]" aria-label="View notifications">
          <Bell className="size-[18px]" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#D96C55]" />
        </Button>
        <Button className="hidden rounded-xl bg-[#285D4B] px-4 text-xs text-white shadow-none hover:bg-[#193C32] sm:inline-flex">
          <Plus className="size-4" /> Add purchase
        </Button>
        <div className="flex size-8 items-center justify-center rounded-full bg-[#D7E6D9] text-[10px] font-bold text-[#285D4B] sm:hidden">AM</div>
      </div>
    </header>
  )
}
