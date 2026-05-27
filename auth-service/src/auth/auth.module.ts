import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserClientModule } from '../user-client/user-client.module';
import { readFileSync } from 'fs';
import { join } from 'path';

@Module({
  imports: [
    UserClientModule,
    JwtModule.register({
      privateKey: readFileSync(join(process.cwd(), 'private.key')),
      publicKey: readFileSync(join(process.cwd(), 'public.key')),
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '15m',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
