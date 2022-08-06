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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ParamIdDto } from 'src/common/dto/id.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('track')
@UseGuards(AuthGuard('jwt'))
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: ParamIdDto) {
    return this.trackService.findOne(params.id);
  }

  @Put(':id')
  update(@Param() params: ParamIdDto, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(params.id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: ParamIdDto) {
    return this.trackService.remove(params.id);
  }
}
