import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  _checkAndGetAlbumIfExists(id: string) {
    const album = this.albums.find((user) => user.id === id);

    if (album == null) {
      throw new HttpException('Not found album', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const { name, artistId, year } = createAlbumDto;
    const album = new Album(name, year, artistId);

    this.albums.push(album);

    return album;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const album = this._checkAndGetAlbumIfExists(id);

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { name, artistId, year } = updateAlbumDto;

    const album = this._checkAndGetAlbumIfExists(id);

    album.name = name ?? album.name;
    album.artistId = artistId ?? album.artistId;
    album.year = year ?? album.year;

    return album;
  }

  remove(id: string) {
    this._checkAndGetAlbumIfExists(id);

    this.albums = this.albums.filter((track) => track.id !== id);
  }
}
