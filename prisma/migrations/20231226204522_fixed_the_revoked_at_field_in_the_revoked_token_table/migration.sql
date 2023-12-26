/*
  Warnings:

  - You are about to drop the column `revoketdAt` on the `revokedtoken` table. All the data in the column will be lost.
  - Added the required column `revokedAt` to the `revokedToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `revokedtoken` DROP COLUMN `revoketdAt`,
    ADD COLUMN `revokedAt` DATETIME(3) NOT NULL;
