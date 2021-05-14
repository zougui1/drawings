import React, { useState, useRef } from 'react';
import clsx from 'clsx';

import { useStyles } from './Resizer.styles';
import { useEvent } from '../../hooks';

export const Resizer: React.FC<ResizerProps> = ({ defaultWidth, className, children }) => {
  const classes = useStyles();
  const [width, setWidth] = useState(defaultWidth ?? -1);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const grabbedResizeHandle = useRef<{ x: number, startWidth: number } | null>(null);

  useEvent('mousemove', e => {
    const handle = grabbedResizeHandle.current;

    if (handle) {
      setWidth(handle.startWidth + (handle.x - e.clientX));
    }
  });

  useEvent('mouseup', () => {
    grabbedResizeHandle.current = null;
    document.body.style.cursor = 'unset';
  });

  const getWidth = (width: number): number => {
    const root = rootRef.current;

    if (width < 0 && root) {
      return root.getBoundingClientRect().width;
    }

    return width;
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    // ensures the cursor is in resize mode even when it moves fast
    document.body.style.cursor = 'ew-resize';
    grabbedResizeHandle.current = {
      x: e.clientX,
      startWidth: getWidth(width),
    };
  }

  return (
    <div
      ref={rootRef}
      style={{ width: width >= 0 ? width : 'auto' }}
      className={clsx(classes.root, className)}
    >
      <div
        className={classes.resizeHandle}
        onMouseDown={handleMouseDown}
      />

      {children}
    </div>
  );
}

export interface ResizerProps {
  defaultWidth?: number;
  className?: string;
}
