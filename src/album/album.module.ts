import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from 'src/track/track.module';
import { Album } from './entities/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), TrackModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
