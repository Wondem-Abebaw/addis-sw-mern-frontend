import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { css } from "@emotion/react";
import Header from "./Header";
import theme from "../../styles/theme";
import * as React from "react";

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div css={layoutStyles}>
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div css={contentStyles}>
        <main css={mainStyles}>
          <Outlet />
        </main>
        {isSidebarOpen && (
          <div css={overlayStyles} onClick={() => setIsSidebarOpen(false)} />
        )}
      </div>
    </div>
  );
};

const layoutStyles = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const contentStyles = css`
  display: flex;
  flex: 1;
  position: relative;
`;

const mainStyles = css`
  flex: 1;
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.background};
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    padding: ${theme.spacing.sm};
    transform: ${(props: { isSidebarOpen?: boolean }) =>
      props.isSidebarOpen ? "translateX(240px)" : "translateX(0)"};
  }
`;

const overlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 90;

  @media (min-width: 769px) {
    display: none;
  }
`;

export default Layout;
