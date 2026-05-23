import { Inject, Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ClientProxy } from "@nestjs/microservices";
import { UserCreatedEvent } from "src/user/domain/events/UserCreatedEvent";


@Injectable()
export class UserCreatedListener {
    private readonly logger = new Logger(UserCreatedListener.name);

    constructor(
        @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy
    ) { }

    @OnEvent('user.created')
    handle(event: UserCreatedEvent) {
        this.logger.log(`User created: ${event.id}`);
        this.client.emit('user.created', {
            userId: event.id,
            name: event.name,
            email: event.email,
            createdAt: event.createdAt
        });
    }
}