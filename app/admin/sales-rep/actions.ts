"use server"
import prisma from "@/lib/db"

import { revalidatePath } from "next/cache"

export async function getSalesrepData() {
  const salesReps = await prisma.user.findMany({
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

  return salesReps
}

export async function toggleIsManagerAction(formData: FormData) {
  const salesRepId = formData.get("id") as string
  const isManager = formData.get("isManager") as string
  console.log(salesRepId, isManager)
  await prisma.user.update({
    where: { id: salesRepId },
    data: {
      isManager: isManager === null,
    },
  })

  revalidatePath("/admin/sales-rep")
}
