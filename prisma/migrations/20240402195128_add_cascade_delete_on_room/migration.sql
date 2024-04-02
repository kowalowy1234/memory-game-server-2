-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_room_id_fkey";

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("room_id") ON DELETE CASCADE ON UPDATE CASCADE;
