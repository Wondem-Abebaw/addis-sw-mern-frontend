/** SkeletonCard.tsx */
import React from "react";
import { css, keyframes } from "@emotion/react";
import theme from "../../styles/theme";

const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
`;

const skeletonStyle = css`
  background: linear-gradient(90deg, #f3f3f3 25%, #ecebeb 37%, #f3f3f3 63%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
  border-radius: 6px;
`;

const SongItemSkeleton: React.FC = () => {
  return (
    <div css={skeletonCardStyles}>
      <div css={headerRowStyles}>
        <div css={iconAndTitleStyles}>
          <div css={[musicIconStyles, skeletonStyle]} />
          <div css={titleArtistStyles}>
            <div css={[skeletonStyle, titleSkeleton]} />
            <div css={[skeletonStyle, artistSkeleton]} />
          </div>
        </div>
        <div css={[menuIconSkeleton, skeletonStyle]} />
      </div>
      <div css={cardContentStyles}>
        <div>
          <div css={[skeletonStyle, labelSkeleton]} />
          <div css={[skeletonStyle, valueSkeleton]} />
        </div>
        <div>
          <div css={[skeletonStyle, labelSkeleton]} />
          <div css={[skeletonStyle, pillSkeleton]} />
        </div>
      </div>
    </div>
  );
};

const skeletonCardStyles = css`
  background: white;
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.boxShadow.sm};
  min-height: 220px;
  padding: 28px 24px 24px 24px;
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
`;

const titleArtistStyles = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

const titleSkeleton = css`
  width: 100px;
  height: 16px;
`;

const artistSkeleton = css`
  width: 60px;
  height: 14px;
`;

const menuIconSkeleton = css`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const cardContentStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 32px;
  margin-top: 8px;
`;

const labelSkeleton = css`
  width: 40px;
  height: 12px;
  margin-bottom: 4px;
`;

const valueSkeleton = css`
  width: 80px;
  height: 14px;
`;

const pillSkeleton = css`
  width: 60px;
  height: 20px;
  border-radius: 9999px;
`;

export default SongItemSkeleton;
