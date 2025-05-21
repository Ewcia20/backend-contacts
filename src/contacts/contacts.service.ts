import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contacts_data } from './contact.entity';
import { Repository } from 'typeorm';
import { ContactModelDto } from './contact.dto';
import { Like } from 'typeorm';


@Injectable()
export class ContactsService {
  
  constructor(
    @InjectRepository(Contacts_data)
    private contactsRepository: Repository<Contacts_data>,
  ) {}
  
  async getContacts(id_user: number): Promise<Contacts_data[]> {
    return await this.contactsRepository.find({
      where: { id_user }
    });
  }
  
  async getContact(id: number, id_user: number): Promise<Contacts_data | null> {
    // return await this.contactsRepository.findOneBy({id});
    return await this.contactsRepository.findOne({
      where: { id, id_user }
    });
  }
  async removeContact(id: number): Promise<void> {
    await await this.contactsRepository.delete(id);
  }
  
  async searchContacts(dataParam: object | any,  id_user: number): Promise<Contacts_data[] | null> {
    const data = dataParam.searchData;
    
    const text = dataParam.searchText;

    // if(data == 'surname') {
    //   return await this.contactsRepository.find({
    //    where: {surname: text, id_user }
    //   });
    // }

    if (data ==='surname') {
      return await this.contactsRepository.find({
        where: {
        surname:  Like(`%${text}%`), id_user
        }
      });

    }
    if (data ==='firstname') {
      return await this.contactsRepository.find({
        where: {
        firstname:  Like(`%${text}%`), id_user
        }
      });

    }
    if (data ==='city') {
      return await this.contactsRepository.find({
        where: {
        city:  Like(`%${text}%`), id_user
        }
      });

    }

    return await this.contactsRepository.find({
       where: {city: text, id_user }
    });
    
  }

  async addContact(contactData: ContactModelDto): Promise<any> {
    const contact = this.contactsRepository.create(contactData)
    return await this.contactsRepository.save(contact);
   }  

  async updateContact(id: number, contactData: ContactModelDto): Promise<any> {
    return await this.contactsRepository.update(id, contactData);

   }
}
