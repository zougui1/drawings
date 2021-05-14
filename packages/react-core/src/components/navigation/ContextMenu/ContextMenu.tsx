import React, { useState } from 'react';
import { Menu } from '@material-ui/core';

export const ContextMenu: React.FC<ContextMenuProps> = ({ children, contextMenu }) => {
  const [position, setPosition] = useState<{ x: number, y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (position) {
      setPosition(null);
    } else {
      setPosition({
        x: e.clientX - 2,
        y: e.clientY - 4,
      });
    }
  }

  const handleClose = () => {
    setPosition(null);
  }

  return (
    <div onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
      {children}

      <Menu
        style={{ zIndex: 999999999 }}
        open={position !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={position
          ? { left: position.x, top: position.y }
          : undefined
        }
      >
        {contextMenu}
      </Menu>
    </div>
  )
}

export interface ContextMenuProps {
  contextMenu: React.ReactNode;
}
