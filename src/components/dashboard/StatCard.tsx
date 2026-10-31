import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "cn"

interface StatCardProps {
  label: string
  value: string
  detail: string
  icon: LucideIcon
  tone: "sage" | "amber" | "terracotta" | "neutral"
}

const toneClasses = {
  sage: "bg-success/10 text-success",
  amber: "bg-warning/20 text-warning-foreground",
  terracotta: "bg-overdue/10 text-overdue",
  neutral: "bg-secondary text-secondary-foreground",
}

export function StatCard({ label, value, detail, icon: Icon, tone }: StatCardProps) {
  return (
    <Card className="gap-5 rounded-2xl bg-card p-5 shadow-none ring-1 ring-border sm:p-6">
      <div className="flex items-start justify-between">
        <div className={cn("flex size-9 items-center justify-center rounded-xl", toneClasses[tone])}>
          <Icon className="size-[17px]" />
        </div>
      </div>
      <div>
        <p className="text-[12px] font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 font-heading text-[28px] font-semibold tracking-[-0.05em] text-foreground">{value}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">{detail}</p>
      </div>
    </Card>
  )
}
