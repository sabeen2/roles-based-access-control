/*
  Warnings:

  - A unique constraint covering the columns `[roleId,sideBarItem]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Permission_roleId_sideBarItem_key" ON "Permission"("roleId", "sideBarItem");
