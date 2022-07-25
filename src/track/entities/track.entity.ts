import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Track {
  @PrimaryColumn('uuid')
  id: string; // uuid v4

  @Column('text')
  name: string;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null; // refers to Artist

  @Column({ type: 'uuid', nullable: true })
  albumId: string | null; // refers to Album

  @Column({ type: 'int', nullable: true })
  duration: number; // integer number

  constructor(
    name: string,
    artistId: string | null = null,
    albumId: string | null = null,
    duration: number,
  ) {
    this.id = uuidv4();
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }
}
