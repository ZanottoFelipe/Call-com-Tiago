import { Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "src/user/domain/repositories/IUserRepository";

@Injectable()
export class FindUserByEmailUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(email: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        };
    }
}
