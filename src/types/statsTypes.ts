// statsType.ts
export interface Statistics {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsPerGenre: { _id: string; count: number }[];
  songsAndAlbumsPerArtist: { artist: string; songs: number; albums: number }[];
  songsPerAlbum: { artist: string; album: string; songs: number }[];
}

export interface StatsState {
  statistics: Statistics | null;
  loading: boolean;
  error: string | null;
}
