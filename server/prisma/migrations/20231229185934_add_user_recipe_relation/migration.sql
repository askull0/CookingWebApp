-- AlterTable
ALTER TABLE `recipes` ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Recipes` ADD CONSTRAINT `Recipes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
