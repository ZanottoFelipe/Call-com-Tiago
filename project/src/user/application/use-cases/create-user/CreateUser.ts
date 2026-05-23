import { IUserRepository } from "src/user/domain/repositories/IUserRepository";
import { CreateUserDTO } from "./CreateUserDTO";
import { User } from "src/user/domain/entities/User";
import { OutputUserDTO } from "../OutputUserDTO";
import { Injectable } from "@nestjs/common";
import { IEventEmitter } from "../../ports/IEventEmitter";
import { IHasher } from "../../ports/IHasher";
import { EmailAlreadyExistsException } from "src/user/domain/exceptions/EmailAlreadyExistsException";


@Injectable()
export class CreateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private eventEmitter: IEventEmitter,
        private hasher: IHasher,
    ) { }

    async execute(dto: CreateUserDTO): Promise<OutputUserDTO> {

        if (await this.userRepository.findByEmail(dto.email)) {
            throw new EmailAlreadyExistsException();
        }

        const hashedPassword = await this.hasher.hash(dto.password);

        const user = new User({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
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