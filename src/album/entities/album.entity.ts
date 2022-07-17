import { v4 as uuidv4 } from 'uuid';

export class Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  constructor(name: string, year: number, artistId: string | null = null) {
    this.id = uuidv4();
    this.name = name;
    this.artistId = artistId;
    this.year = year;
  }
}
