/*
  Warnings:

  - You are about to drop the column `assigned_at` on the `TaskTag` table. All the data in the column will be lost.
  - You are about to drop the column `assigned_by` on the `TaskTag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TaskTag" DROP COLUMN "assigned_at",
DROP COLUMN "assigned_by",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
