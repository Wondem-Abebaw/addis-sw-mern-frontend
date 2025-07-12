import { useEffect } from "react";
import * as React from "react";
interface DropdownMenuProps {
  children: React.ReactNode;
  button: React.ReactNode;
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLDivElement>;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  button,
  open,
  onClose,
  anchorRef,
}) => {
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose, anchorRef]);

  return (
    <div
      ref={anchorRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      {button}
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "100%",
            background: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            borderRadius: 6,
            zIndex: 10,
            minWidth: 120,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
