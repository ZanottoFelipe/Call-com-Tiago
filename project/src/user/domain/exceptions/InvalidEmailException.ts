import { DomainException } from './DomainException';

export class InvalidEmailException extends DomainException {
    readonly statusCode = 400;

    constructor(message: string) {
        super(message);
    }
}
