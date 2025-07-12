import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { useAppDispatch } from "../store/store";
import SongList from "../components/songs/SongList";
import { fetchSongs } from "../features/songs/songSlice";

const SongsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  return (
    <div css={containerStyle}>
      {/* <h1 className="page-title">Song Library</h1> */}
      <SongList />
    </div>
  );
};
const containerStyle = css`
  min-height: 100vh;
  background-image: linear-gradient(to bottom right, #f5f3ff, #eff6ff, #e0e7ff);
`;
export default SongsPage;
