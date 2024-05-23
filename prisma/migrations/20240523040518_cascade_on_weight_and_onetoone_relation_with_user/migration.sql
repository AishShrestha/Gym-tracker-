/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Weight` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Weight" DROP CONSTRAINT "Weight_userId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Weight_userId_key" ON "Weight"("userId");

-- AddForeignKey
ALTER TABLE "Weight" ADD CONSTRAINT "Weight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
