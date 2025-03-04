
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()

export class Users {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  pass: string;

  @Column()
  description: string; 
}


