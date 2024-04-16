/*
  Warnings:

  - Added the required column `salesRepId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "salesRepId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_salesRepId_fkey" FOREIGN KEY ("salesRepId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
