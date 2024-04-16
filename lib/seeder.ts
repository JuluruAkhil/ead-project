const { PrismaClient } = require("@prisma/client")
const { faker } = require("@faker-js/faker")

const prisma = new PrismaClient()

const seed = async () => {
  await prisma.item.createMany({
    data: Array(10)
      .fill(0)
      .map(() => ({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
      })),
  })

  await prisma.customer.createMany({
    data: Array(10)
      .fill(0)
      .map(() => ({
        name: faker.person.fullName(),
      })),
  })
}

async function main() {
  try {
    // Your seeding logic here
    seed()
    console.log("Seeding completed successfully.")
  } catch (error) {
    console.error("Seeding failed:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
