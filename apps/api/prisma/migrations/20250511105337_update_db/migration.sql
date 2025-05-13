/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `VehicleAvailability` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vehicleId,startDate,endDate]` on the table `VehicleAvailability` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `VehicleAvailability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VehicleAvailability" DROP COLUMN "isAvailable",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VehicleAvailability_vehicleId_startDate_endDate_key" ON "VehicleAvailability"("vehicleId", "startDate", "endDate");
