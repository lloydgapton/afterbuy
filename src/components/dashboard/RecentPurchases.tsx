import { compareAsc, compareDesc, format, parseISO } from "date-fns"
import { useState } from "react"
import { Eye, ListFilter, MoreHorizontal, Pencil, Search, Trash2, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Purchase, PurchaseStatus } from "@/types/purchase"

const accentClasses = {
  sage: "bg-success/10 text-success",
  amber: "bg-warning/20 text-warning-foreground",
  terracotta: "bg-overdue/10 text-overdue",
  ink: "bg-secondary text-secondary-foreground",
}

interface RecentPurchasesProps {
  purchases: Purchase[]
  onView: (purchase: Purchase) => void
  onEdit: (purchase: Purchase) => void
  onDelete: (purchase: Purchase) => void
}

type StatusFilter = "all" | PurchaseStatus
type SortOrder = "newest" | "oldest"

const statusLabels: Record<PurchaseStatus, string> = {
  considering: "Considering",
  kept: "Kept",
  returned: "Returned",
  claim_open: "Warranty claim",
}

export function RecentPurchases({ purchases, onView, onEdit, onDelete }: RecentPurchasesProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest")
  const normalizedSearch = search.trim().toLowerCase()
  const filteredPurchases = [...purchases]
    .filter((purchase) => {
      const matchesSearch = normalizedSearch.length === 0
        || purchase.product.toLowerCase().includes(normalizedSearch)
        || purchase.retailer.toLowerCase().includes(normalizedSearch)
      const matchesStatus = statusFilter === "all" || purchase.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((first, second) => sortOrder === "newest"
      ? compareDesc(parseISO(first.purchaseDate), parseISO(second.purchaseDate))
      : compareAsc(parseISO(first.purchaseDate), parseISO(second.purchaseDate)))
  function clearFilters() {
    setSearch("")
    setStatusFilter("all")
    setSortOrder("newest")
  }

  return (
    <Card className="rounded-2xl bg-card shadow-none ring-1 ring-border">
      <CardHeader className="px-5 pb-2 sm:px-6">
        <div>
          <CardTitle className="text-[16px] text-foreground">My purchases</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">Search and manage your tracked items</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pt-2 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search product or retailer"
              aria-label="Search purchases by product or retailer"
              className="pl-9 pr-9"
            />
            {search && <Button type="button" variant="ghost" size="icon-xs" onClick={() => setSearch("")} className="absolute right-1 top-1/2 -translate-y-1/2" aria-label="Clear search"><X /></Button>}
          </div>
          <div className="grid grid-cols-2 gap-3 lg:w-[340px]">
            <div className="relative">
              <ListFilter className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
                <SelectTrigger className="w-full pl-9" aria-label="Filter purchases by status"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {(Object.keys(statusLabels) as PurchaseStatus[]).map((status) => <SelectItem key={status} value={status}>{statusLabels[status]}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
              <SelectTrigger className="w-full" aria-label="Sort purchases by purchase date"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {purchases.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-background px-4 py-8 text-center">
            <p className="text-sm font-semibold text-foreground">No purchases yet</p>
            <p className="mt-1 text-xs text-muted-foreground">Add a purchase to start tracking it here.</p>
          </div>
        ) : filteredPurchases.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-background px-4 py-8 text-center">
            <p className="text-sm font-semibold text-foreground">No purchases found</p>
            <p className="mt-1 text-xs text-muted-foreground">Try a different search or status filter.</p>
            <Button type="button" variant="outline" size="sm" onClick={clearFilters} className="mt-4">Clear filters</Button>
          </div>
        ) : <Table>
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
            {filteredPurchases.map((purchase) => (
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
                <TableCell className="pr-3 sm:pr-5"><PurchaseActions purchase={purchase} onView={onView} onEdit={onEdit} onDelete={onDelete} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>}
      </CardContent>
    </Card>
  )
}

interface PurchaseActionsProps {
  purchase: Purchase
  onView: (purchase: Purchase) => void
  onEdit: (purchase: Purchase) => void
  onDelete: (purchase: Purchase) => void
}

function PurchaseActions({ purchase, onView, onEdit, onDelete }: PurchaseActionsProps) {
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-xs" aria-label={`More options for ${purchase.product}`}><MoreHorizontal className="size-4 text-muted-foreground" /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => onView(purchase)}><Eye /> View details</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onEdit(purchase)}><Pencil /> Edit purchase</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onSelect={() => setDeleteOpen(true)}><Trash2 /> Delete purchase</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this purchase?</AlertDialogTitle>
            <AlertDialogDescription>This will remove {purchase.product} from your dashboard. This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={() => onDelete(purchase)}>Delete purchase</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
