import { useState } from "react"
import {
  Activity,
  BarChart3,
  ChevronDown,
  CircleHelp,
  LayoutDashboard,
  Package,
  RotateCcw,
  Settings,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "cn"

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "My Purchases", icon: Package },
  { label: "Return Windows", icon: RotateCcw },
  { label: "Warranties", icon: ShieldCheck },
  { label: "Activity", icon: Activity },
]

function Brand() {
  return (
    <div className="flex items-center gap-3 px-1">
      <div className="flex size-9 items-center justify-center rounded-xl bg-[#E9B35B] text-[#193C32]">
        <BarChart3 className="size-5 stroke-[2.5]" />
      </div>
      <span className="font-heading text-[20px] font-semibold tracking-[-0.04em] text-white">
        afterbuy<span className="text-[#E9B35B]">.</span>
      </span>
    </div>
  )
}

function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  const [active, setActive] = useState("Overview")

  return (
    <nav aria-label="Main navigation" className="space-y-1.5">
      <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
        Workspace
      </p>
      {navigation.map(({ label, icon: Icon }) => (
        <button
          key={label}
          type="button"
          onClick={() => {
            setActive(label)
            onNavigate?.()
          }}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-colors",
            active === label
              ? "bg-white/10 text-white"
              : "text-white/55 hover:bg-white/6 hover:text-white",
          )}
        >
          <Icon className={cn("size-[17px]", active === label && "text-[#E9B35B]")} />
          {label}
        </button>
      ))}
    </nav>
  )
}

function SidebarContent() {
  return (
    <div className="flex h-full flex-col px-5 py-6">
      <Brand />
      <div className="mt-12">
        <Navigation />
      </div>
      <div className="mt-auto space-y-2">
        <button type="button" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/55 hover:bg-white/6 hover:text-white">
          <CircleHelp className="size-[17px]" /> Help centre
        </button>
        <button type="button" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/55 hover:bg-white/6 hover:text-white">
          <Settings className="size-[17px]" /> Settings
        </button>
        <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
          <div className="flex size-9 items-center justify-center rounded-full bg-[#D7E6D9] text-xs font-bold text-[#285D4B]">AM</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-white">Alex Morgan</p>
            <p className="truncate text-[11px] text-white/40">Personal account</p>
          </div>
          <ChevronDown className="size-4 text-white/35" />
        </div>
      </div>
    </div>
  )
}

export function AppSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-[236px] bg-[#193C32] lg:block">
      <SidebarContent />
    </aside>
  )
}

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-[#193C32] lg:hidden" aria-label="Open navigation">
          <LayoutDashboard className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[270px] border-none bg-[#193C32] p-0 text-white">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SidebarContent />
      </SheetContent>
    </Sheet>
  )
}
