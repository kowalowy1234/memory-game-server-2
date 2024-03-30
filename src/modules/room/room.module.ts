import { Module } from '@nestjs/common';
import { RoomGateway } from './room.gateway';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { HelperService } from 'src/services/helperService';

@Module({
  providers: [RoomGateway, RoomService, HelperService],
  controllers: [RoomController],
})
export class RoomModule {}
