
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import * as React from "react";
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  fullWidth = false,
  disabled = false,
  type = "button",
}) => {
  const variantStyles = {
    primary: css`
      background-color: ${theme.colors.primary};
      color: white;
      &:hover {
        background-color: ${theme.colors.secondary};
      }
    `,
    secondary: css`
      background-color: ${theme.colors.secondary};
      color: white;
      &:hover {
        background-color: #2c2a8a;
      }
    `,
    success: css`
      background-color: ${theme.colors.success};
      color: white;
      &:hover {
        background-color: #3da8c8;
      }
    `,
    danger: css`
      background-color: ${theme.colors.danger};
      color: white;
      &:hover {
        background-color: #d31667;
      }
    `,
    warning: css`
      background-color: ${theme.colors.warning};
      color: white;
      &:hover {
        background-color: #e6a600;
      }
    `,
    info: css`
      background-color: ${theme.colors.info};
      color: white;
      &:hover {
        background-color: #3a7bc8;
      }
    `,
  };

  const sizeStyles = {
    sm: css`
      padding: ${theme.spacing.xs} ${theme.spacing.sm};
      font-size: ${theme.fontSizes.sm};
    `,
    md: css`
      padding: ${theme.spacing.sm} ${theme.spacing.md};
      font-size: ${theme.fontSizes.md};
    `,
    lg: css`
      padding: ${theme.spacing.md} ${theme.spacing.lg};
      font-size: ${theme.fontSizes.lg};
    `,
  };

  const buttonStyles = css`
    border: none;
    border-radius: ${theme.borderRadius.sm};
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.sm};
    width: ${fullWidth ? "100%" : "auto"};

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    ${variantStyles[variant]}
    ${sizeStyles[size]}
      @media (max-width: 480px) {
      padding: ${theme.spacing.xs} ${theme.spacing.sm};
      font-size: ${theme.fontSizes.sm};
    }
  `;

  return (
    <button
      css={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
