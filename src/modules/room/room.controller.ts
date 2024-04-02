import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  async getRooms() {
    return await this.roomService.getAll();
  }

  @Get(':roomId')
  async getRoom(@Param('roomId') roomId: string) {
    return await this.roomService.getOneById(+roomId);
  }

  @Get('players/:roomId')
  async getRoomPlayers(@Param('roomId') roomId: string) {
    return await this.roomService.getRoomPlayers(+roomId);
  }

  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return await this.roomService.create(createRoomDto);
  }

  @Delete('delete/:roomId')
  async deleteRoom(@Param('roomId') roomId: string) {
    return await this.roomService.removeById(+roomId);
  }

  @Patch('update/:roomId')
  async updateRoom(
    @Param('roomId') roomId: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return await this.roomService.updateById(+roomId, updateRoomDto);
  }
}
