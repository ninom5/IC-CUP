/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `Vehicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "isAvailable";

-- CreateTable
CREATE TABLE "VehicleAvailability" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,

    CONSTRAINT "VehicleAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VehicleAvailability_vehicleId_idx" ON "VehicleAvailability"("vehicleId");

-- AddForeignKey
ALTER TABLE "VehicleAvailability" ADD CONSTRAINT "VehicleAvailability_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
