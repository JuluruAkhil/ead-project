import { getSalesrepData, getSalesrepOrders } from "./actions"
import Client from "./client"

export default async function Page({ params }) {
  const [salesRepData, orders] = await Promise.all([
    getSalesrepData(params.salesRepId),
    getSalesrepOrders(params.salesRepId),
  ])
  return <Client salesRepData={salesRepData} orders={orders} />
}
