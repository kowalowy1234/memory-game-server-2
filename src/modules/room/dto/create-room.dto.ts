import { Allow, IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  room_name: string;

  @IsNotEmpty()
  room_admin_id: number;

  @Allow()
  room_password: string;
}
