export abstract class IEventEmitter {
    abstract emit(event: string, payload: unknown): void;
}