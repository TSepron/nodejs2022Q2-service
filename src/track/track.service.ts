import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  _checkAndGetTrackIfExists(id: string) {
    const track = this.tracks.find((user) => user.id === id);

    if (track == null) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  create(createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto;
    const track = new Track(name, artistId, albumId, duration);

    this.tracks.push(track);

    return track;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const track = this._checkAndGetTrackIfExists(id);

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const { name, artistId, albumId, duration } = updateTrackDto;

    const track = this._checkAndGetTrackIfExists(id);

    track.name = name ?? track.name;
    track.artistId = artistId ?? track.artistId;
    track.albumId = albumId ?? track.albumId;
    track.duration = duration ?? track.duration;

    return track;
  }

  remove(id: string) {
    this._checkAndGetTrackIfExists(id);

    this.tracks = this.tracks.filter((track) => track.id !== id);
  }
}
