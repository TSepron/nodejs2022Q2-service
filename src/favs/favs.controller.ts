import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import { ParamIdDto } from 'src/common/dto/id.dto';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}

  @Get()
  findAll() {
    const tracks = this.trackService.findAll();
    const artists = this.artistService.findAll();
    const albums = this.albumService.findAll();
    return this.favsService.findAll(tracks, artists, albums);
  }

  // track
  @Post('track/:id')
  createTrack(@Param() params: ParamIdDto) {
    const tracks = this.trackService.findAll();
    return this.favsService.addTrack(params.id, tracks);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param() params: ParamIdDto) {
    const tracks = this.trackService.findAll();
    return this.favsService.removeTrack(params.id, tracks);
  }

  // artist
  @Post('artist/:id')
  createArtist(@Param() params: ParamIdDto) {
    const artists = this.artistService.findAll();
    return this.favsService.addArtist(params.id, artists);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param() params: ParamIdDto) {
    const artists = this.artistService.findAll();
    return this.favsService.removeArtist(params.id, artists);
  }

  // album
  @Post('album/:id')
  addAlbum(@Param() params: ParamIdDto) {
    const albums = this.albumService.findAll();
    return this.favsService.addAlbum(params.id, albums);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param() params: ParamIdDto) {
    const albums = this.albumService.findAll();
    return this.favsService.removeAlbum(params.id, albums);
  }
}
