import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

@Entity()
export class ArtistFavs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Artist, { onDelete: 'CASCADE' })
  @JoinColumn()
  artist: Artist;
}

@Entity()
export class AlbumFavs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Album, { onDelete: 'CASCADE' })
  @JoinColumn()
  album: Album;
}

@Entity()
export class TrackFavs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Track, { onDelete: 'CASCADE' })
  @JoinColumn()
  track: Track;
}
