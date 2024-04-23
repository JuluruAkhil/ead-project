import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import prisma from "@/lib/db"
import { redirect } from "next/navigation"
import { getIdfromEmail } from "@/lib/actions"

export async function getManagerData() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  //   for a given manager get all the salesrep under him and their pending orders
  const managersWithEmployeesPendingOrders = await prisma.user.findMany({
    where: {
      isManager: true, // Only get managers
    },
    select: {
      name: true,
      email: true,
      employees: {
        select: {
          name: true,
          email: true,
          orders: {
            where: {
              status: "pending", // Get only pending orders
            },
            select: {
              id: true,
            },
          },
        },
      },
    },
  })

  // Transform the data to get pending orders per manager and per employee
  const result = managersWithEmployeesPendingOrders.map((manager) => {
    // Get total number of pending orders under the manager
    const totalPendingOrders = manager.employees.reduce(
      (total, employee) => total + employee.orders.length,
      0
    )

    const salesRepsWithPendingOrders = manager.employees.map((employee) => ({
      salesRepName: employee.name,
      salesRepEmail: employee.email,
      numberOfPendingOrders: employee.orders.length,
    }))

    return {
      managerName: manager.name,
      managerEmail: manager.email,
      totalPendingOrders,
      salesRepsWithPendingOrders,
    }
  })

  return result
}

export async function getSalesrepData() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const salesRepsAndOrders = await prisma.user.findMany({
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
