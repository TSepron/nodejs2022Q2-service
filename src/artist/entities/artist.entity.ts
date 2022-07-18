import { v4 as uuidv4 } from 'uuid';

export class Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  constructor(name: string, grammy: boolean = null) {
    this.id = uuidv4();
    this.name = name;
    this.grammy = grammy;
  }
}
