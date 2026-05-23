import { InvalidNameException } from '../exceptions/InvalidNameException';

export class Name {
    public readonly value: string;

    constructor(value: string) {
        this.value = this.validate(value);
    }

    private validate(value: string): string {
        if (!value || value.trim().length === 0) {
            throw new InvalidNameException('Name cannot be empty');
        }
        if (value.length > 255) {
            throw new InvalidNameException('Name cannot be longer than 255 characters');
        }
        return value;
    }
}
