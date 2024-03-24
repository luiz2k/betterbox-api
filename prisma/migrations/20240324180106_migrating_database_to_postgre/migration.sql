-- CreateTable
CREATE TABLE "refreshToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "refreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revokedToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "revokedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "revokedToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(15) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "password" CHAR(60) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favoriteMovie" (
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "favoriteDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favoriteMovie_pkey" PRIMARY KEY ("userId","movieId")
);

-- CreateTable
CREATE TABLE "favoriteSerie" (
    "userId" INTEGER NOT NULL,
    "serieId" INTEGER NOT NULL,

    CONSTRAINT "favoriteSerie_pkey" PRIMARY KEY ("userId","serieId")
);

-- CreateTable
CREATE TABLE "movieWatched" (
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "watchedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movieWatched_pkey" PRIMARY KEY ("userId","movieId")
);

-- CreateTable
CREATE TABLE "serieWatched" (
    "userId" INTEGER NOT NULL,
    "serieId" INTEGER NOT NULL,
    "watchedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "serieWatched_pkey" PRIMARY KEY ("userId","serieId")
);

-- CreateTable
CREATE TABLE "movieComment" (
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "comment" VARCHAR(100) NOT NULL,
    "commentedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3),

    CONSTRAINT "movieComment_pkey" PRIMARY KEY ("userId","movieId")
);

-- CreateTable
CREATE TABLE "serieComment" (
    "userId" INTEGER NOT NULL,
    "serieId" INTEGER NOT NULL,
    "comment" VARCHAR(100) NOT NULL,
    "commentedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3),

    CONSTRAINT "serieComment_pkey" PRIMARY KEY ("userId","serieId")
);

-- CreateTable
CREATE TABLE "movieNote" (
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "note" DECIMAL(2,1) NOT NULL,

    CONSTRAINT "movieNote_pkey" PRIMARY KEY ("userId","movieId")
);

-- CreateTable
CREATE TABLE "serieNote" (
    "userId" INTEGER NOT NULL,
    "serieId" INTEGER NOT NULL,
    "note" DECIMAL(2,1) NOT NULL,

    CONSTRAINT "serieNote_pkey" PRIMARY KEY ("userId","serieId")
);

-- CreateTable
CREATE TABLE "movie" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serie" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "serie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "refreshToken" ADD CONSTRAINT "refreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revokedToken" ADD CONSTRAINT "revokedToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoriteMovie" ADD CONSTRAINT "favoriteMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoriteMovie" ADD CONSTRAINT "favoriteMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoriteSerie" ADD CONSTRAINT "favoriteSerie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoriteSerie" ADD CONSTRAINT "favoriteSerie_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "serie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movieWatched" ADD CONSTRAINT "movieWatched_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movieWatched" ADD CONSTRAINT "movieWatched_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serieWatched" ADD CONSTRAINT "serieWatched_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serieWatched" ADD CONSTRAINT "serieWatched_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "serie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movieComment" ADD CONSTRAINT "movieComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movieComment" ADD CONSTRAINT "movieComment_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serieComment" ADD CONSTRAINT "serieComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serieComment" ADD CONSTRAINT "serieComment_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "serie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movieNote" ADD CONSTRAINT "movieNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movieNote" ADD CONSTRAINT "movieNote_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serieNote" ADD CONSTRAINT "serieNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serieNote" ADD CONSTRAINT "serieNote_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "serie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
