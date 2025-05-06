-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID');

-- CreateEnum
CREATE TYPE "CarCategory" AS ENUM ('SMALL', 'MEDIUM', 'SUV', 'VAN', 'LUXURY');

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "comment" DROP NOT NULL;
