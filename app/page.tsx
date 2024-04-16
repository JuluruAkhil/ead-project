import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { isManagerFromEmail } from "@/lib/actions"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    const isManager = await isManagerFromEmail(session.user.email)
    if (isManager) {
      redirect("/manager/sales-rep-dashboard")
    } else {
      redirect("/order/get")
    }
  } else {
    redirect("/login")
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hi
    </main>
  )
}
