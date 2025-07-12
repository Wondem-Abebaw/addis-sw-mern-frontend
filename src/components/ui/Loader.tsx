import React from "react";
import { css, keyframes } from "@emotion/react";
import theme from "../../styles/theme";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;

        justify-content: center;
        height: 100vh;
        width: 100vw;
      `}
    >
      <div
        css={css`
          display: inline-block;
          width: 40px;
          height: 40px;

          &:after {
            content: " ";
            display: block;
            width: 32px;
            height: 32px;
            margin: 4px;
            border-radius: 50%;
            border: 3px solid ${theme.colors.primary};
            border-color: ${theme.colors.primary} transparent
              ${theme.colors.primary} transparent;
            animation: ${spin} 1.2s linear infinite;
          }
        `}
      />
    </div>
  );
};

export default Loader;
