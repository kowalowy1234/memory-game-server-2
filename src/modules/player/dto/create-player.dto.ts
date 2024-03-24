import { Allow } from 'class-validator';

export class CreatePlayerDto {
  @Allow()
  player_name: string;

  @Allow()
  is_admin: boolean;
}
