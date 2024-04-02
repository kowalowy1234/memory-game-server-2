/*
  Warnings:

  - You are about to drop the column `id_admin` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[socket_id]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `socket_id` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "id_admin",
ADD COLUMN     "socket_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Player_socket_id_key" ON "Player"("socket_id");
