import { format, parseISO } from "date-fns"
import { CalendarPlus, RotateCcw, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockActivity } from "@/data/mockPurchases"

const activityIcons = {
  purchase: CalendarPlus,
  return: RotateCcw,
  warranty: ShieldCheck,
}

const activityColors = {
  purchase: "bg-success/10 text-success",
  return: "bg-warning/20 text-warning-foreground",
  warranty: "bg-overdue/10 text-overdue",
}

export function ActivityFeed() {
  return (
    <Card className="rounded-2xl bg-card shadow-none ring-1 ring-border">
      <CardHeader className="px-5 pb-1 sm:px-6">
        <CardTitle className="text-[16px] text-foreground">Recent activity</CardTitle>
        <p className="mt-1 text-xs text-muted-foreground">Your latest updates</p>
      </CardHeader>
      <CardContent className="px-5 pt-4 sm:px-6">
        <div className="space-y-4">
          {mockActivity.slice(0, 4).map((activity) => {
            const Icon = activityIcons[activity.kind]
            return (
              <div key={activity.id} className="flex gap-3">
                <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${activityColors[activity.kind]}`}><Icon className="size-3.5" /></div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-foreground">{activity.title}</p>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{activity.description}</p>
                </div>
                <time className="shrink-0 text-[10px] text-muted-foreground">{format(parseISO(activity.date), "d MMM")}</time>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
