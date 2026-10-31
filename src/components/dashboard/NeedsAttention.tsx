import { differenceInCalendarDays, format } from "date-fns"
import { CalendarClock, ChevronRight, ShieldAlert } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getReturnDeadline, getWarrantyExpiry } from "@/data/mockPurchases"
import type { AttentionKind, Purchase } from "@/types/purchase"

interface AttentionItem {
  purchase: Purchase
  kind: AttentionKind
  date: Date
  days: number
}

export function NeedsAttention({ purchases }: { purchases: Purchase[] }) {
  const today = new Date("2026-10-30")
  const items: AttentionItem[] = [
    { purchase: purchases[0], kind: "return", date: getReturnDeadline(purchases[0]), days: differenceInCalendarDays(getReturnDeadline(purchases[0]), today) },
    { purchase: purchases[1], kind: "warranty", date: getWarrantyExpiry(purchases[1]), days: differenceInCalendarDays(getWarrantyExpiry(purchases[1]), today) },
    { purchase: purchases[2], kind: "warranty", date: getWarrantyExpiry(purchases[2]), days: differenceInCalendarDays(getWarrantyExpiry(purchases[2]), today) },
  ]

  return (
    <Card className="rounded-2xl bg-white shadow-none ring-1 ring-[#E5E9E3]">
      <CardHeader className="flex flex-row items-center justify-between px-5 pb-1 sm:px-6">
        <div>
          <CardTitle className="text-[16px] text-[#193C32]">Needs your attention</CardTitle>
          <p className="mt-1 text-xs text-[#84918A]">A few things worth checking today</p>
        </div>
        <button type="button" className="text-xs font-medium text-[#285D4B] hover:underline">View all</button>
      </CardHeader>
      <CardContent className="space-y-2 px-5 pt-4 sm:px-6">
        {items.map(({ purchase, kind, date, days }) => {
          const isReturn = kind === "return"
          return (
            <div key={`${purchase.id}-${kind}`} className="flex items-center gap-3 rounded-xl bg-[#FAFBF8] p-3 sm:p-3.5">
              <div className={`hidden size-9 items-center justify-center rounded-lg sm:flex ${isReturn ? "bg-[#FBF2DF] text-[#A66E17]" : "bg-[#F9E8E3] text-[#B9523F]"}`}>
                {isReturn ? <CalendarClock className="size-4" /> : <ShieldAlert className="size-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-[#193C32]">{purchase.product}</p>
                <p className="mt-0.5 text-[11px] text-[#84918A]">{isReturn ? "Return window" : "Warranty"} · {format(date, "d MMM yyyy")}</p>
              </div>
              <Badge className={isReturn ? "bg-[#FBF2DF] text-[#A66E17] hover:bg-[#FBF2DF]" : "bg-[#F9E8E3] text-[#B9523F] hover:bg-[#F9E8E3]"}>
                {days <= 30 ? `${days} days` : `${Math.round(days / 30)} months`}
              </Badge>
              <ChevronRight className="size-4 text-[#B1BBB5]" />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
