import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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
  async getRoom(@Param('roomId') roomId: number) {
    return await this.roomService.getOneById(roomId)
  }

  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return await this.roomService.create(createRoomDto);
  }

  @Post('delete/:roomId')
  async deleteRoom(@Param('roomId') roomId: number) {}

  @Patch('update/:roomId')
  async updateRoom(
    @Param('roomID') roomId: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return await this.roomService.updateById(roomId, updateRoomDto);
  }
}
