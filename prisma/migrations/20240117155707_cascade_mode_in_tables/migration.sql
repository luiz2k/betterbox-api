-- DropForeignKey
ALTER TABLE `favoritemovie` DROP FOREIGN KEY `favoriteMovie_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `favoritemovie` DROP FOREIGN KEY `favoriteMovie_userId_fkey`;

-- DropForeignKey
ALTER TABLE `favoriteserie` DROP FOREIGN KEY `favoriteSerie_serieId_fkey`;

-- DropForeignKey
ALTER TABLE `favoriteserie` DROP FOREIGN KEY `favoriteSerie_userId_fkey`;

-- DropForeignKey
ALTER TABLE `moviecomment` DROP FOREIGN KEY `movieComment_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `moviecomment` DROP FOREIGN KEY `movieComment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `movienote` DROP FOREIGN KEY `movieNote_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `movienote` DROP FOREIGN KEY `movieNote_userId_fkey`;

-- DropForeignKey
ALTER TABLE `moviewatched` DROP FOREIGN KEY `movieWatched_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `moviewatched` DROP FOREIGN KEY `movieWatched_userId_fkey`;

-- DropForeignKey
ALTER TABLE `refreshtoken` DROP FOREIGN KEY `refreshToken_userId_fkey`;

-- DropForeignKey
ALTER TABLE `revokedtoken` DROP FOREIGN KEY `revokedToken_userId_fkey`;

-- DropForeignKey
ALTER TABLE `seriecomment` DROP FOREIGN KEY `serieComment_serieId_fkey`;

-- DropForeignKey
ALTER TABLE `seriecomment` DROP FOREIGN KEY `serieComment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `serienote` DROP FOREIGN KEY `serieNote_serieId_fkey`;

-- DropForeignKey
ALTER TABLE `serienote` DROP FOREIGN KEY `serieNote_userId_fkey`;

-- DropForeignKey
ALTER TABLE `seriewatched` DROP FOREIGN KEY `serieWatched_serieId_fkey`;

-- DropForeignKey
ALTER TABLE `seriewatched` DROP FOREIGN KEY `serieWatched_userId_fkey`;

-- AddForeignKey
ALTER TABLE `refreshToken` ADD CONSTRAINT `refreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `revokedToken` ADD CONSTRAINT `revokedToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favoriteMovie` ADD CONSTRAINT `favoriteMovie_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favoriteMovie` ADD CONSTRAINT `favoriteMovie_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favoriteSerie` ADD CONSTRAINT `favoriteSerie_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favoriteSerie` ADD CONSTRAINT `favoriteSerie_serieId_fkey` FOREIGN KEY (`serieId`) REFERENCES `serie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movieWatched` ADD CONSTRAINT `movieWatched_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movieWatched` ADD CONSTRAINT `movieWatched_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `serieWatched` ADD CONSTRAINT `serieWatched_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `serieWatched` ADD CONSTRAINT `serieWatched_serieId_fkey` FOREIGN KEY (`serieId`) REFERENCES `serie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movieComment` ADD CONSTRAINT `movieComment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movieComment` ADD CONSTRAINT `movieComment_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `serieComment` ADD CONSTRAINT `serieComment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `serieComment` ADD CONSTRAINT `serieComment_serieId_fkey` FOREIGN KEY (`serieId`) REFERENCES `serie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movieNote` ADD CONSTRAINT `movieNote_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movieNote` ADD CONSTRAINT `movieNote_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `serieNote` ADD CONSTRAINT `serieNote_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `serieNote` ADD CONSTRAINT `serieNote_serieId_fkey` FOREIGN KEY (`serieId`) REFERENCES `serie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
