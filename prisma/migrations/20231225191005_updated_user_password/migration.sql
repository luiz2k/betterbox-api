/*
  Warnings:

  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(128)` to `Char(60)`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `password` CHAR(60) NOT NULL;
