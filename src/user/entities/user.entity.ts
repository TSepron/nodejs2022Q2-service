import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string; // uuid v4
  @Column({ type: 'text', nullable: true })
  login: string;
  @Column({ type: 'text', nullable: true })
  password: string;
  @Column('bigint')
  version: number; // integer number, increments on update
  @Column('bigint')
  createdAt: number; // timestamp of creation
  @Column('bigint')
  updatedAt: number; // timestamp of last update

  constructor(login: string, password: string) {
    this.id = uuidv4();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = this.updatedAt = Date.now();
  }
}
