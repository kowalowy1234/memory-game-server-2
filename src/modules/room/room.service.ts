import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RoomService {
  prisma = new PrismaClient();
  constructor() {}
  async create(createRoomDto: CreateRoomDto) {
    return await this.prisma.room.create({ data: { ...createRoomDto } });
  }

  findAll() {
    return `This action returns all room`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
