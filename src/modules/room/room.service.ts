import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaClient } from '@prisma/client';
import { HelperService } from 'src/services/helperService';

@Injectable()
export class RoomService {
  logger = new Logger(RoomService.name);

  constructor(
    private helperService: HelperService,
    private prisma: PrismaClient,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    try {
      const roomNameExists = await this.getOneByName(createRoomDto.room_name);

      if (roomNameExists) {
        throw new HttpException(
          'Room name must be unique',
          HttpStatus.CONFLICT,
        );
      }

      return await this.prisma.room.create({ data: { ...createRoomDto } });
    } catch (e) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll() {
    try {
      return await this.prisma.room.findMany();
    } catch (e) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOneById(id: number) {
    let validId;

    try {
      validId = this.helperService.getValidIdORThrow(id);
    } catch (e) {
      return e;
    }

    const room = await this.prisma.room.findFirst({
      where: { room_id: validId },
    });

    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }

    return room;
  }

  async getOneByName(room_name: string) {
    return await this.prisma.room.findFirst({
      where: {
        room_name,
      },
    });
  }

  async updateById(room_id: number, data: UpdateRoomDto) {
    let validId;

    try {
      validId = this.helperService.getValidIdORThrow(room_id);
    } catch (e) {
      return e;
    }

    const room = await this.prisma.room.findFirst({
      where: { room_id: room_id },
    });

    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.room.update({
      where: {
        room_id: validId,
      },
      data,
    });
  }

  async removeById(id: number) {
    let validId;

    try {
      validId = this.helperService.getValidIdORThrow(id);
    } catch (e) {
      return e;
    }

    const room = await this.prisma.room.findFirst({
      where: { room_id: validId },
    });

    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.room.delete({
      where: { room_id: validId },
    });
  }
}
