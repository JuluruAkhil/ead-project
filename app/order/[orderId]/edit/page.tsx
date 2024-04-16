import Client from "./client"
import {
  getOrder,
  getItems,
  getCustomers,
  getSalesReps,
  editAction,
  isLoggedInManager,
} from "./actions"

export default async function Page({ params }) {
  const [order, items, customers, salesReps, isManager] = await Promise.all([
    getOrder(params.orderId),
    getItems(),
    getCustomers(),
    getSalesReps(),
    isLoggedInManager(),
  ])

  return (
    <Client
      order={order}
      items={items}
      customers={customers}
      salesReps={salesReps}
      editAction={editAction}
      isManager={isManager}
    />
  )
}
