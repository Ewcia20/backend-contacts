import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignorExpiration: false,
            secretOrKey: `${process.env.JWT_SECRET}`
        })

    }

    async validate(payload: any) {
        return {id: payload.id, login: payload.login, description: payload.description };
    }
}
