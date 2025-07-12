import React from "react";
import type { ReactNode } from "react";

import { createPortal } from "react-dom";
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div css={overlayStyles}>
      <div css={modalStyles}>
        <div css={modalHeaderStyles}>
          <h2 css={modalTitleStyles}>{title}</h2>
          <Button variant="danger" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
        <div css={modalBodyStyles}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

const overlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const modalStyles = css`
  background: white;
  border-radius: ${theme.borderRadius.md};
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${theme.boxShadow.lg};
`;

const modalHeaderStyles = css`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const modalTitleStyles = css`
  font-size: ${theme.fontSizes.lg};
  margin: 0;
`;

const modalBodyStyles = css`
  padding: ${theme.spacing.lg};
`;

export default Modal;
