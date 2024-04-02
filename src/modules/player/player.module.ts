import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { RoomModule } from '../room/room.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [RoomModule],
  controllers: [PlayerController],
  providers: [PlayerService, PrismaClient],
})
export class PlayerModule {}
