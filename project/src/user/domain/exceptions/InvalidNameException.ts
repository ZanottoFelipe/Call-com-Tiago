import { DomainException } from './DomainException';

export class InvalidNameException extends DomainException {
    readonly statusCode = 400;

    constructor(message: string) {
        super(message);
    }
}
