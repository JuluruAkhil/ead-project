import prisma from "@/lib/db"

export async function getSalesrepOrders(salesRepId) {
  const orders = await prisma.order.findMany({
    where: { salesRepId },
    include: {
      salesRep: {
        select: {
          email: true,
          managerId: true,
        },
      },
      customer: { select: { name: true } },
      item: { select: { name: true } },
    },
  })
  return orders
}

export async function getSalesrepData(salesRepId) {
  const salesRep = await prisma.user.findUnique({
    where: { id: salesRepId },
  })
  return salesRep
}
