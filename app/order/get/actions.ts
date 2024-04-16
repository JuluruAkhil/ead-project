import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/db"
import { redirect } from "next/navigation"
import { getIdfromEmail } from "@/lib/actions"

export async function getOrders() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const salesRepId = await getIdfromEmail(session.user.email)
  const orders = await prisma.order.findMany({
    where: { salesRepId },
    include: {
      customer: { select: { name: true } },
      item: { select: { name: true } },
    },
  })
  return orders
}
