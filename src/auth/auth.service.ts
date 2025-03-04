import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as crypto from 'crypto';


@Injectable()
export class AuthService {

    constructor( 
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
    ) {}

    async validateUser(login: string, password: string): Promise<any> {
        const user = await this.userService.findByUserName(login);

        if(user) {

            const salt = `${process.env.SALT}`;

            

            const hashedPassword = crypto.createHash('sha1').update(password+salt).digest('hex');

            if (user.pass === hashedPassword) {
                
               // const result = {id: user.id, l
               // ogin: user.login, description: user.description};

               const {pass, ...result} =user;

                return result;
            }

        }
        
        throw new UnauthorizedException('Invalid credentials');

    }

    async login (user: any) {
        const {pass, ...payload} = user;
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
