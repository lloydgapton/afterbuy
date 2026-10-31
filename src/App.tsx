import { useEffect, useState } from "react"
import { Plus, Package, RotateCcw, ShieldCheck, Undo2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { DashboardHeader } from "@/components/layout/DashboardHeader"
import { ActivityFeed } from "@/components/dashboard/ActivityFeed"
import { NeedsAttention } from "@/components/dashboard/NeedsAttention"
import { RecentPurchases } from "@/components/dashboard/RecentPurchases"
import { StatCard } from "@/components/dashboard/StatCard"
import { mockPurchases } from "@/data/mockPurchases"
import { mockActivity } from "@/data/mockPurchases"
import { getPurchaseMetrics } from "@/lib/purchaseMetrics"
import { ACTIVITIES_STORAGE_KEY, loadFromStorage, PURCHASES_STORAGE_KEY, saveToStorage } from "@/lib/storage"
import { PurchaseDialog } from "@/components/purchases/PurchaseDialog"
import { PurchaseDetails } from "@/components/purchases/PurchaseDetails"
import type { PurchaseFormValues } from "@/lib/purchaseSchema"
import type { ActivityItem, Purchase } from "@/types/purchase"

function createActivity(purchase: Purchase, title: string, kind: ActivityItem["kind"]): ActivityItem {
  return {
    id: crypto.randomUUID(),
    title,
    description: `${purchase.product} - ${purchase.retailer}`,
    date: new Date().toISOString(),
    kind,
  }
}

const statusActivity = {
  considering: { title: "Purchase marked as considering", kind: "purchase" },
  kept: { title: "Purchase marked as kept", kind: "purchase" },
  returned: { title: "Purchase returned", kind: "return" },
  claim_open: { title: "Warranty claim initiated", kind: "warranty" },
} satisfies Record<Purchase["status"], { title: string; kind: ActivityItem["kind"] }>

function App() {
  const [purchases, setPurchases] = useState<Purchase[]>(() => loadFromStorage(PURCHASES_STORAGE_KEY, mockPurchases))
  const [activities, setActivities] = useState<ActivityItem[]>(() => loadFromStorage(ACTIVITIES_STORAGE_KEY, mockActivity))
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false)
  const [editingPurchase, setEditingPurchase] = useState<Purchase | null>(null)
  const [detailsPurchase, setDetailsPurchase] = useState<Purchase | null>(null)
  const metrics = getPurchaseMetrics(purchases)

  useEffect(() => {
    saveToStorage(PURCHASES_STORAGE_KEY, purchases)
  }, [purchases])

  useEffect(() => {
    saveToStorage(ACTIVITIES_STORAGE_KEY, activities)
  }, [activities])

  function openCreateDialog() {
    setEditingPurchase(null)
    setPurchaseDialogOpen(true)
  }

  function openEditDialog(purchase: Purchase) {
    setDetailsPurchase(null)
    setEditingPurchase(purchase)
    setPurchaseDialogOpen(true)
  }

  function handlePurchaseSubmit(values: PurchaseFormValues) {
    if (editingPurchase) {
      const updatedPurchase = { ...editingPurchase, ...values }
      setPurchases((currentPurchases) => currentPurchases.map((purchase) => purchase.id === editingPurchase.id ? updatedPurchase : purchase))
      const activity = editingPurchase.status === updatedPurchase.status
        ? createActivity(updatedPurchase, "Purchase updated", "purchase")
        : createActivity(updatedPurchase, statusActivity[updatedPurchase.status].title, statusActivity[updatedPurchase.status].kind)
      setActivities((currentActivities) => [activity, ...currentActivities])
      toast.success("Purchase successfully updated")
    } else {
      const newPurchase: Purchase = { ...values, id: crypto.randomUUID(), accent: "sage" }
      setPurchases((currentPurchases) => [...currentPurchases, newPurchase])
      setActivities((currentActivities) => [createActivity(newPurchase, "Purchase added", "purchase"), ...currentActivities])
      toast.success("Purchase successfully added")
    }
    setPurchaseDialogOpen(false)
    setEditingPurchase(null)
  }

  function handleDeletePurchase(purchase: Purchase) {
    setPurchases((currentPurchases) => currentPurchases.filter((item) => item.id !== purchase.id))
    setActivities((currentActivities) => [createActivity(purchase, "Purchase deleted", "purchase"), ...currentActivities])
    setDetailsPurchase(null)
    toast.success("Purchase successfully deleted")
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <AppSidebar />
      <div className="lg:pl-[236px]">
        <DashboardHeader onAddPurchase={openCreateDialog} />
        <main id="overview" className="mx-auto max-w-[1480px] scroll-mt-8 px-5 py-7 sm:px-8 lg:px-12 lg:py-10">
          <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end lg:mb-10">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-warning-foreground">Your purchase companion</p>
              <h1 className="font-heading text-[30px] font-semibold tracking-[-0.05em] text-foreground sm:text-[36px]">Good morning<span className="text-overdue">.</span></h1>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">Stay ahead of your purchases, returns and warranties — all in one place.</p>
            </div>
            <Button onClick={openCreateDialog} className="w-fit rounded-xl bg-[#285D4B] px-4 text-xs text-white shadow-none hover:bg-[#193C32] sm:hidden"><Plus className="size-4" /> Add purchase</Button>
          </section>

          <section aria-label="Purchase summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Total purchases" value={String(metrics.totalPurchases)} detail="All tracked purchases" icon={Package} tone="sage" />
            <StatCard label="Returns closing soon" value={String(metrics.returnWindowsClosingSoon)} detail="Within the next 30 days" icon={RotateCcw} tone="amber" />
            <StatCard label="Active warranties" value={String(metrics.activeWarranties)} detail="Items currently covered" icon={ShieldCheck} tone="neutral" />
            <StatCard label="Returned items" value={String(metrics.returnedPurchases)} detail="Successfully returned" icon={Undo2} tone="terracotta" />
          </section>

          <section id="deadlines" className="mt-6 grid scroll-mt-8 gap-6 xl:grid-cols-[minmax(0,1.42fr)_minmax(300px,0.78fr)]">
            <NeedsAttention purchases={purchases} />
            <div id="activity" className="scroll-mt-8"><ActivityFeed activities={activities} /></div>
          </section>

          <section id="purchases" className="mt-6 scroll-mt-8">
            <RecentPurchases purchases={purchases} onView={setDetailsPurchase} onEdit={openEditDialog} onDelete={handleDeletePurchase} />
          </section>
        </main>
      </div>
      <PurchaseDialog
        open={purchaseDialogOpen}
        purchase={editingPurchase}
        onOpenChange={(open) => {
          setPurchaseDialogOpen(open)
          if (!open) setEditingPurchase(null)
        }}
        onSubmit={handlePurchaseSubmit}
      />
      <PurchaseDetails purchase={detailsPurchase} onOpenChange={(open) => { if (!open) setDetailsPurchase(null) }} onEdit={openEditDialog} />
    </div>
  )
}

export default App
