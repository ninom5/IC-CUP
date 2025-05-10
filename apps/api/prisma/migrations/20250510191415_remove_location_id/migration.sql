/*
  Warnings:

  - You are about to drop the column `locationId` on the `Vehicle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_locationId_fkey";

-- DropIndex
DROP INDEX "Vehicle_locationId_idx";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "locationId";
