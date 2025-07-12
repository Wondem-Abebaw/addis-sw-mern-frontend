import React from "react";
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import Card from "../ui/Card";
import type { Statistics } from "../../types/statsTypes";
// import { Statistics } from "../../types/statsTypes";

interface ArtistStatsProps {
  stats: Statistics;
}

const ArtistStats: React.FC<ArtistStatsProps> = ({ stats }) => {
  return (
    <Card title="Artists">
      <div css={tableContainerStyles}>
        <div css={tableStyles}>
          <div css={tableHeaderStyles}>
            <div css={tableCellStyles}>Artist</div>
            <div css={tableCellStyles}>Songs</div>
            <div css={tableCellStyles}>Albums</div>
          </div>

          {stats.songsAndAlbumsPerArtist.map((artist) => (
            <div key={artist.artist} css={tableRowStyles}>
              <div css={tableCellStyles}>{artist.artist}</div>
              <div css={tableCellStyles}>{artist.songs}</div>
              <div css={tableCellStyles}>{artist.albums}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
const tableContainerStyles = css`
  overflow-x: auto;
  width: 100%;
`;
const tableStyles = css`
  width: 100%;
`;

const tableHeaderStyles = css`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.light};
  font-weight: 600;
  border-bottom: 1px solid ${theme.colors.border};
`;

const tableRowStyles = css`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
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

export default ArtistStats;
