/**
 * v0 by Vercel.
 * @see https://v0.dev/t/demFVwS8nys
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Switch } from "@/components/ui/switch"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table"

export default function Client({
  salesRepData,
  toggleManagerAction,
  managerData,
}) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle>Sales Rep List of manager {managerData.email}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Sales Rep Id</TableHead>
                    <TableHead>Sales Rep Email</TableHead>
                    <TableHead>Is Managed By This Manager</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesRepData.map((salesRep) => (
                    <TableRow key={salesRep.id} className="divide-y">
                      <TableCell className="font-semibold">
                        {salesRep.id}
                      </TableCell>
                      <TableCell>{salesRep.email}</TableCell>
                      <TableCell>
                        <form action={toggleManagerAction}>
                          <input
                            type="text"
                            value={salesRep.id}
                            name="salesRepId"
                            hidden
                          />
                          <input
                            type="text"
                            value={managerData.id}
                            name="managerId"
                            hidden
                          />
                          <Switch
                            checked={salesRep.managerId !== null}
                            type="submit"
                            name="toggleManager"
                            value={salesRep.managerId}
                          />
                        </form>
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
