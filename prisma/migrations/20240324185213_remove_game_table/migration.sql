/*
  Warnings:

  - You are about to drop the column `gameGame_id` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `roomRoom_id` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `room_admin` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlayerScore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_room_id_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_gameGame_id_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_roomRoom_id_fkey";

-- DropForeignKey
ALTER TABLE "PlayerScore" DROP CONSTRAINT "PlayerScore_game_id_fkey";

-- DropForeignKey
ALTER TABLE "PlayerScore" DROP CONSTRAINT "PlayerScore_player_id_fkey";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "gameGame_id",
DROP COLUMN "roomRoom_id",
ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "id_admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pairs_left" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "room_id" INTEGER,
ALTER COLUMN "player_name" SET DEFAULT 'Guest';

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "room_admin",
ADD COLUMN     "end_time" TIMESTAMP(3),
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "PlayerScore";

-- CreateTable
CREATE TABLE "Card" (
    "card_id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("card_id")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("room_id") ON DELETE SET NULL ON UPDATE CASCADE;
