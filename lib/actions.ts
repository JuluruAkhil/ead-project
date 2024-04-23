"use server"
import prisma from "./db"
import nodemailer from "nodemailer"

export async function getIdfromEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: { email },
    select: { id: true },
  })
  return user?.id
}

export async function getManagerEmailFromEmployeeEmail(employeeEmail: string) {
  const manager = await prisma.user.findFirst({
    where: { email: employeeEmail },
    select: {
      manager: {
        select: { email: true },
      },
    },
  })
  return manager?.manager?.email
}

export async function isManagerFromEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: { email: email },
    select: { isManager: true },
  })
  return user?.isManager
}

export async function isAdminFromEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: { email: email },
    select: { isAdmin: true },
  })
  return user?.isAdmin
}

export async function sendEmail(toAddress, subject, content) {
  const password = process.env.RESEND_PASSWORD
  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 587,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },

    auth: {
      user: "resend",
      pass: password,
    },
  })

  const mailOptions = {
    from: "onboarding@bookabartender.net",
    to: toAddress,
    subject: subject,
    text: content,
  }

  await transporter.sendMail(mailOptions)
}
