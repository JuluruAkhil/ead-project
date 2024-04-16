"use server"
import prisma from "./db"

export async function getIdfromEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: { email },
    select: { id: true },
  })
  return user?.id
}

export async function isManagerFromEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: { email: email },
    select: { managerId: true },
  })
  return user?.managerId
}
