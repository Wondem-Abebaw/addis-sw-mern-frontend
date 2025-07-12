import { all } from "redux-saga/effects";
import { watchSongSagas } from "../features/songs/songSaga";
import { watchStatsSagas } from "../features/stats/statsSaga";

export default function* rootSaga() {
  yield all([watchSongSagas(), watchStatsSagas()]);
}
