import React, { useState, useRef } from "react";
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import Button from "../ui/Button";
import type { Song } from "../../types/songTypes";
import DropdownMenu from "../ui/DropDownMenu";

interface SongItemProps {
  song: Song;
  onEdit: (song: Song) => void;
  onDelete: (id: string) => void;
}

const genreColors: Record<string, { bg: string; color: string }> = {
  Rock: { bg: "#fdecea", color: "#e74c3c" },
  Pop: { bg: "#fce4ec", color: "#d81b60" },
  Jazz: { bg: "#fff9e1", color: "#fbc02d" },
  Classical: { bg: "#f3e8ff", color: "#8e24aa" },
  "Hip Hop": { bg: "#e3f2fd", color: "#1976d2" },
  Electronic: { bg: "#e8f5e9", color: "#43a047" },
  Country: { bg: "#fff3e0", color: "#fb8c00" },
};

const SongItem: React.FC<SongItemProps> = ({ song, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const genreStyle = genreColors[song.genre] || {
    bg: "#f3f4f6",
    color: "#374151",
  };

  return (
    <div css={songItemStyles}>
      <div css={headerRowStyles}>
        <div css={iconAndTitleStyles}>
          <div css={musicIconStyles}>
            {/* Music SVG icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="music-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#7c3aed" />
                  <stop offset="1" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <rect
                width="100%"
                height="100%"
                rx="8"
                fill="url(#music-gradient)"
              />
              <path
                d="M9 17V5l10-2v12"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="17" r="3" fill="#fff" />
              <circle cx="19" cy="15" r="3" fill="#fff" />
            </svg>
          </div>
          <div css={titleArtistStyles}>
            <h3 css={songTitleStyles}>{song.title}</h3>
            <p css={artistStyles}>by {song.artist}</p>
          </div>
        </div>
        <div css={menuWrapperStyles}>
          <DropdownMenu
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            button={
              <button
                onClick={() => setMenuOpen((v) => !v)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 8,
                  borderRadius: "50%",
                  fontSize: 20,
                }}
                aria-label="More actions"
              >
                &#8942;
              </button>
            }
            anchorRef={anchorRef}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  padding: "8px 16px",
                  textAlign: "left",
                  cursor: "pointer",
                  width: "100%",
                }}
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(song);
                }}
              >
                Edit
              </button>
              <button
                style={{
                  background: "none",
                  border: "none",
                  padding: "8px 16px",
                  textAlign: "left",
                  cursor: "pointer",
                  color: "#e74c3c",
                  width: "100%",
                }}
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(song._id);
                }}
              >
                Delete
              </button>
            </div>
          </DropdownMenu>
        </div>
      </div>
      <div css={cardContentStyles}>
        <div>
          <p css={albumLabelStyles}>Album</p>
          <p css={albumValueStyles}>{song.album}</p>
        </div>
        <div>
          <p css={genreLabelStyles}>Genre</p>
          <span css={genrePillStyles(genreStyle.bg, genreStyle.color)}>
            {song.genre}
          </span>
        </div>
      </div>
    </div>
  );
};

const songItemStyles = css`
  background: white;
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.boxShadow.sm};
  min-height: 220px;
  padding: 28px 24px 24px 24px;
  margin-bottom: ${theme.spacing.lg};
  transition: box-shadow 0.2s, background-color 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    background-color: ${theme.colors.light};
    box-shadow: ${theme.boxShadow.md};
    transform: scale(1.03);
  }
`;

const headerRowStyles = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 18px;
`;

const iconAndTitleStyles = css`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const musicIconStyles = css`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const titleArtistStyles = css`
  min-width: 0;
`;

const songTitleStyles = css`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  margin-bottom: 2px;
  color: ${theme.colors.dark};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const artistStyles = css`
  font-size: ${theme.fontSizes.sm};
  color: #6b7280;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const menuWrapperStyles = css`
  margin-left: 8px;
`;

const cardContentStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 32px;
  margin-top: 8px;
`;

const albumLabelStyles = css`
  font-size: ${theme.fontSizes.sm};
  color: #6b7280;
  margin-bottom: 2px;
`;
const albumValueStyles = css`
  font-size: ${theme.fontSizes.md};
  font-weight: 500;
  color: ${theme.colors.dark};
`;
const genreLabelStyles = css`
  font-size: ${theme.fontSizes.sm};
  color: #6b7280;
  margin-bottom: 2px;
`;
const genrePillStyles = (bg: string, color: string) => css`
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 500;
  background: ${bg};
  color: ${color};
`;

export default SongItem;
