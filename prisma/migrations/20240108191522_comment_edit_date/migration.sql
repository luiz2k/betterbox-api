/*
  Warnings:

  - You are about to drop the column `commentDate` on the `moviecomment` table. All the data in the column will be lost.
  - You are about to drop the column `commentDate` on the `seriecomment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `moviecomment` DROP COLUMN `commentDate`,
    ADD COLUMN `commentedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `editedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `seriecomment` DROP COLUMN `commentDate`,
    ADD COLUMN `commentedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `editedAt` DATETIME(3) NULL;
