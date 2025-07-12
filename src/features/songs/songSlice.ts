import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Song, SongState } from "../../types/songTypes";
// import { Song, SongState } from "../../types/songTypes";

const initialState: SongState = {
  songs: [],
  loading: false,
  error: null,
  filter: {},
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.songs = action.payload;
      state.loading = false;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addSongSuccess(state, action: PayloadAction<Song>) {
      state.songs.unshift(action.payload);
    },
    updateSongSuccess(state, action: PayloadAction<Song>) {
   
      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
    },
    setFilter(state, action: PayloadAction<{ field: string; value: string }>) {
      const { field, value } = action.payload;
      state.filter = { ...state.filter, [field]: value };
    },
    clearFilter(state) {
      state.filter = {};
    },
  },
});

export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongSuccess,
  updateSongSuccess,
  deleteSongSuccess,
  setFilter,
  clearFilter,
} = songSlice.actions;

export const fetchSongs = () => ({ type: "songs/fetchSongs" });
export const addSong = (songData: any) => ({
  type: "songs/addSong",
  payload: songData,
});
export const updateSong = (id: string, songData: any) => ({
  type: "songs/updateSong",
  payload: { id, songData },
});
export const deleteSong = (id: string) => ({
  type: "songs/deleteSong",
  payload: id,
});
export const applyFilter = (filters: any) => ({
  type: "songs/applyFilter",
  payload: filters,
});

export default songSlice.reducer;
