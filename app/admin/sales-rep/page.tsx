import { getSalesrepData, toggleIsManagerAction } from "./actions"
import Client from "./client"

export default async function Page() {
  const salesRepData = await getSalesrepData()
  return (
    <Client
      toggleIsManagerAction={toggleIsManagerAction}
      salesRepData={salesRepData}
    />
  )
}
