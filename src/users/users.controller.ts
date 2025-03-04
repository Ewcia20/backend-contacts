import { Body, Controller, Post } from '@nestjs/common';
import { UserModelDto } from './user.dto';
import { Users } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}


    @Post()
    addUser(@Body() UserData: UserModelDto): Promise<Users> {
        return this.usersService.createUser(UserData);
    }
}