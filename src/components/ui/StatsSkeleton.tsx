/** @jsxImportSource @emotion/react */
import React from "react";
import { css, keyframes } from "@emotion/react";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/StatCard"; // or adjust import path

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const skeletonStyles = css`
  background: #f3f4f6;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -150px;
    height: 100%;
    width: 150px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: ${shimmer} 1.2s infinite;
  }
`;

const SkeletonBox = ({ height }: { height: string }) => (
  <div
    css={[
      skeletonStyles,
      css`
        height: ${height};
      `,
    ]}
  />
);

const StatsSkeleton: React.FC = () => {
  return (
    <div css={containerStyles}>
      <h2 css={titleStyles}>Loading Statistics...</h2>

      {/* Cards Skeleton */}
      <div css={cardsContainerStyles}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} css={[cardStyles]}>
            <CardHeader>
              <SkeletonBox height="1rem" />
            </CardHeader>
            <CardContent>
              <SkeletonBox height="2rem" />
            </CardContent>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div css={chartsContainerStyles}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>
                <SkeletonBox height="1rem" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SkeletonBox height="300px" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Style reuse
const containerStyles = css`
  padding: 1.5rem;
  min-height: 100vh;
  background-image: linear-gradient(to bottom right, #f5f3ff, #eff6ff, #e0e7ff);
`;

const titleStyles = css`
  margin-bottom: 2rem;
  color: #8b5cf6;
  font-size: 1.875rem;
  font-weight: 600;
`;

const cardsContainerStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const cardStyles = css`
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
`;

const chartsContainerStyles = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default StatsSkeleton;
