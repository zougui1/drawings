import React, { memo, useMemo, useEffect, SetStateAction, Dispatch, useRef, useContext } from 'react';
import { SegmentData } from 'drawer';
import _ from 'lodash';

import { RenderElement } from '../../components/RenderElement';
import { Group } from '../../components/Group';
import { DebugDisplay } from '../Debug/DebugDisplay';
import { sortElementsByZIndex } from '../../utils';
import { useEvent } from '../../hooks';
import { DrawingContext } from '../../context';

const SvgNaked: React.FC<SvgProps> = ({ segment, setSegment }) => {
  const persistentSegment = useRef(false);
  const isMouseDown = useRef(false);
  const isWindowMouseDown = useRef(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [drawingContext] = useContext(DrawingContext);
  const { drawingData, drawing, debug } = drawingContext;

  const paths = useMemo(() => {
    return drawingData.root.paths
      .slice()
      .sort(sortElementsByZIndex)
      .filter(p => !drawing.hiddenElements.includes(p.fullName));
  }, [drawingData.root.paths, drawing.hiddenElements]);

  const debugPathElements = useMemo(() => {
    return paths.filter(e => debug.elements.includes(e.fullName));
  }, [debug.elements]);

  useEvent('mousedown', () => isWindowMouseDown.current = true);
  useEvent('mouseup', () => isWindowMouseDown.current = false);

  const handleDotHover = (newSegment: SegmentData) => {
    if (isWindowMouseDown.current) {
      return;
    }

    if (!persistentSegment.current) {
      setSegment(newSegment);
    }
  }

  const handleDotOut = () => {
    if (isMouseDown.current || isWindowMouseDown.current) {
      return;
    }

    if (!persistentSegment.current) {
      setSegment(undefined);
    }
  }

  const handleDotMouseDown = (newSegment: SegmentData) => {
    isMouseDown.current = true;

    if (segment?.id !== newSegment.id) {
      setSegment(newSegment);
    } else {
      persistentSegment.current = !persistentSegment.current;
    }
  }

  const handleDotMouseUp = () => {
    isMouseDown.current = false;
  }

  // TODO compute potential performance issues
  //console.log(moment().format('HH:mm:ss.SSS'), '<Svg /> render');

  console.log('render <Svg />')

  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.pauseAnimations();
      svgRef.current.setCurrentTime(0);
    }
  }, []);

  return (
    <svg
      id={drawingData.slug}
      ref={svgRef}
      width={drawingData.width}
      height={drawingData.height}
      viewBox={`0 0 ${drawingData.width} ${drawingData.height}`}
      className="drawer-svg"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transformOrigin: '0 0' }}
    >
      <Group id={`${drawingData.slug} > ${drawingData.root.name}`} group={drawingData.root}>
        {paths.map((path) => (
          <RenderElement
            key={path.fullName}
            renderId
            element={path}
          />
        ))}

        <DebugDisplay
          segment={segment}
          debugElements={debugPathElements}
          onDotHover={handleDotHover}
          onDotOut={handleDotOut}
          onDotMouseDown={handleDotMouseDown}
          onDotMouseUp={handleDotMouseUp}
        />
      </Group>
    </svg>
  );
}

export interface SvgProps {
  segment: SegmentData | undefined;
  setSegment: Dispatch<SetStateAction<SegmentData | undefined>>;
}

export const Svg = memo(SvgNaked);
