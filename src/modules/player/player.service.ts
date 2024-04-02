import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaClient } from '@prisma/client';
import { RoomService } from '../room/room.service';

@Injectable()
export class PlayerService {
  constructor(
    private prisma: PrismaClient,
    private roomservice: RoomService,
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    try {
      const room = await this.roomservice.getOneById(+createPlayerDto.room_id);

      if (!room) {
        throw new NotFoundException('Room not found');
      }

      const socket = await this.prisma.player.findFirst({
        where: {
          socket_id: createPlayerDto.socket_id,
        },
      });

      if (socket) {
        throw new BadRequestException(
          'Socket connection with given id already exists.',
        );
      }

      const player = await this.prisma.player.create({
        data: {
          player_name: createPlayerDto.player_name,
          socket_id: createPlayerDto.socket_id,
          room: {
            connect: {
              room_id: createPlayerDto.room_id,
            },
          },
        },
      });
      return player;
    } catch (e) {
      return e;
    }
  }

  async findOne(player_id: number) {
    try {
      const player = await this.prisma.player.findFirst({
        where: {
          player_id,
        },
      });

      if (!player) {
        throw new Error('Player not found');
      }

      return player;
    } catch (e) {
      return e;
    }
  }

  async update(player_id: number, updatePlayerDto: UpdatePlayerDto) {
    try {
      const player = await this.findOne(player_id);

      if (!player.player_id) {
        throw new NotFoundException('Player not found');
      }

      return this.prisma.player.update({
        where: {
          player_id,
        },
        data: updatePlayerDto,
      });
    } catch (e) {
      return e;
    }
  }

  async remove(player_id: number) {
    try {
      const player = await this.findOne(player_id);

      if (!player.player_id) {
        throw new NotFoundException('Player not found');
      }

      return this.prisma.player.delete({
        where: {
          player_id,
        },
      });
    } catch (e) {
      return e;
    }
  }
}
