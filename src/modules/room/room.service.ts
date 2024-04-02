import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaClient } from '@prisma/client';
import { HelperService } from 'src/services/helperService';
import { selectRoomWithoutPasswordObject } from 'src/common/helper-objects';

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

      const createdRoom = await this.prisma.room.create({
        data: { ...createRoomDto },
        select: selectRoomWithoutPasswordObject,
      });

      this.logger.log(`Room ${createdRoom.room_id} - [created]`);

      return createdRoom;
    } catch (e) {
      return e;
    }
  }

  async getAll() {
    try {
      return await this.prisma.room.findMany({
        select: {
          room_id: true,
          room_name: true,
          players: true,
          is_active: true,
          max_players: true,
        },
      });
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
      select: selectRoomWithoutPasswordObject,
    });

    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }

    return room;
  }

  async getOneByName(room_name: string) {
    const room = await this.prisma.room.findFirst({
      where: {
        room_name,
      },
      select: {
        room_id: true,
        room_name: true,
      },
    });

    return room;
  }

  async updateById(room_id: number, data: UpdateRoomDto) {
    let validId;

    try {
      validId = this.helperService.getValidIdORThrow(room_id);
    } catch (e) {
      return e;
    }

    const room = await this.prisma.room.findFirst({
      where: { room_id: validId },
    });

    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }

    try {
      const updatedRoom = await this.prisma.room.update({
        where: {
          room_id: validId,
        },
        data,
        select: selectRoomWithoutPasswordObject,
      });
      this.logger.log(`Room ${validId} - [updated]`);
      return updatedRoom;
    } catch (e) {
      return e;
    }
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

    try {
      const deletedRoom = await this.prisma.room.delete({
        where: { room_id: validId },
        select: selectRoomWithoutPasswordObject,
      });
      this.logger.log(`Room ${validId} - [removed]`);

      return deletedRoom;
    } catch (e) {
      return e;
    }
  }
}
