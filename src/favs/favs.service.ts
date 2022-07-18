import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';

@Injectable()
export class FavsService {
  private favs: Favorites = {
    artistsIds: [],
    albumsIds: [],
    tracksIds: [],
  };

  findAll(
    tracks: Track[],
    artists: Artist[],
    albums: Album[],
  ): FavoritesRepsonse {
    return {
      artists: artists.filter((artist) =>
        this.favs.artistsIds.includes(artist.id),
      ),
      albums: albums.filter((album) => this.favs.albumsIds.includes(album.id)),
      tracks: tracks.filter((track) => this.favs.tracksIds.includes(track.id)),
    };
  }

  _checkAndGetResourceIfExistsOnPost(id: string, resource: Resource) {
    const oneResource = resource.data.find((r) => r.id === id);

    if (oneResource == null) {
      throw new HttpException(
        `${resource.type} with id === ${id} don't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return oneResource;
  }

  _checkResourceIfExistsOnDelete(id: string, resource: Resource) {
    const oneResource = resource.data.find((r) => r.id === id);

    if (oneResource == null) {
      throw new HttpException(
        `${resource.type} with id === ${id} not a favorite`,
        HttpStatus.NOT_FOUND,
      );
    }

    return true;
  }

  // track
  addTrack(id: string, tracks: Track[]) {
    const track = this._checkAndGetResourceIfExistsOnPost(id, {
      data: tracks,
      type: 'track',
    }) as Track;

    // if (track) {
    //   return {
    //     albumId: track.albumId,
    //     artistId: track.artistId,
    //     duration: track.duration,
    //     id: track.duration,
    //     name: track.name,
    //   };
    // }

    this.favs.tracksIds.push(id);

    return track;
  }

  removeTrack(id: string, tracks: Track[]) {
    this._checkResourceIfExistsOnDelete(id, {
      data: tracks,
      type: 'track',
    });

    this.favs.tracksIds = this.favs.tracksIds.filter(
      (trackId) => trackId !== id,
    );
  }

  // artist
  addArtist(id: string, artists: Artist[]) {
    const artist = this._checkAndGetResourceIfExistsOnPost(id, {
      data: artists,
      type: 'artist',
    }) as Artist;

    this.favs.artistsIds.push(id);

    return artist;
  }

  removeArtist(id: string, artists: Artist[]) {
    this._checkResourceIfExistsOnDelete(id, {
      data: artists,
      type: 'artist',
    });

    this.favs.artistsIds = this.favs.artistsIds.filter(
      (artistId) => artistId !== id,
    );
  }

  // album
  addAlbum(id: string, albums: Album[]) {
    const album = this._checkAndGetResourceIfExistsOnPost(id, {
      data: albums,
      type: 'album',
    }) as Album;

    this.favs.albumsIds.push(id);

    return album;
  }

  removeAlbum(id: string, albums: Album[]) {
    this._checkResourceIfExistsOnDelete(id, {
      data: albums,
      type: 'album',
    });

    this.favs.albumsIds = this.favs.albumsIds.filter(
      (albumId) => albumId !== id,
    );
  }
}
