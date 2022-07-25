import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Artist {
  @PrimaryColumn('uuid')
  id: string; // uuid v4
  @Column('text')
  name: string;
  @Column({ type: 'bool', nullable: true })
  grammy: boolean;

  constructor(name: string, grammy: boolean = null) {
    this.id = uuidv4();
    this.name = name;
    this.grammy = grammy;
  }
}
