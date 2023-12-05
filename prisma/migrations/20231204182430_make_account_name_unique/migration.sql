/*
  Warnings:

  - A unique constraint covering the columns `[accountName]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account_accountName_key" ON "Account"("accountName");
