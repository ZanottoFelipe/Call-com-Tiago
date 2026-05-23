import { DomainException } from './DomainException';

export class EmailAlreadyExistsException extends DomainException {
    readonly statusCode = 409;

    constructor() {
        super('Email already exists');
    }
}
