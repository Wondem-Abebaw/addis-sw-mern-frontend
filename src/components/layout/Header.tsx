import React, { useState } from "react";
import { css } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";
import theme from "../../styles/theme";
import Button from "../ui/Button";
import { useNotification } from "../../hooks/useNotification";
import { Notification } from "../../hooks/useNotification";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const { showNotification } = useNotification();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header css={headerStyles}>
      <div css={containerStyles}>
        <div css={logoStyles}>
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
          <Link to="/">Music Library</Link>
        </div>
        {/* Desktop nav */}
        <nav css={navStyles}>
          <Link
            to="/"
            css={[navLinkStyles, isActive("/") && activeNavLinkStyles]}
          >
            Songs
          </Link>
          {/* <Link
            to="/songs"
            css={[navLinkStyles, isActive("/songs") && activeNavLinkStyles]}
          >
            Songs
          </Link> */}
          <Link
            to="/stats"
            css={[navLinkStyles, isActive("/stats") && activeNavLinkStyles]}
          >
            Statistics
          </Link>
        </nav>
        {/* Mobile hamburger */}
        <button
          css={mobileMenuButtonStyles}
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
        >
          ☰
        </button>
      </div>
      {/* Mobile drawer */}
      {drawerOpen && (
        <>
          <div css={drawerOverlayStyles} onClick={() => setDrawerOpen(false)} />
          <nav css={drawerStyles}>
            <Link
              to="/"
              css={[drawerLinkStyles, isActive("/") && activeDrawerLinkStyles]}
              onClick={() => setDrawerOpen(false)}
            >
              Songs
            </Link>

            <Link
              to="/stats"
              css={[
                drawerLinkStyles,
                isActive("/stats") && activeDrawerLinkStyles,
              ]}
              onClick={() => setDrawerOpen(false)}
            >
              Statistics
            </Link>
          </nav>
        </>
      )}
      <Notification />
    </header>
  );
};

const headerStyles = css`
  background-color: white;
  box-shadow: ${theme.boxShadow.sm};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const containerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
`;

const logoStyles = css`
  font-size: ${theme.fontSizes.lg};
  font-weight: 700;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const navStyles = css`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const navLinkStyles = css`
  text-decoration: none;
  color: ${theme.colors.textLight};
  font-weight: 500;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s;
  font-size: ${theme.fontSizes.sm};

  &:hover {
    color: ${theme.colors.primary};
    background-color: ${theme.colors.light};
  }
`;

const activeNavLinkStyles = css`
  color: ${theme.colors.primary};
  background-color: rgba(67, 97, 238, 0.1);
`;

const menuButtonStyles = css`
  margin-right: ${theme.spacing.sm};
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const apiButtonStyles = css`
  @media (max-width: 480px) {
    display: none;
  }
`;

const mobileMenuButtonStyles = css`
  display: none;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  margin-left: 12px;
  @media (max-width: 768px) {
    display: block;
  }
`;

const drawerOverlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;
`;

const drawerStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background: #fff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
  z-index: 201;
  display: flex;
  flex-direction: column;
  padding: 32px 20px 20px 20px;
  gap: 18px;
  @media (min-width: 769px) {
    display: none;
  }
`;

const drawerLinkStyles = css`
  text-decoration: none;
  color: ${theme.colors.textLight};
  font-weight: 500;
  font-size: 1.1rem;
  padding: 10px 0;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
  &:hover {
    color: ${theme.colors.primary};
    background: ${theme.colors.light};
  }
`;

const activeDrawerLinkStyles = css`
  color: ${theme.colors.primary};
  background: rgba(67, 97, 238, 0.1);
`;

const drawerApiButtonStyles = css`
  margin-top: 12px;
`;

export default Header;
