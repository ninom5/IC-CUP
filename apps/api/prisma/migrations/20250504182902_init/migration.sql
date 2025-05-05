-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'BOTH');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "img" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "driverLicense" TEXT NOT NULL,
    "idCard" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "totalEarnings" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Location_zipCode_key" ON "Location"("zipCode");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;
