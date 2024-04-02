import { Allow, IsNotEmpty } from 'class-validator';

export class CreatePlayerDto {
  @Allow()
  player_name: string;

  @Allow()
  is_admin: boolean;

  @IsNotEmpty()
  room_id: number;

  @IsNotEmpty()
  socket_id: number;
}
