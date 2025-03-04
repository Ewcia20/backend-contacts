
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contacts_data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_user: number;

  @Column()
  surname: string;

  @Column()
  firstname: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  city: string;
}