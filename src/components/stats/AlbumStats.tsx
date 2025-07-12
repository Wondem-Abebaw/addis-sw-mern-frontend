import React from "react";
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import Card from "../ui/Card";
import type { Statistics } from "../../types/statsTypes";
// import type { Statistics } from "../../types/statsTypes";

interface AlbumStatsProps {
  stats: Statistics;
}

const AlbumStats: React.FC<AlbumStatsProps> = ({ stats }) => {
  return (
    <Card title="Albums">
      <div css={tableContainerStyles}>
        <div css={tableStyles}>
          <div css={tableHeaderStyles}>
            <div css={tableCellStyles}>Album</div>
            <div css={tableCellStyles}>Artist</div>
            <div css={tableCellStyles}>Songs</div>
          </div>

          {stats.songsPerAlbum.map((album, index) => (
            <div key={index} css={tableRowStyles}>
              <div css={tableCellStyles}>{album.album}</div>
              <div css={tableCellStyles}>{album.artist}</div>
              <div css={tableCellStyles}>{album.songs}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

const tableStyles = css`
  width: 100%;
`;

const tableHeaderStyles = css`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.light};
  font-weight: 600;
  border-bottom: 1px solid ${theme.colors.border};
`;

const tableRowStyles = css`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  &:nth-of-type(even) {
    background-color: ${theme.colors.light};
  }
`;

const tableCellStyles = css`
  padding: ${theme.spacing.xs} 0;
`;
const tableContainerStyles = css`
  overflow-x: auto;
  width: 100%;
`;

export default AlbumStats;
