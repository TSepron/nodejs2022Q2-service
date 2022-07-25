import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async _checkAndGetTrackIfExists(id: string) {
    const track = await this.trackRepository.findOneBy({ id });

    if (track == null) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  async create(createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto;
    const track = new Track(name, artistId, albumId, duration);

    const newTrack = await this.trackRepository.save(track);

    return newTrack;
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this._checkAndGetTrackIfExists(id);

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const { name, artistId, albumId, duration } = updateTrackDto;

    const track = await this._checkAndGetTrackIfExists(id);

    track.name = name ?? track.name;
    track.artistId = artistId ?? track.artistId;
    track.albumId = albumId ?? track.albumId;
    track.duration = duration ?? track.duration;

    const updatedTrack = await this.trackRepository.save(track);

    return updatedTrack;
  }

  async remove(id: string) {
    const trackForDelete = await this._checkAndGetTrackIfExists(id);

    await this.trackRepository.remove(trackForDelete);
  }

  async resetAlbumId(trackId: string, albumId: string) {
    const track = await this._checkAndGetTrackIfExists(trackId);

    if (track.albumId === albumId) {
      track.albumId = null;
    }

    const updatedTrack = await this.trackRepository.save(track);
    return updatedTrack;
  }

  async resetArtistId(trackId: string, artistId: string) {
    const track = await this._checkAndGetTrackIfExists(trackId);

    if (track.artistId === artistId) {
      track.artistId = null;
    }

    const updatedTrack = await this.trackRepository.save(track);
    return updatedTrack;
  }
}
