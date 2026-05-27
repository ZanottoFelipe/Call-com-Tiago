import { Module } from "@nestjs/common";
import { UserRepository } from "../database/UserRepository";
import { IUserRepository } from "src/user/domain/repositories/IUserRepository";
import { UserController } from "../http/UserController";
import { CreateUserUseCase } from "src/user/application/use-cases/create-user/CreateUser";
import { FindUserByEmailUseCase } from "src/user/application/use-cases/find-user-by-email/FindUserByEmail";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { IEventEmitter } from "src/user/application/ports/IEventEmitter";
import { NestEventEmitterAdapter } from "../events/NestEventEmitterAdapter";
import { UserCreatedListener } from "../listners/UserCreatedListener";
import { IHasher } from "src/user/application/ports/IHasher";
import { BcryptHasher } from "../cryptography/BcryptHasher";

@Module({
    imports: [
        ClientsModule.register([{
            name: 'RABBITMQ_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
                queue: 'user.created',
                queueOptions: { durable: true },
            },
        }]),
    ],
    controllers: [UserController],
    providers: [
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
        {
            provide: IEventEmitter,
            useClass: NestEventEmitterAdapter,
        },
        {
            provide: IHasher,
            useClass: BcryptHasher,
        },
        CreateUserUseCase,
        FindUserByEmailUseCase,
        UserCreatedListener,
    ],
})
export class UserModule { }