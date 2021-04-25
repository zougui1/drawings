import React from 'react';
import clsx from 'clsx';
import { PreviewSize } from 'drawer';

export const Preview: React.FC<PreviewProps> = ({ size, className, onSizeChange, children }) => {
  const handleDoubleClick = () => {
    if (size === PreviewSize.fullscreen || size === PreviewSize.halfScreen) {
      onSizeChange(PreviewSize.small);
    } else {
      onSizeChange(PreviewSize.fullscreen);
    }
  }

  return (
    <div
      className={clsx('preview', className, {
        small: size === PreviewSize.small,
        halfScreen: size === PreviewSize.halfScreen,
        fullscreen: size === PreviewSize.fullscreen,
      })}
      onDoubleClick={handleDoubleClick}
    >
      {children}
    </div>
  );
}

export interface PreviewProps {
  size: PreviewSize;
  onSizeChange: (size: PreviewSize) => void;
  className?: string;
}
