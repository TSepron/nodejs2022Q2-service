import { IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
