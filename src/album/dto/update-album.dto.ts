import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
