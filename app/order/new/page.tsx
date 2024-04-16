import Client from "./client"
import { getItems, getCustomers, createSalesOrder } from "./actions"

export default async function Page() {
  // resolve bot awaits together
  const [items, customers] = await Promise.all([getItems(), getCustomers()])
  return (
    <Client
      items={items}
      customers={customers}
      createSalesOrder={createSalesOrder}
    />
  )
}
