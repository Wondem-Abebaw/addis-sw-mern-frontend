// statsSaga.ts
import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  getTotalCounts,
  getSongsPerGenre,
  getArtistStats,
  getAlbumStats,
} from "../../api/statsAPI";
import {
  fetchStatsStart,
  fetchStatsSuccess,
  fetchStatsFailure,
} from "./statsSlice";

function* handleFetchStatistics(): Generator<any, void, any> {
  try {
    yield put(fetchStatsStart());

    const [totalCounts, songsPerGenre, artistStats, albumStats] = yield all([
      call(getTotalCounts),
      call(getSongsPerGenre),
      call(getArtistStats),
      call(getAlbumStats),
    ]);

    const combinedStats = {
      ...totalCounts,
      songsPerGenre,
      songsAndAlbumsPerArtist: artistStats,
      songsPerAlbum: albumStats,
    };

    yield put(fetchStatsSuccess(combinedStats));
  } catch (error: any) {
    yield put(fetchStatsFailure(error.message));
  }
}

export function* watchStatsSagas() {
  yield takeEvery("stats/fetchStatistics", handleFetchStatistics);
}
