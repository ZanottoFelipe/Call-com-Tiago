import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserUseCase } from "src/user/application/use-cases/create-user/CreateUser";
import { FindUserByEmailUseCase } from "src/user/application/use-cases/find-user-by-email/FindUserByEmail";
import { CreateUserControllerDTO } from "./DTO/CreateUserControllerDTO";

@Controller('users')
export class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private findUserByEmailUseCase: FindUserByEmailUseCase,
    ) { }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    async store(@Body() dto: CreateUserControllerDTO) {
        return this.createUserUseCase.execute(dto);
    }

    // Rota interna — só o auth-service acessa (protegida pela rede interna no Docker)
    @Get('by-email/:email')
    async findByEmail(@Param('email') email: string) {
        return this.findUserByEmailUseCase.execute(email);
    }


    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async me(@Request() req: { user: { userId: string; email: string } }) {
        return req.user;
    }
}