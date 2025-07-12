import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import { useAppDispatch, useAppSelector } from "../../store/store";
import SongItem from "./SongItem";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import SongForm from "./SongForm";
import Loader from "../ui/Loader";
import SongFilter from "./SongFilter";
import {
  addSong,
  deleteSong,
  updateSong,
} from "../../features/songs/songSlice";
import type { Song } from "../../types/songTypes";
// import { createSong, deleteSong, updateSong } from "../../api/songAPI";
import SongItemSkeleton from "./song-skeloton";

const SongList: React.FC = () => {
  const dispatch = useAppDispatch();

  const { songs, loading, error } = useAppSelector((state) => state.songs);
  // console.log("Songs:", songs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState<Song | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAddSong = () => {
    setCurrentSong(null);
    setIsModalOpen(true);
  };

  const handleEditSong = (song: Song) => {
    setCurrentSong(song);
    setIsModalOpen(true);
  };

  const handleDeleteSong = (id: string) => {
    const song = songs.find((s: Song) => s._id === id);
    setSongToDelete(song || null);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (songToDelete) {
      setIsDeleting(true);
      dispatch(deleteSong(songToDelete._id));
    }
  };

  // Watch for loading to become false after deleting
  useEffect(() => {
    if (isDeleting && !loading && isDeleteModalOpen) {
      setIsDeleteModalOpen(false);
      setSongToDelete(null);
      setIsDeleting(false);
    }
  }, [loading, isDeleting, isDeleteModalOpen]);

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSongToDelete(null);
  };

  const handleSubmit = (songData: any) => {
    if (currentSong) {
      // console.log("currentSong", currentSong);
      dispatch(updateSong(currentSong._id, songData));
    } else {
      dispatch(addSong(songData));
    }
    setIsModalOpen(false);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div css={headerStyles}>
        <h2>Song Library</h2>
        <div css={buttonGroupStyles}>
          <Button
            variant={showFilters ? "secondary" : "primary"}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          <Button variant="success" onClick={handleAddSong}>
            Add New Song
          </Button>
        </div>
      </div>

      {showFilters && <SongFilter />}
      <>
        {loading ? (
          <div css={listStyles}>
            {[...Array(6)].map((_, index) => (
              <SongItemSkeleton key={index} />
            ))}
          </div>
        ) : songs?.length === 0 ? (
          <div css={emptyStateStyles}>
            <p>No songs found. Add your first song!</p>
            <Button variant="success" onClick={handleAddSong}>
              Add Song
            </Button>
          </div>
        ) : (
          <div css={listStyles}>
            {songs &&
              songs?.map((song) => (
                <SongItem
                  key={song._id}
                  song={song}
                  onEdit={handleEditSong}
                  onDelete={handleDeleteSong}
                />
              ))}
          </div>
        )}
      </>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentSong ? "Edit Song" : "Add New Song"}
      >
        <SongForm
          onSubmit={handleSubmit}
          initialData={currentSong}
          isSubmitting={loading}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        title="Delete Song"
      >
        <div style={{ textAlign: "center" }}>
          <p>
            Are you sure you want to delete <b>{songToDelete?.title}</b>?
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              marginTop: 24,
            }}
          >
            <Button
              variant="danger"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
            <Button
              variant="secondary"
              onClick={handleCancelDelete}
              disabled={isDeleting}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const headerStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const buttonGroupStyles = css`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;

  @media (max-width: 480px) {
    width: 100%;

    button {
      flex: 1;
    }
  }
`;

const listStyles = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.lg};
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  overflow: visible;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1200px) {
    padding-left: 55px;
    padding-right: 55px;
  }
`;

const emptyStateStyles = css`
  text-align: center;
  padding: ${theme.spacing.xxl} 0;
  background: white;
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.boxShadow.sm};
  @media (max-width: 480px) {
    padding: ${theme.spacing.lg} 0;
  }

  p {
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.textLight};
  }
`;

export default SongList;
