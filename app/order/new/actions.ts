"use server"

import prisma from "@/lib/db"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { getIdfromEmail } from "@/lib/actions"

export async function getItems() {
  const items = await prisma.item.findMany()
  return items
}

export async function getCustomers() {
  const customers = await prisma.customer.findMany()
  return customers
}

export async function createSalesOrder(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const salesRepId = await getIdfromEmail(session.user.email)
  const customerId = formData.get("customer") as string
  const itemId = formData.get("item") as string
  const price = formData.get("price") as string
  const quantity = formData.get("quantity") as string

  await prisma.order.create({
    data: {
      salesRepId,
      customerId,
      itemId,
      pricePerItem: parseFloat(price),
      itemQuantity: parseFloat(quantity),
      status: "pending",
    },
  })

  redirect("/")
}
