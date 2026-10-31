import { Plus, Package, RotateCcw, ShieldCheck, Undo2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { DashboardHeader } from "@/components/layout/DashboardHeader"
import { ActivityFeed } from "@/components/dashboard/ActivityFeed"
import { NeedsAttention } from "@/components/dashboard/NeedsAttention"
import { RecentPurchases } from "@/components/dashboard/RecentPurchases"
import { StatCard } from "@/components/dashboard/StatCard"
import { mockPurchases } from "@/data/mockPurchases"
import { getPurchaseMetrics } from "@/lib/purchaseMetrics"

function App() {
  const metrics = getPurchaseMetrics(mockPurchases)

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="lg:pl-[236px]">
        <DashboardHeader />
        <main className="mx-auto max-w-[1480px] px-5 py-7 sm:px-8 lg:px-12 lg:py-10">
          <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end lg:mb-10">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-warning-foreground">Your purchase companion</p>
              <h1 className="font-heading text-[30px] font-semibold tracking-[-0.05em] text-foreground sm:text-[36px]">Good morning<span className="text-overdue">.</span></h1>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">Stay ahead of your purchases, returns and warranties — all in one place.</p>
            </div>
            <Button className="w-fit rounded-xl bg-[#285D4B] px-4 text-xs text-white shadow-none hover:bg-[#193C32] sm:hidden"><Plus className="size-4" /> Add purchase</Button>
          </section>

          <section aria-label="Purchase summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Total purchases" value={String(metrics.totalPurchases)} detail="All tracked purchases" icon={Package} tone="sage" />
            <StatCard label="Returns closing soon" value={String(metrics.returnWindowsClosingSoon)} detail="Within the next 30 days" icon={RotateCcw} tone="amber" />
            <StatCard label="Active warranties" value={String(metrics.activeWarranties)} detail="Items currently covered" icon={ShieldCheck} tone="neutral" />
            <StatCard label="Returned items" value={String(metrics.returnedPurchases)} detail="Successfully returned" icon={Undo2} tone="terracotta" />
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.42fr)_minmax(300px,0.78fr)]">
            <NeedsAttention purchases={mockPurchases} />
            <ActivityFeed />
          </section>

          <section className="mt-6">
            <RecentPurchases purchases={mockPurchases} />
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
