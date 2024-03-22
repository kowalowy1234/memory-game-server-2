import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoomModule } from './modules/room/room.module';
import { GameModule } from './modules/game/game.module';
import { SocketService } from './services/socket/socket.service';
import configuration from '../config/env/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),
    RoomModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketService],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor(private readonly configService: ConfigService) {
    this.logger.verbose(
      'Current nest configuration - ' +
        this.configService.get<string>('NODE_ENV'),
    );
  }
}
