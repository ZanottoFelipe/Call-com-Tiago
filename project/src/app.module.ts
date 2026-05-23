import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseModule } from './shared/DataBaseModule';
import { UserModule } from './user/infrastructure/module/UserModule';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [DataBaseModule, EventEmitterModule.forRoot(), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
