import React, { useState } from 'react';
import clsx from 'clsx';
import { PreviewSize } from 'drawer';
import { Preview as SvgPreview } from 'react-drawer';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import './Previews.css';
import { Preview } from './Preview';
import { Reference } from './Reference';
import { changeCanvasViewSize, changeRefViewSize, removeReference } from './previewsSlice';
import { StandaloneInteractable } from '../../components/StandaloneInteractable';
import { useAppSelector, useAppDispatch } from '../../store';

export const Previews = () => {
  const [currentRef, setCurrentRef] = useState(0);
  const dispatch = useAppDispatch();

  const canvasViewSize = useAppSelector(state => state.previews.canvasViewSize);
  const references = useAppSelector(state => state.previews.references);
  const refViewSize = useAppSelector(state => state.previews.refViewSize);

  const drawerData = useAppSelector(state => state.drawer.data);

  const handleDeleteRef = (ref: string, index: number) => {
    if (index >= (references.length - 1)) {
      setCurrentRef(references.length - 2);
    }

    dispatch(removeReference(ref));
  }

  return (
    <div className="previews">
      <Preview
        className={clsx('canvas-view', { hide: refViewSize === PreviewSize.fullscreen })}
        size={canvasViewSize}
        onSizeChange={size => dispatch(changeCanvasViewSize(size))}
      >
        {drawerData && (
          <StandaloneInteractable id={canvasViewSize}>
            <SvgPreview size={canvasViewSize} />
          </StandaloneInteractable>
        )}
      </Preview>
      {references.length > 0 && (
        <Preview
          className={clsx('ref-view', { hide: canvasViewSize === PreviewSize.fullscreen })}
          size={refViewSize}
          onSizeChange={size => dispatch(changeRefViewSize(size))}
        >
          <Carousel
            selectedItem={currentRef}
            onChange={setCurrentRef}
            infiniteLoop
            showArrows
            showThumbs={false}
          >
            {references.map((reference: string, i: number) => (
              <Reference
                key={reference}
                reference={reference}
                id={`${i}-${refViewSize}`}
                onDelete={() => handleDeleteRef(reference, i)}
              />
            ))}
          </Carousel>
        </Preview>
      )}
    </div>
  );
}
