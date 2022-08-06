import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ParamIdDto } from 'src/common/dto/id.dto';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('album')
@UseGuards(AuthGuard('jwt'))
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
  async remove(@Param() params: ParamIdDto) {
    const tracks = await this.trackService.findAll();
    const trackWithSuchAlbumId = tracks.find(
      (track) => track.albumId === params.id,
    );

    if (trackWithSuchAlbumId) {
      await this.trackService.resetAlbumId(trackWithSuchAlbumId.id, params.id);
    }
    return await this.albumService.remove(params.id);
  }
}
