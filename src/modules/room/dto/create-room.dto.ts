import { Allow, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @MaxLength(30)
  room_name: string;

  @IsNotEmpty()
  room_admin_id: number;

  @Allow()
  room_password: string;
}
