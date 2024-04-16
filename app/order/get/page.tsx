import { getOrders } from "./actions"
import Client from "./client"

export default async function Order() {
  const orders = await getOrders()
  return <Client orders={orders} />
}
