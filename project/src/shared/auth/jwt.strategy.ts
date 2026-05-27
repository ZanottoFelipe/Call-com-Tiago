import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface JwtPayload {
    sub: string;
    email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: readFileSync(join(process.cwd(), 'public.key')),
            algorithms: ['RS256'],
        });
    }

    // O que retornar aqui vai ser injetado como request.user nas rotas protegidas
    async validate(payload: JwtPayload) {
        return { userId: payload.sub, email: payload.email };
    }
}
