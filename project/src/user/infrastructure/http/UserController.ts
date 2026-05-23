import { Body, Controller, ConflictException, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/user/application/use-cases/create-user/CreateUser";
import { CreateUserControllerDTO } from "./DTO/CreateUserControllerDTO";
import { EmailAlreadyExistsException } from "src/user/domain/exceptions/EmailAlreadyExistsException";

@Controller('users')
export class UserController {
    constructor(private createUserUseCase: CreateUserUseCase) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async store(@Body() dto: CreateUserControllerDTO) {
        try {
            return await this.createUserUseCase.execute(dto);
        } catch (error) {
            if (error instanceof EmailAlreadyExistsException)
                throw new ConflictException(error.message);
            throw error;
        }
    }


}   