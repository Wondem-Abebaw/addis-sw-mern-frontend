
import { css } from "@emotion/react";
import type { ReactNode } from "react";
import theme from "../../styles/theme";
import * as React from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  actions?: ReactNode;
}

const Card: React.FC<CardProps> = ({ children, title, actions }) => {
  return (
    <div css={cardStyles}>
      {title && (
        <div css={cardHeaderStyles}>
          <h3 css={cardTitleStyles}>{title}</h3>
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div css={cardBodyStyles}>{children}</div>
    </div>
  );
};

const cardStyles = css`
  background: white;
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.boxShadow.sm};
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    box-shadow: ${theme.boxShadow.md};
    transform: translateY(-2px);
  }
  @media (max-width: 480px) {
    border-radius: ${theme.borderRadius.sm};
  }
`;

const cardHeaderStyles = css`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const cardTitleStyles = css`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.dark};
  margin: 0;
`;

const cardBodyStyles = css`
  padding: ${theme.spacing.lg};
`;

export default Card;
