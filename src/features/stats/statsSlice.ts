// statsSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Statistics, StatsState } from "../../types/statsTypes";
// import { Statistics, StatsState } from "../../types/statsTypes";

const initialState: StatsState = {
  statistics: null,
  loading: false,
  error: null,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    fetchStatsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStatsSuccess(state, action: PayloadAction<Statistics>) {
      state.statistics = action.payload;
      state.loading = false;
    },
    fetchStatsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStatsStart, fetchStatsSuccess, fetchStatsFailure } =
  statsSlice.actions;

export const fetchStatistics = () => ({ type: "stats/fetchStatistics" });

export default statsSlice.reducer;
