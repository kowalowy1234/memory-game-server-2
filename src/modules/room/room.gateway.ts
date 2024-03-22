import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: '*', namespace: 'room' })
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(RoomGateway.name);

  constructor(private readonly roomService: RoomService) {}

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`New client connected - [${client.id}]`)
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client [${client.id}] disconnected`)
  }

  @SubscribeMessage('createRoom')
  create(@MessageBody() createRoomDto: CreateRoomDto) {
    console.log('room created');
    return this.roomService.create(createRoomDto);
  }

  @SubscribeMessage('findAllRoom')
  findAll() {
    return this.roomService.findAll();
  }

  @SubscribeMessage('findOneRoom')
  findOne(@MessageBody() id: number) {
    return this.roomService.findOne(id);
  }

  @SubscribeMessage('updateRoom')
  update(@MessageBody() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(updateRoomDto.id, updateRoomDto);
  }

  @SubscribeMessage('removeRoom')
  remove(@MessageBody() id: number) {
    return this.roomService.remove(id);
  }
}
