import { DomainException } from './DomainException';

export class UserNotFoundException extends DomainException {
    readonly statusCode = 404;

    constructor() {
        super('User not found');
    }
}
