import { useRef, useState } from "react"
import type { MouseEvent } from "react"
import {
  BarChart3,
  CalendarClock,
  LayoutDashboard,
  Menu,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "cn"

const navigation = [
  { label: "Overview", href: "#overview", icon: LayoutDashboard },
  { label: "My Purchases", href: "#purchases", icon: Package },
  { label: "Deadlines", href: "#deadlines", icon: CalendarClock },
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

type NavigationHandler = (href: string, event: MouseEvent<HTMLAnchorElement>) => void

function Navigation({ onNavigate }: { onNavigate?: NavigationHandler }) {
  const [active, setActive] = useState("Overview")

  return (
    <nav aria-label="Main navigation" className="space-y-1.5">
      <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
        Workspace
      </p>
      {navigation.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          aria-current={active === label ? "location" : undefined}
          onClick={(event) => {
            setActive(label)
            onNavigate?.(href, event)
          }}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9B35B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#193C32]",
            active === label
              ? "bg-white/10 text-white"
              : "text-white/55 hover:bg-white/6 hover:text-white",
          )}
        >
          <Icon className={cn("size-[17px]", active === label && "text-[#E9B35B]")} />
          {label}
        </a>
      ))}
    </nav>
  )
}

function SidebarContent({ onNavigate }: { onNavigate?: NavigationHandler }) {
  return (
    <div className="flex h-full flex-col px-5 py-6">
      <Brand />
      <div className="mt-12">
        <Navigation onNavigate={onNavigate} />
      </div>
      <div className="mt-auto border-t border-white/10 px-3 pt-5">
        <p className="text-[11px] font-medium text-white/40">Local workspace</p>
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
  const [open, setOpen] = useState(false)
  const pendingNavigationRef = useRef<string | null>(null)

  function handleMobileNavigate(href: string, event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    pendingNavigationRef.current = href
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-[#193C32] lg:hidden" aria-label="Open navigation">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[270px] border-none bg-[#193C32] p-0 text-white"
        onCloseAutoFocus={(event) => {
          const pendingHref = pendingNavigationRef.current
          if (!pendingHref) return

          event.preventDefault()
          requestAnimationFrame(() => {
            const target = document.getElementById(pendingHref.slice(1))
            pendingNavigationRef.current = null
            if (!target) return

            window.history.pushState(null, "", pendingHref)
            target.focus({ preventScroll: true })
            target.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
              block: "start",
            })
          })
        }}
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">Navigate to sections of your AfterBuy dashboard.</SheetDescription>
        <SidebarContent onNavigate={handleMobileNavigate} />
      </SheetContent>
    </Sheet>
  )
}
