"use server"
import prisma from "@/lib/db"

import { revalidatePath } from "next/cache"

export async function getManagerData(managerId) {
  const manager = await prisma.user.findFirst({
    where: { id: managerId },
    select: {
      id: true,
      email: true,
    },
  })
  return manager
}

export async function getSalesRepsData(managerId) {
  const salesRep = await prisma.user.findMany({
    where: {
      OR: [{ managerId }, { managerId: null }],
      AND: {
        NOT: {
          id: managerId,
        },
        isManager: false,
      },
    },
    include: {
      orders: {
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
    orderBy: {
      id: "asc",
    },
  })

  return salesRep
}

export async function toggleManagerAction(formData: FormData) {
  const salesRepId = formData.get("salesRepId") as string
  const managerId = formData.get("managerId") as string
  const toggleManager = formData.get("toggleManager") as string
  console.log(formData)
  await prisma.user.update({
    where: { id: salesRepId },
    data: {
      managerId: toggleManager !== null ? null : managerId,
    },
  })

  revalidatePath(`/admin/sales-rep/${salesRepId}`)
}
