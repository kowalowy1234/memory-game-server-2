import { Module } from '@nestjs/common';
import { RoomGateway } from './room.gateway';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { HelperService } from 'src/services/helperService';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [RoomGateway, RoomService, HelperService, PrismaClient],
  controllers: [RoomController],
})
export class RoomModule {}
