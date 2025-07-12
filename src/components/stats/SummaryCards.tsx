import React from "react";
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import Card from "../ui/Card";
import type { Statistics } from "../../types/statsTypes";
// import { Statistics } from "../../types/statsTypes";

interface SummaryCardsProps {
  stats: Statistics;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ stats }) => {
  return (
    <div css={gridStyles}>
      <Card>
        <div css={cardContentStyles}>
          <h3 css={cardTitleStyles}>Total Songs</h3>
          <div css={cardValueStyles}>{stats.totalSongs}</div>
        </div>
      </Card>

      <Card>
        <div css={cardContentStyles}>
          <h3 css={cardTitleStyles}>Artists</h3>
          <div css={cardValueStyles}>{stats.totalArtists}</div>
        </div>
      </Card>

      <Card>
        <div css={cardContentStyles}>
          <h3 css={cardTitleStyles}>Albums</h3>
          <div css={cardValueStyles}>{stats.totalAlbums}</div>
        </div>
      </Card>

      <Card>
        <div css={cardContentStyles}>
          <h3 css={cardTitleStyles}>Genres</h3>
          <div css={cardValueStyles}>{stats.totalGenres}</div>
        </div>
      </Card>
    </div>
  );
};

const gridStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const cardContentStyles = css`
  padding: ${theme.spacing.md};
`;

const cardTitleStyles = css`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.sm};
`;

const cardValueStyles = css`
  font-size: ${theme.fontSizes.xxl};
  font-weight: 700;
  color: ${theme.colors.primary};
`;

export default SummaryCards;
