import { InvalidEmailException } from '../exceptions/InvalidEmailException';

export class Email {
    public readonly value: string;

    constructor(value: string) {
        this.value = this.validate(value);
    }

    private validate(value: string): string {
        if (!value || value.trim().length === 0) {
            throw new InvalidEmailException('Email cannot be empty');
        }
        if (value.length > 255) {
            throw new InvalidEmailException('Email cannot be longer than 255 characters');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new InvalidEmailException('Email is invalid');
        }
        return value.toLowerCase().trim();
    }
}
