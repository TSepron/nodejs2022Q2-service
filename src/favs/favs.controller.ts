import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import { ParamIdDto } from 'src/common/dto/id.dto';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('favs')
@UseGuards(AuthGuard('jwt'))
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}

  @Get()
  async findAll() {
    return this.favsService.findAll();
  }

  // track
  @Post('track/:id')
  async createTrack(@Param() params: ParamIdDto) {
    const tracks = await this.trackService.findAll();
    return this.favsService.addTrack(params.id, tracks);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param() params: ParamIdDto) {
    const tracks = await this.trackService.findAll();
    return this.favsService.removeTrack(params.id, tracks);
  }

  // artist
  @Post('artist/:id')
  async createArtist(@Param() params: ParamIdDto) {
    const artists = await this.artistService.findAll();
    return this.favsService.addArtist(params.id, artists);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param() params: ParamIdDto) {
    const artists = await this.artistService.findAll();
    return this.favsService.removeArtist(params.id, artists);
  }

  // album
  @Post('album/:id')
  async addAlbum(@Param() params: ParamIdDto) {
    const albums = await this.albumService.findAll();
    return this.favsService.addAlbum(params.id, albums);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param() params: ParamIdDto) {
    const albums = await this.albumService.findAll();
    return this.favsService.removeAlbum(params.id, albums);
  }
}
