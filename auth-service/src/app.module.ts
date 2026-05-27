import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseModule } from './shared/DataBaseModule';
import { AuthModule } from './auth/auth.module';
import { UserClientModule } from './user-client/user-client.module';

@Module({
  imports: [DataBaseModule, AuthModule, UserClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
