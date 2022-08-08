import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthUser {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @Column('text')
  login: string;
  @Column('text')
  password: string;
}
