import * as bcrypt from 'bcrypt';
import { IHasher } from 'src/user/application/ports/IHasher';

export class BcryptHasher extends IHasher {
    private readonly SALT_ROUNDS = 12;

    async hash(value: string): Promise<string> {
        return bcrypt.hash(value, this.SALT_ROUNDS);
    }

    async compare(value: string, hash: string): Promise<boolean> {
        return bcrypt.compare(value, hash);
    }
}
