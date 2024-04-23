import { getSalesrepData, getManagerData } from "./actions"
import Client from "./client"

export default async function Page() {
  const [salesRepData, managerData] = await Promise.all([
    getSalesrepData(),
    getManagerData(),
  ])
  const salesRepDataAndPendingOrders = salesRepData.map((salesRep) => {
    const pendingOrders = salesRep.orders.filter(
      (order) => order.status === "pending"
    )
    return {
      ...salesRep,
      numberOfPendingOrders: pendingOrders.length,
    }
  })
  return (
    <Client
      salesRepDataAndPendingOrders={salesRepDataAndPendingOrders}
      managerData={managerData}
    />
  )
}
