-- CreateTable
CREATE TABLE `Recipes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(76) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `reviews` INTEGER NOT NULL,
    `description` VARCHAR(680) NOT NULL,
    `publishedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `totalTime` INTEGER NOT NULL,
    `calories` INTEGER NOT NULL,
    `fat` INTEGER NOT NULL,
    `carbs` INTEGER NOT NULL,
    `protein` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
