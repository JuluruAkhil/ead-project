import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/db"
import { redirect } from "next/navigation"
import { getIdfromEmail } from "@/lib/actions"

export async function getSalesrepData() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  //   for a given manager get all the salesrep under him and their pending orders
  const managerId = await getIdfromEmail(session.user.email)
  const salesRepsAndOrders = await prisma.user.findMany({
    where: {
      managerId: managerId,
    },
    include: {
      orders: {
        where: {
          status: "pending",
        },
        select: {
          id: true,
          item: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
          pricePerItem: true,
          itemQuantity: true,
          status: true,
        },
      },
    },
  })

  return salesRepsAndOrders
}
