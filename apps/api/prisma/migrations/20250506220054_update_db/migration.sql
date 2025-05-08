/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "updatedAt",
ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "description" DROP NOT NULL;
