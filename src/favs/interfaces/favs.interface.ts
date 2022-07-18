interface Favorites {
  artistsIds: string[];
  albumsIds: string[];
  tracksIds: string[];
}

interface FavoritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

interface Resource {
  data: (Artist | Album | Track)[];
  type: string;
}
