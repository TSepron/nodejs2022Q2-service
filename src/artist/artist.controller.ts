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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: ParamIdDto) {
    return this.artistService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: ParamIdDto,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(params.id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() params: ParamIdDto) {
    const trackWithSuchArtistId = (await this.trackService.findAll()).find(
      (track) => track.artistId === params.id,
    );

    if (trackWithSuchArtistId) {
      await this.trackService.resetArtistId(
        trackWithSuchArtistId.id,
        params.id,
      );
    }
    return await this.artistService.remove(params.id);
  }
}
