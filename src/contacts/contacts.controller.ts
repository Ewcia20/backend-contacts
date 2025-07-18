import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contacts_data } from './contact.entity';
import { ContactModelDto } from './contact.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';

@Controller('contacts')

export class ContactsController {

    constructor(private readonly contactsService: ContactsService) {}

   @Get('/count/:idUser/:offset/:howmany')
   @UseGuards(JwtAuthGuard)
    getCountContacts(@Param() params: any) {
    return this.contactsService.getCountContacts(
        Number(params.idUser),
        Number(params.offset),
        Number(params.howmany)
    );
    }
    @Get(':idUser')
    @UseGuards(JwtAuthGuard)
    getContacts(@Param() params: any): Promise<Contacts_data[]> {
        return this.contactsService.getContacts(params.idUser);
    }
    @Get(':idContact/:idUser')
    @UseGuards(JwtAuthGuard)
    getContact(@Param() params: any): Promise<Contacts_data> {
        return this.contactsService.getContact(params.idContact, params.idUser);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    delContact(@Param() id: number): Promise<void> {
        return this.contactsService.removeContact(id);
    }

    @Post('/search')
    @UseGuards(JwtAuthGuard)
    searchContacts(@Body() params: any): Promise<Contacts_data[] | null> {
        return this.contactsService.searchContacts(params.data, params.idUser);

    }

    @Post()
    @UseGuards(JwtAuthGuard)
    addContact(@Body() contactData: ContactModelDto): Promise<Contacts_data> {
        return this.contactsService.addContact(contactData);

    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    modContact(@Param() id: number, @Body() contactData: ContactModelDto): Promise<Contacts_data> {  
        return this.contactsService.updateContact(id, contactData);

    }

}
