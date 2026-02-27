/*
  Warnings:

  - You are about to drop the column `strip_costumer_id` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "strip_costumer_id",
ADD COLUMN     "stripe_customer_id" TEXT;
