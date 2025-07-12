import { combineReducers } from "@reduxjs/toolkit";
import songReducer from "../features/songs/songSlice";
import statsReducer from "../features/stats/statsSlice";

const rootReducer = combineReducers({
  songs: songReducer,
  stats: statsReducer,
});

export default rootReducer;
