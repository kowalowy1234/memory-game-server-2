import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PlayerService {
  prisma = new PrismaClient();

  async create(createPlayerDto: CreatePlayerDto) {
    const player = await this.prisma.player.create({
      data: { ...createPlayerDto },
    });
    return player;
  }

  findAll() {
    return `This action returns all player`;
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
