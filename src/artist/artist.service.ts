import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  _checkAndGetArtistIfExists(id: string) {
    const artist = this.artists.find((user) => user.id === id);

    if (artist == null) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;
    const artist = new Artist(name, grammy);

    this.artists.push(artist);

    return artist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const artist = this._checkAndGetArtistIfExists(id);

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const { name, grammy } = updateArtistDto;

    const artist = this._checkAndGetArtistIfExists(id);

    artist.name = name ?? artist.name;
    artist.grammy = grammy ?? artist.grammy;

    return artist;
  }

  remove(id: string) {
    this._checkAndGetArtistIfExists(id);

    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
