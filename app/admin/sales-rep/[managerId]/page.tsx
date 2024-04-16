import {
  getSalesRepsData,
  toggleManagerAction,
  getManagerData,
} from "./actions"
import Client from "./client"

export default async function Page({ params }) {
  const [salesRepData, managerData] = await Promise.all([
    getSalesRepsData(params.managerId),
    getManagerData(params.managerId),
  ])
  return (
    <Client
      toggleManagerAction={toggleManagerAction}
      salesRepData={salesRepData}
      managerData={managerData}
    />
  )
}
