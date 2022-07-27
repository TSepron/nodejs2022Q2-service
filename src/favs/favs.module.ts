import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumFavs, ArtistFavs, TrackFavs } from './entities/fav.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtistFavs, AlbumFavs, TrackFavs]),
    ArtistModule,
    TrackModule,
    AlbumModule,
  ],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
