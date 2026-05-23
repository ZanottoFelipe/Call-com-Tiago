import { User } from "../entities/User";

export abstract class IUserRepository {
    abstract create(user: User): Promise<User>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findById(id: string): Promise<User | null>;
    abstract update(user: User): Promise<User>;
    abstract delete(id: string): Promise<void>;
}