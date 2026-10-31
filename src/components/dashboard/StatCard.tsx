import type { LucideIcon } from "lucide-react"
import { ArrowUpRight } from "lucide-react"
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
  sage: "bg-[#EAF2ED] text-[#285D4B]",
  amber: "bg-[#FBF2DF] text-[#A66E17]",
  terracotta: "bg-[#F9E8E3] text-[#B9523F]",
  neutral: "bg-[#EFF1ED] text-[#60716A]",
}

export function StatCard({ label, value, detail, icon: Icon, tone }: StatCardProps) {
  return (
    <Card className="gap-5 rounded-2xl bg-white p-5 shadow-none ring-1 ring-[#E5E9E3] sm:p-6">
      <div className="flex items-start justify-between">
        <div className={cn("flex size-9 items-center justify-center rounded-xl", toneClasses[tone])}>
          <Icon className="size-[17px]" />
        </div>
        <ArrowUpRight className="size-4 text-[#B1BBB5]" />
      </div>
      <div>
        <p className="text-[12px] font-medium text-[#84918A]">{label}</p>
        <p className="mt-1 font-heading text-[28px] font-semibold tracking-[-0.05em] text-[#193C32]">{value}</p>
        <p className="mt-1 text-[11px] text-[#84918A]">{detail}</p>
      </div>
    </Card>
  )
}
