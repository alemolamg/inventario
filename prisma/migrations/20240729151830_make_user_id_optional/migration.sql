/*
  Warnings:

  - Made the column `brand` on table `device` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `device` DROP FOREIGN KEY `Device_userId_fkey`;

-- AlterTable
ALTER TABLE `device` MODIFY `brand` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Device` ADD CONSTRAINT `Device_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
