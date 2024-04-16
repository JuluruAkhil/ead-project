"use server"

import { authOptions } from "@/lib/authOptions"
import { isManagerFromEmail } from "@/lib/actions"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { stat } from "fs"

export async function getItems() {
  const items = await prisma.item.findMany({
    select: {
      id: true,
      name: true,
    },
  })
  return items
}

export async function getCustomers() {
  const customers = await prisma.customer.findMany({
    select: {
      id: true,
      name: true,
    },
  })
  return customers
}

export async function getSalesReps() {
  const salesReps = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
    },
  })
  return salesReps
}

export async function getOrder(orderId) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      salesRep: {
        select: {
          id: true,
          email: true,
          managerId: true,
        },
      },
      customer: { select: { name: true } },
      item: { select: { name: true } },
    },
  })
  return order
}

export async function isLoggedInManager() {
  const session = await getServerSession(authOptions)
  const isManager = await isManagerFromEmail(session.user.email)
  return isManager
}

export async function editAction(formData: FormData) {
  console.log(formData)
  const orderId = formData.get("orderId") as string
  const customerId = formData.get("customer") as string
  const salesRepId = formData.get("salesRep") as string
  const itemId = formData.get("item") as string
  const quantity = parseFloat(formData.get("quantity") as string)
  const pricePerItem = parseFloat(formData.get("price") as string)
  const status = formData.get("status") as string
  const rejectionReason = formData.get("reason") as string
  console.log(status, rejectionReason)
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      salesRep: {
        select: {
          id: true,
          email: true,
          managerId: true,
        },
      },
      customer: { select: { name: true } },
      item: { select: { name: true } },
    },
  })

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      customerId: customerId,
      salesRepId: salesRepId,
      itemId: itemId,
      itemQuantity: quantity,
      pricePerItem: pricePerItem,
      status: status === null ? order.status : status,
      rejectionReason:
        rejectionReason === null ? order.rejectionReason : rejectionReason,
    },
  })

  redirect(`/manager/sales-rep/${updatedOrder.salesRepId}`)
}
