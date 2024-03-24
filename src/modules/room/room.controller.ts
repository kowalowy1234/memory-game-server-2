import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  async getRooms() {}

  @Get(':roomId')
  async getRoom(@Param('roomId') roomId: number) {}

  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return await this.roomService.create(createRoomDto)
  }

  @Post('delete/:roomId')
  async deleteRoom(@Param('roomId') roomId: number) {}

  @Post('update/:roomId')
  async updateRoom(
    @Param('roomID') roomId: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {}
}
