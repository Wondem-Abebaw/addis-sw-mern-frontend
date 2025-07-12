import { css } from "@emotion/react";
import theme from "../../styles/theme";
import * as React from "react";

// Base Card component
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      css={css`
        border-radius: ${theme.borderRadius.lg};
        border: 1px solid ${theme.colors.border};
        background-color: ${theme.colors.card};
        color: ${theme.colors.cardForeground};
        box-shadow: ${theme.boxShadow.sm};
        overflow: hidden;
      `}
      {...props}
    />
  )
);
Card.displayName = "Card";

// CardHeader component
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: ${theme.spacing[1.5]};
        padding: ${theme.spacing[6]};
      `}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

// CardTitle component
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      css={css`
        font-size: ${theme.fontSizes["lg"]};
        font-weight: ${theme.fontWeights.semibold};
        line-height: ${theme.lineHeight.none};
        letter-spacing: ${theme.letterSpacing.tight};
      `}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

// CardDescription component
interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    css={css`
      font-size: ${theme.fontSizes.sm};
      color: ${theme.colors.mutedForeground};
    `}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// CardContent component
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      css={css`
        padding: ${theme.spacing[6]};
        padding-top: 0;
      `}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

// CardFooter component
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      css={css`
        display: flex;
        align-items: center;
        padding: ${theme.spacing[6]};
        padding-top: 0;
      `}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
