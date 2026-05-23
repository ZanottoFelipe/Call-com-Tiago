import { IUserRepository } from "src/user/domain/repositories/IUserRepository";
import { CreateUserDTO } from "./CreateUserDTO";
import { User } from "src/user/domain/entities/User";
import { OutputUserDTO } from "../OutputUserDTO";
import { Injectable } from "@nestjs/common";
import { IEventEmitter } from "../../ports/IEventEmitter";


@Injectable()
export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository,
        private eventEmitter: IEventEmitter
    ) { }

    async execute(dto: CreateUserDTO): Promise<OutputUserDTO> {

        if (await this.userRepository.findByEmail(dto.email)) {
            throw new Error("Email already exists");
        }

        const user = new User({
            name: dto.name,
            email: dto.email,
            password: dto.password
        });

        const createdUser = await this.userRepository.create(user);

        this.eventEmitter.emit('user.created', {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            createdAt: createdUser.createdAt
        });

        return new OutputUserDTO({
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt
        });


    }
}