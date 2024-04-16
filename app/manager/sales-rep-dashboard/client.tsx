/**
 * v0 by Vercel.
 * @see https://v0.dev/t/demFVwS8nys
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table"

export default function Client({ salesRepDataAndPendingOrders }) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle>Sales Rep Dashboard</CardTitle>
            {/* <Link href="/order/new">
              <Button
                className="w-8 h-8 rounded-full"
                size="icon"
                variant="outline"
              >
                <PlusIcon className="h-4 w-4" />
                <span className="sr-only">New order</span>
              </Button>
            </Link> */}
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Sales Rep Id</TableHead>
                    <TableHead>Sales Rep Email</TableHead>
                    <TableHead>Pending Orders</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesRepDataAndPendingOrders.map((salesRep) => (
                    <TableRow key={salesRep.id} className="divide-y">
                      <TableCell className="font-semibold">
                        {salesRep.id}
                      </TableCell>
                      <TableCell>{salesRep.email}</TableCell>
                      <TableCell>{salesRep.numberOfPendingOrders}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/manager/sales-rep/${salesRep.id}`}>
                          <Button
                            className="rounded-full"
                            size="icon"
                            variant="outline"
                          >
                            <ChevronRightIcon className="w-4 h-4" />
                            <span className="sr-only">Details</span>
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
