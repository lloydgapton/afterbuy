import { format } from "date-fns"
import { CalendarClock, ChevronRight, ShieldAlert } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getDaysRemaining, getReturnDeadline, getWarrantyExpiry } from "@/lib/purchaseDates"
import type { AttentionKind, Purchase } from "@/types/purchase"

interface AttentionItem {
  purchase: Purchase
  kind: AttentionKind
  deadline: Date
  daysRemaining: number
}

function daysLabel(daysRemaining: number): string {
  if (daysRemaining === 0) return "Due today"
  if (daysRemaining === 1) return "1 day left"
  return `${daysRemaining} days left`
}

export function NeedsAttention({ purchases }: { purchases: Purchase[] }) {
  const items: AttentionItem[] = purchases
    .filter((purchase) => purchase.status !== "returned")
    .flatMap((purchase) => [
      { purchase, kind: "return" as const, deadline: getReturnDeadline(purchase) },
      { purchase, kind: "warranty" as const, deadline: getWarrantyExpiry(purchase) },
    ])
    .map((item) => ({ ...item, daysRemaining: getDaysRemaining(item.deadline) }))
    .filter(({ daysRemaining }) => daysRemaining >= 0 && daysRemaining <= 30)
    .sort((first, second) => first.daysRemaining - second.daysRemaining)

  return (
    <Card className="rounded-2xl bg-card shadow-none ring-1 ring-border">
      <CardHeader className="flex flex-row items-center justify-between px-5 pb-1 sm:px-6">
        <div>
          <CardTitle className="text-[16px] text-foreground">Needs your attention</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">A few things worth checking today</p>
        </div>
        <button type="button" className="text-xs font-medium text-primary hover:underline">View all</button>
      </CardHeader>
      <CardContent className="space-y-2 px-5 pt-4 sm:px-6">
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-background px-4 py-7 text-center">
            <ShieldAlert className="mx-auto size-6 text-success" />
            <p className="mt-2 text-sm font-semibold text-foreground">You are all caught up</p>
            <p className="mt-1 text-xs text-muted-foreground">No returns or warranties need attention soon.</p>
          </div>
        ) : items.map(({ purchase, kind, deadline, daysRemaining }) => {
          const isReturn = kind === "return"
          const statusClasses = "bg-warning/20 text-warning-foreground"
          return (
            <div key={`${purchase.id}-${kind}`} className="flex items-center gap-3 rounded-xl bg-background p-3 sm:p-3.5">
              <div className={`hidden size-9 items-center justify-center rounded-lg sm:flex ${statusClasses}`}>
                {isReturn ? <CalendarClock className="size-4" /> : <ShieldAlert className="size-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-foreground">{purchase.product}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{isReturn ? "Return window closes" : "Warranty expires"} · {format(deadline, "d MMM yyyy")}</p>
              </div>
              <Badge className={statusClasses}>{daysLabel(daysRemaining)}</Badge>
              <ChevronRight className="size-4 text-muted-foreground" />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
