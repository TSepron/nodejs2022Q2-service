import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

export class User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor(login: string, password: string) {
    this.id = uuidv4();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = this.updatedAt = Date.now();
  }
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;
}
