/*
  Warnings:

  - You are about to alter the column `player_name` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(30)`.
  - You are about to alter the column `room_name` on the `Room` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(30)`.
  - You are about to alter the column `room_password` on the `Room` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(30)`.

*/
-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "player_name" SET DATA TYPE CHAR(30);

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "room_name" SET DATA TYPE CHAR(30),
ALTER COLUMN "room_password" SET DATA TYPE CHAR(30);
