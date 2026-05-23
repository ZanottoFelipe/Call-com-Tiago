import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/user/application/use-cases/create-user/CreateUser";
import { CreateUserControllerDTO } from "./DTO/CreateUserControllerDTO";

@Controller('users')
export class UserController {
    constructor(private createUserUseCase: CreateUserUseCase) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async store(@Body() dto: CreateUserControllerDTO) {
        return this.createUserUseCase.execute(dto);
    }


}   