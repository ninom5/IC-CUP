/*
  Warnings:

  - A unique constraint covering the columns `[bankAccount]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isSuspended" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "User_bankAccount_key" ON "User"("bankAccount");
