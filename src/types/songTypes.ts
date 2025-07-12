export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SongFormData {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface SongState {
  songs: Song[];
  loading: boolean;
  error: string | null;
  filter: {
    genre?: string;
    artist?: string;
    album?: string;
  };
}
