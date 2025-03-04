import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contacts_data } from './contacts/contact.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Users } from './users/user.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ContactsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'contacts_ewa',
      entities: [Contacts_data, Users],
      //synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ 
      isGlobal: true,
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
