import { format, parseISO } from "date-fns"
import { ArrowUpRight, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Purchase } from "@/types/purchase"

const accentClasses = {
  sage: "bg-success/10 text-success",
  amber: "bg-warning/20 text-warning-foreground",
  terracotta: "bg-overdue/10 text-overdue",
  ink: "bg-secondary text-secondary-foreground",
}

export function RecentPurchases({ purchases }: { purchases: Purchase[] }) {
  return (
    <Card className="rounded-2xl bg-card shadow-none ring-1 ring-border">
      <CardHeader className="flex flex-row items-center justify-between px-5 pb-2 sm:px-6">
        <div>
          <CardTitle className="text-[16px] text-foreground">Recent purchases</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">Your latest tracked items</p>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-primary hover:bg-secondary">See all <ArrowUpRight className="size-3.5" /></Button>
      </CardHeader>
      <CardContent className="px-0 pt-2">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="pl-5 text-[10px] uppercase tracking-[0.1em] text-muted-foreground sm:pl-6">Item</TableHead>
              <TableHead className="hidden text-[10px] uppercase tracking-[0.1em] text-muted-foreground md:table-cell">Retailer</TableHead>
              <TableHead className="hidden text-[10px] uppercase tracking-[0.1em] text-muted-foreground sm:table-cell">Purchased</TableHead>
              <TableHead className="text-right text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Price</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.slice(0, 4).map((purchase) => (
              <TableRow key={purchase.id} className="border-border hover:bg-background">
                <TableCell className="max-w-[180px] pl-5 sm:pl-6">
                  <div className="flex items-center gap-2.5">
                    <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${accentClasses[purchase.accent]}`}>
                      {purchase.product.split(" ").slice(0, 2).map((word) => word[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-semibold text-foreground">{purchase.product}</p>
                      <p className="truncate text-[11px] text-muted-foreground md:hidden">{purchase.retailer}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden text-xs text-muted-foreground md:table-cell">{purchase.retailer}</TableCell>
                <TableCell className="hidden text-xs text-muted-foreground sm:table-cell">{format(parseISO(purchase.purchaseDate), "d MMM yyyy")}</TableCell>
                <TableCell className="text-right text-xs font-semibold text-foreground">₦{purchase.price.toLocaleString("en-NG")}</TableCell>
                <TableCell className="pr-3 sm:pr-5"><Button variant="ghost" size="icon-xs" aria-label={`More options for ${purchase.product}`}><MoreHorizontal className="size-4 text-muted-foreground" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
