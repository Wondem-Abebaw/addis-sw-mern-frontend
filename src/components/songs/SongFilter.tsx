import { css } from "@emotion/react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Button from "../ui/Button";
import {
  setFilter,
  clearFilter,
  applyFilter,
} from "../../features/songs/songSlice";
import * as React from "react";

import theme from "../../styles/theme";

const SongFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filter } = useAppSelector((state) => state.songs);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
   dispatch(setFilter({ field: name, value }));
  };

  const handleApplyFilter = () => {
    dispatch(applyFilter(filter));
  };

  const handleClearFilter = () => {
    dispatch(clearFilter());
    dispatch(applyFilter({}));
  };

  return (
    <div css={filterContainerStyles}>
      <div css={filterGroupStyles}>
        <label htmlFor="genre">Genre</label>
        <select
          id="genre"
          name="genre"
          value={filter.genre || ""}
          onChange={handleFilterChange}
        >
          <option value="">All Genres</option>
          <option value="Rock">Rock</option>
          <option value="Pop">Pop</option>
          <option value="Jazz">Jazz</option>
          <option value="Classical">Classical</option>
          <option value="Hip Hop">Hip Hop</option>
          <option value="R&B">R&B</option>
          <option value="Country">Country</option>
          <option value="Electronic">Electronic</option>
        </select>
      </div>

      <div css={filterGroupStyles}>
        <label htmlFor="artist">Artist</label>
        <input
          type="text"
          id="artist"
          name="artist"
          value={filter.artist || ""}
          onChange={handleFilterChange}
          placeholder="Filter by artist"
        />
      </div>

      <div css={filterGroupStyles}>
        <label htmlFor="album">Album</label>
        <input
          type="text"
          id="album"
          name="album"
          value={filter.album || ""}
          onChange={handleFilterChange}
          placeholder="Filter by album"
        />
      </div>

      <div css={filterActionsStyles}>
        <Button variant="primary" onClick={handleApplyFilter}>
          Apply Filters
        </Button>
        <Button variant="secondary" onClick={handleClearFilter}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

const filterContainerStyles = css`
  background: white;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.boxShadow.sm};
  margin-bottom: ${theme.spacing.lg};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  align-items: flex-end;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const filterGroupStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  label {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.textLight};
  }

  input,
  select {
    padding: ${theme.spacing.sm};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.fontSizes.md};
  }
`;

const filterActionsStyles = css`
  display: flex;
  gap: ${theme.spacing.sm};
  align-self: flex-end;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export default SongFilter;
