import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async _checkAndGetArtistIfExists(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (artist == null) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  async create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;
    const artist = new Artist(name, grammy);

    const newArtist = await this.artistRepository.save(artist);

    return newArtist;
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = await this._checkAndGetArtistIfExists(id);

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const { name, grammy } = updateArtistDto;

    const artist = await this._checkAndGetArtistIfExists(id);

    artist.name = name ?? artist.name;
    artist.grammy = grammy ?? artist.grammy;

    const updatedArtist = await this.artistRepository.save(artist);

    return updatedArtist;
  }

  async remove(id: string) {
    const artistForRemove = await this._checkAndGetArtistIfExists(id);

    await this.artistRepository.remove(artistForRemove);
  }
}
