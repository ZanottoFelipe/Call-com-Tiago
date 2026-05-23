import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma.service";
import { User } from "src/user/domain/entities/User";
import { IUserRepository } from "src/user/domain/repositories/IUserRepository";

@Injectable()
export class UserRepository extends IUserRepository {
    constructor(private readonly prisma: PrismaService) { super(); }


    async create(user: User): Promise<User> {
        const createdUser = await this.prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: user.password!,
            },
        });
        return new User({
            id: createdUser.id,
            email: createdUser.email,
            name: createdUser.name,
            password: createdUser.password,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt,
        });
    }


    async findByEmail(email: string): Promise<User | null> {
        const foundUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!foundUser) {
            return null;
        }

        return new User({
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
            password: foundUser.password,
            createdAt: foundUser.createdAt,
            updatedAt: foundUser.updatedAt,
        });
    }

    async findById(id: string): Promise<User | null> {
        const foundUser = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!foundUser) {
            return null;
        }

        return new User({
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
            password: foundUser.password,
            createdAt: foundUser.createdAt,
            updatedAt: foundUser.updatedAt,
        });
    }

    async update(user: User): Promise<User> {
        const updatedUser = await this.prisma.user.update({
            where: { id: user.id! },
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                updatedAt: new Date(),
            },
        });

        return new User({
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            password: updatedUser.password,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id },
        });
    }


}