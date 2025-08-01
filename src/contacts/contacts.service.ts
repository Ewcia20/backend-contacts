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


  async getCountContacts(id_user: number, offset: number = 0, howmany: number = 10) {
  const contacts = await this.contactsRepository.find({
    where: { id_user },
    order: { id: 'DESC' },
    skip: offset,
    take: howmany,
  });
  const count = await this.contactsRepository.count({ where: { id_user } });
  return { contacts, count };
}
  
  async getContacts(id_user: number): Promise<Contacts_data[]> {
    return await this.contactsRepository.find({
      where: { id_user },
      skip: 0,
      take: 10,
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
  async searchContacts(dataParam: object | any, id_user: number): Promise<Contacts_data[] | null> {
  const data = dataParam.searchData;
  const text = dataParam.searchText;

  if (data === 'surname') {
    return await this.contactsRepository.find({
      where: {
        surname: Like(`${text}%`), // zaczyna się od wpisanych liter
        id_user
      },
      order: { id: 'DESC' }
    });
  }
  if (data === 'firstname') {
    return await this.contactsRepository.find({
      where: {
        firstname: Like(`${text}%`),
        id_user
      },
      order: { id: 'DESC' }
    });
  }
  if (data === 'city') {
    return await this.contactsRepository.find({
      where: {
        city: Like(`${text}%`),
        id_user
      },
      order: { id: 'DESC' }
    });
  }

  // domyślnie szukaj po mieście
  return await this.contactsRepository.find({
    where: { city: Like(`${text}%`), id_user },
    order: { id: 'DESC' }
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
