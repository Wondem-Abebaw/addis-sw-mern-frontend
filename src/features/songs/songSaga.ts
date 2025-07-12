import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  getSongs,
  createSong,
  updateSong,
  deleteSong,
  filterSongs,
} from "../../api/songAPI";
import {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongSuccess,
  updateSongSuccess,
  deleteSongSuccess,
} from "./songSlice";
import { toast } from "sonner";

function* handleFetchSongs(): Generator<any, void, any> {
  try {
    yield put(fetchSongsStart());
    const songs = yield call(getSongs);
    console.log("songsinitial", songs);
    yield put(fetchSongsSuccess(songs.data));
  } catch (error:any) {
    yield put(fetchSongsFailure(error?.message));
  }
}

function* handleAddSong(action: any): Generator<any, void, any> {
  try {
    // const { showNotification } = useNotification();
    const newSong = yield call(createSong, action.payload);
    // console.log("newSong", newSong);
    yield put(addSongSuccess(newSong.data));
    toast.success("Song added successfully!");
  } catch (error: any) {
    toast.error(`Error adding song: ${error.message}`);
  }
}

function* handleUpdateSong(action: any): Generator<any, void, any> {
  // console.log("Updating song with action:", action.payload);
  try {
    // const { showNotification } = useNotification();
    const updatedSong = yield call(
      updateSong,
      action.payload.id,
      action.payload.songData
    );
    // const normalizedData = updatedSong.data; // response.data.data in your case
    console.log("updatedSong", updatedSong);
    // console.log("normalizedSong", normalizedData);
    yield put(updateSongSuccess(updatedSong));
    toast.success("Song updated successfully!");
  } catch (error: any) {
    toast.error(`Error updating song: ${error.message}`);
  }
}

function* handleDeleteSong(action: any): Generator<any, void, any> {
  try {
    // const { showNotification } = useNotification();
    yield call(deleteSong, action.payload);
    yield put(deleteSongSuccess(action.payload));
    toast.success("Song deleted successfully!");
  } catch (error: any) {
    toast.error(`Error deleting song: ${error.message}`);
  }
}

function* handleApplyFilter(action: any): Generator<any, void, any> {
  // console.log("Applying filter with action:", action.payload);
  try {
    yield put(fetchSongsStart());
    const filters = action.payload;
    const filteredSongs = yield call(filterSongs, filters);
    yield put(fetchSongsSuccess(filteredSongs.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

export function* watchSongSagas() {
  yield takeEvery("songs/fetchSongs", handleFetchSongs);
  yield takeEvery("songs/addSong", handleAddSong);
  yield takeEvery("songs/updateSong", handleUpdateSong);
  yield takeEvery("songs/deleteSong", handleDeleteSong);
  yield takeEvery("songs/applyFilter", handleApplyFilter);
}
