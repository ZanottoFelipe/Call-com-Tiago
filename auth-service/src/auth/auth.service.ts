import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../shared/prisma.service';
import { UserClientService } from '../user-client/user-client.service';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userClient: UserClientService,
    ) { }

    async login(email: string, password: string) {
        // 1. Busca o usuário no user-service via HTTP
        const user = await this.userClient.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        // 2. Compara a senha com o hash salvo no user-service
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        // 3. Gera o access_token assinado com a chave PRIVADA (RS256)
        const accessToken = this.jwtService.sign(
            { sub: user.id, email: user.email },
        );

        // 4. Gera o refresh_token como UUID opaco e salva no banco
        const refreshToken = randomUUID();
        await this.prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
            },
        });

        return { accessToken, refreshToken };
    }

    async refresh(token: string) {
        // 1. Busca o refresh_token no banco
        const stored = await this.prisma.refreshToken.findUnique({
            where: { token },
        });

        // 2. Valida: existe, não foi revogado e não expirou
        if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
            throw new UnauthorizedException('Refresh token inválido ou expirado');
        }

        // 3. Revoga o token atual (rotação: cada refresh gera um novo par)
        await this.prisma.refreshToken.update({
            where: { token },
            data: { revokedAt: new Date() },
        });

        // 4. Emite novo access_token e novo refresh_token
        const newAccessToken = this.jwtService.sign(
            { sub: stored.userId },
        );

        const newRefreshToken = randomUUID();
        await this.prisma.refreshToken.create({
            data: {
                token: newRefreshToken,
                userId: stored.userId,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
}
