/*
  Warnings:

  - Made the column `room_password` on table `Room` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "player_name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "room_name" SET DATA TYPE TEXT,
ALTER COLUMN "room_password" SET NOT NULL,
ALTER COLUMN "room_password" SET DATA TYPE TEXT;
