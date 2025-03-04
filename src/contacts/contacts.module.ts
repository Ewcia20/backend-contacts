import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contacts_data } from './contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contacts_data])],
  controllers: [ContactsController],
  providers: [ContactsService]
})
export class ContactsModule {}
