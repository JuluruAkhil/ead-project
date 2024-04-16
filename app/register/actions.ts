"use server"

import prisma from "@/lib/db"
import { hashPassword } from "@/lib/hash"
import { redirect } from "next/navigation"

export const registerAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString()
  const password = formData.get("password")?.toString()
  await prisma.user.create({
    data: {
      email,
      password: await hashPassword(password),
    },
  })

  redirect("/login")
}
