import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { UserModelDto } from './user.dto';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {

    constructor(
       @InjectRepository(Users) 
       private readonly usersRepository: Repository<Users>
      ){}

      async findByUserName(login: string): Promise<any> {
        return  await this.usersRepository.findOneBy({ login });
      }

      async createUser(userData: UserModelDto): Promise<any> {
         let {login, pass, description} = userData;
         const salt = `${process.env.SALT}`;

        pass = crypto.createHash('sha1').update(pass+salt).digest('hex');
        const user = this.usersRepository.create({login, pass, description});
        return await this.usersRepository.save(user);
       }  

}
