import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from 'src/track/track.module';
import { Artist } from './entities/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Artist]), TrackModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
