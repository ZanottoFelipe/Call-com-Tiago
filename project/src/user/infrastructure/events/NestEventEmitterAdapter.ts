import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IEventEmitter } from "src/user/application/ports/IEventEmitter";

@Injectable()
export class NestEventEmitterAdapter extends IEventEmitter {
    constructor(private readonly eventEmitter: EventEmitter2) {
        super();
    }
    emit(event: string, payload: unknown): void {
        this.eventEmitter.emit(event, payload);
    }
}