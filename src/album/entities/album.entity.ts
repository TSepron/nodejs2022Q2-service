import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Album {
  @PrimaryColumn('uuid')
  id: string; // uuid v4

  @Column('text')
  name: string;

  @Column({ type: 'int', nullable: true })
  year: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null; // refers to Artist

  constructor(name: string, year: number, artistId: string | null = null) {
    this.id = uuidv4();
    this.name = name;
    this.artistId = artistId;
    this.year = year;
  }
}
