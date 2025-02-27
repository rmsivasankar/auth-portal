/*
  Warnings:

  - You are about to drop the column `attackType` on the `LoginAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `attemptTime` on the `LoginAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `ipAddress` on the `LoginAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `success` on the `LoginAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `LoginAttempt` table. All the data in the column will be lost.
  - The primary key for the `SecurityLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `count` on the `SecurityLog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `LoginAttempt` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "LoginAttempt" DROP COLUMN "attackType",
DROP COLUMN "attemptTime",
DROP COLUMN "ipAddress",
DROP COLUMN "success",
DROP COLUMN "userAgent",
ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "SecurityLog" DROP CONSTRAINT "SecurityLog_pkey",
DROP COLUMN "count",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SecurityLog_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SecurityLog_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "LoginAttempt_email_key" ON "LoginAttempt"("email");
