/*
  Warnings:

  - The values [SMALL,MEDIUM,VAN,LUXURY] on the enum `CarCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Transmission" AS ENUM ('AUTOMATIC', 'MANUAL');

-- AlterEnum
BEGIN;
CREATE TYPE "CarCategory_new" AS ENUM ('COUPE', 'SEDAN', 'CABRIOLET', 'SUV', 'HATCHBACK');
ALTER TYPE "CarCategory" RENAME TO "CarCategory_old";
ALTER TYPE "CarCategory_new" RENAME TO "CarCategory";
DROP TYPE "CarCategory_old";
COMMIT;
