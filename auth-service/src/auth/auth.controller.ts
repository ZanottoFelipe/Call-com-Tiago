import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsString } from 'class-validator';

class LoginDTO {
    @IsEmail()
    email!: string;
    @IsString()
    password!: string;
}

class RefreshDTO {
    @IsString()
    refreshToken!: string;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() body: LoginDTO) {
        return this.authService.login(body.email, body.password);
    }

    @Post('refresh')
    refresh(@Body() body: RefreshDTO) {
        return this.authService.refresh(body.refreshToken);
    }
}
