/*
  Warnings:

  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `bio` VARCHAR(100) NULL,
    ADD COLUMN `picture` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `profile`;
