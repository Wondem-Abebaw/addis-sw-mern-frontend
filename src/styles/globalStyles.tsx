import { Global, css } from "@emotion/react";
import theme from "./theme";

const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: ${theme.colors.background};
        color: ${theme.colors.text};
        line-height: 1.6;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      ul {
        list-style: none;
      }

      button {
        cursor: pointer;
        font-family: inherit;
      }

      .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 ${theme.spacing.md};
      }

      .section {
        padding: ${theme.spacing.lg} 0;
      }

      .page-title {
        font-size: ${theme.fontSizes.xxl};
        margin-bottom: ${theme.spacing.lg};
        color: ${theme.colors.primary};
      }

      .card {
        background: white;
        border-radius: ${theme.borderRadius.md};
        box-shadow: ${theme.boxShadow.sm};
        padding: ${theme.spacing.lg};
        transition: transform 0.2s, box-shadow 0.2s;

        &:hover {
          box-shadow: ${theme.boxShadow.md};
          transform: translateY(-2px);
        }
      }

      .grid {
        display: grid;
        gap: ${theme.spacing.lg};
      }

      @media (min-width: 768px) {
        .grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 992px) {
        .grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeOut {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-20px);
        }
      }

      /* Mobile-specific styles */
      @media (max-width: 768px) {
        html {
          font-size: 14px;
        }

        .page-title {
          font-size: ${theme.fontSizes.xl};
        }
      }

      @media (max-width: 480px) {
        .card {
          padding: ${theme.spacing.md};
        }

        button,
        .button {
          padding: 8px 12px;
          font-size: ${theme.fontSizes.sm};
        }
      }
    `}
  />
);

export default GlobalStyles;
