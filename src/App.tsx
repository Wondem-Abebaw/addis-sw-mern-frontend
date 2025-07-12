import { Routes, Route } from "react-router-dom";

import { fetchSongs } from "./features/songs/songSlice";

import { useAppDispatch } from "./store/store";
import { useNotification } from "./hooks/useNotification";
import Layout from "./components/layout/Layout";

import SongsPage from "./pages/SongsPage";
import StatsPage from "./pages/StatsPage";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();
  const { showNotification } = useNotification();

  useEffect(() => {
    // Initialize data
    dispatch(fetchSongs());
    // dispatch(fetchStatistics());

    // Show welcome notification
    showNotification("Welcome to Music Library!", "info");
  }, [dispatch, showNotification]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SongsPage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster position="bottom-right" richColors />
    </>
  );
}

export default App;
