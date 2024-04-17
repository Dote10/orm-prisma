/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `name`;
