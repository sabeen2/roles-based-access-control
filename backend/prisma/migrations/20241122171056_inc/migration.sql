/*
  Warnings:

  - The values [Dashboard] on the enum `SidebarItemsEnum` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `description` on the `Role` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SidebarItemsEnum_new" AS ENUM ('Authors', 'Bookings', 'Reviews', 'ManageUsers');
ALTER TABLE "Permission" ALTER COLUMN "sideBarItem" TYPE "SidebarItemsEnum_new" USING ("sideBarItem"::text::"SidebarItemsEnum_new");
ALTER TYPE "SidebarItemsEnum" RENAME TO "SidebarItemsEnum_old";
ALTER TYPE "SidebarItemsEnum_new" RENAME TO "SidebarItemsEnum";
DROP TYPE "SidebarItemsEnum_old";
COMMIT;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "description";

-- DropEnum
DROP TYPE "ActionEnum";

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" INTEGER NOT NULL DEFAULT 1,
    "about" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);
