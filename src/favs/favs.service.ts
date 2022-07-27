import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import { AlbumFavs, ArtistFavs, TrackFavs } from './entities/fav.entity';

@Injectable()
export class FavsService {
  private favs: Favorites = {
    artistsIds: [],
    albumsIds: [],
    tracksIds: [],
  };

  constructor(
    @InjectRepository(ArtistFavs)
    private readonly artistFavsRepository: Repository<ArtistFavs>,
    @InjectRepository(AlbumFavs)
    private readonly albumFavsRepository: Repository<AlbumFavs>,
    @InjectRepository(TrackFavs)
    private readonly trackFavsRepository: Repository<TrackFavs>,
  ) {}

  async findAll(): Promise<FavoritesRepsonse> {
    const [artists, albums, tracks] = await Promise.all([
      this.artistFavsRepository.find({
        relations: {
          artist: true,
        },
      }),
      this.albumFavsRepository.find({
        relations: {
          album: true,
        },
      }),
      this.trackFavsRepository.find({
        relations: {
          track: true,
        },
      }),
    ]);

    return {
      artists: artists.map(({ artist }) => artist),
      albums: albums.map(({ album }) => album),
      tracks: tracks.map(({ track }) => track),
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
  async addTrack(id: string, tracks: Track[]) {
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
    const trackFav = this.trackFavsRepository.create({ track });
    const savedTrack = await this.trackFavsRepository.save(trackFav);

    return savedTrack;
  }

  async removeTrack(id: string, tracks: Track[]) {
    this._checkResourceIfExistsOnDelete(id, {
      data: tracks,
      type: 'track',
    });

    const trackFav = await this.trackFavsRepository.findBy({
      track: { id },
    });

    await this.trackFavsRepository.remove(trackFav);
  }

  // artist
  async addArtist(id: string, artists: Artist[]) {
    const artist = this._checkAndGetResourceIfExistsOnPost(id, {
      data: artists,
      type: 'artist',
    }) as Artist;

    const artistFav = this.artistFavsRepository.create({ artist });
    const savedArtist = await this.artistFavsRepository.save(artistFav);

    return savedArtist;
  }

  async removeArtist(id: string, artists: Artist[]) {
    this._checkResourceIfExistsOnDelete(id, {
      data: artists,
      type: 'artist',
    });

    const artistFav = await this.artistFavsRepository.findBy({
      artist: { id },
    });

    await this.artistFavsRepository.remove(artistFav);
  }

  // album
  async addAlbum(id: string, albums: Album[]) {
    const album = this._checkAndGetResourceIfExistsOnPost(id, {
      data: albums,
      type: 'album',
    }) as Album;

    const albumFav = this.albumFavsRepository.create({ album });
    const savedAlbum = await this.albumFavsRepository.save(albumFav);

    return savedAlbum;
  }

  async removeAlbum(id: string, albums: Album[]) {
    this._checkResourceIfExistsOnDelete(id, {
      data: albums,
      type: 'album',
    });

    const albumFav = await this.albumFavsRepository.findBy({
      album: { id },
    });

    await this.albumFavsRepository.remove(albumFav);
  }
}
