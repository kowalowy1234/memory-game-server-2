/*
  Warnings:

  - Added the required column `room_admin_id` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "room_admin_id" INTEGER NOT NULL;
