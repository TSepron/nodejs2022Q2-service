import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ParamIdDto } from 'src/common/dto/id.dto';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: ParamIdDto) {
    return this.albumService.findOne(params.id);
  }

  @Put(':id')
  update(@Param() params: ParamIdDto, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(params.id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: ParamIdDto) {
    const trackWithSuchAlbumId = this.trackService
      .findAll()
      .find((track) => track.albumId === params.id);

    if (trackWithSuchAlbumId) {
      this.trackService.resetAlbumId(trackWithSuchAlbumId.id, params.id);
    }
    return this.albumService.remove(params.id);
  }
}
