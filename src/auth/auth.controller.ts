import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly AuthService: AuthService) {}

    @Post('login')
    async login(@Body() body:{ login: string; pass: string }) {

        const user = await this.AuthService.validateUser(body.login, body.pass);

        return this.AuthService.login(user);
    }
}
