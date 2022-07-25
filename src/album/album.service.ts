import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async _checkAndGetAlbumIfExists(id: string) {
    const album = await this.albumRepository.findOneBy({ id });

    if (album == null) {
      throw new HttpException('Not found album', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const { name, artistId, year } = createAlbumDto;
    const album = new Album(name, year, artistId);

    const newAlbum = await this.albumRepository.save(album);

    return newAlbum;
  }

  async findAll() {
    const result = await this.albumRepository.find()
    return result;
  }

  async findOne(id: string) {
    const album = await this._checkAndGetAlbumIfExists(id);

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { name, artistId, year } = updateAlbumDto;

    const album = await this._checkAndGetAlbumIfExists(id);

    album.name = name ?? album.name;
    album.artistId = artistId ?? album.artistId;
    album.year = year ?? album.year;

    const updatedAlbum = await this.albumRepository.save(album);

    return updatedAlbum;
  }

  async remove(id: string) {
    const albumForRemove = await this._checkAndGetAlbumIfExists(id);

    await this.albumRepository.remove(albumForRemove);
  }
}
