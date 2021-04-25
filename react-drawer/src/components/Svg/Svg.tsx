import React, { memo, useMemo, useState } from 'react';
import ErrorBoundary from 'react-error-boundaries';
import { SegmentData, AnimationJSON } from 'drawer';

import { RenderElement } from '../RenderElement';
import { Group } from '../Group';
import { DebugDisplay } from '../Debug/DebugDisplay';
import { DebugTooltip } from '../Debug/DebugTooltip';
import { createKeyframeElements } from '../../utils';
import { useEvent } from '../../hooks';
import _ from 'lodash';

const SvgNaked: React.FC<SvgProps> = ({ playing, data, onPlayingChange, keyframe, onKeyframeChange, debugElements, scale, displayTooltip }) => {
  const [segment, setSegment] = useState<SegmentData | undefined>();
  const [persistentSegment, setPersistentSegment] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isWindowMouseDown, setIsWindowMouseDown] = useState(false);

  const paths = useMemo(() => {
    return createKeyframeElements(data.keyframes);
  }, [data.keyframes]);

  const debugPathElements = paths.filter(e => debugElements?.includes(e[0].from.id));

  useEvent('mousedown', () => setIsWindowMouseDown(true));
  useEvent('mouseup', () => setIsWindowMouseDown(false));

  const handleDotHover = (newSegment: SegmentData) => {
    if (isWindowMouseDown) {
      return;
    }

    if (!persistentSegment) {
      setSegment(newSegment);
    }
  }

  const handleDotOut = () => {
    if (isMouseDown || isWindowMouseDown) {
      return;
    }

    if (!persistentSegment) {
      setSegment(undefined);
    }
  }

  const handleDotMouseDown = (newSegment: SegmentData) => {
    setIsMouseDown(true);

    if (segment?.id !== newSegment.id) {
      setSegment(newSegment);
    } else {
      setPersistentSegment(persistent => !persistent);
    }
  }

  const handleDotMouseUp = () => {
    setIsMouseDown(false);
  }

  // TODO compute potential performance issues
  //console.log(moment().format('HH:mm:ss.SSS'), '<Svg /> render');

  // we throttle the function since many paths will call it at once
  const handleAnimationComplete = _.throttle(() => {
    onPlayingChange?.(false);
  }, 50);

  // we throttle the function since many paths will call it at once
  const handleKeyframeChange = _.throttle((newKeyframe: number) => {
    onKeyframeChange?.(newKeyframe);
  }, 50);

  return (
    <ErrorBoundary>
      <svg
        id={data.svgName}
        width={data.width}
        height={data.height}
        viewBox={`0 0 ${data.width} ${data.height}`}
        className="drawer-svg"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transformOrigin: '0 0' }}
      >
        <Group group={data.root}>
          {paths.map((path) => (
            <RenderElement
              key={path[0].from.id}
              playing={playing}
              element={path}
              onComplete={handleAnimationComplete}
              keyframe={keyframe}
              onKeyframeChange={handleKeyframeChange}
            />
          ))}

          <DebugDisplay
            segment={segment}
            keyframe={keyframe}
            debugElements={debugPathElements}
            onDotHover={handleDotHover}
            onDotOut={handleDotOut}
            onDotMouseDown={handleDotMouseDown}
            onDotMouseUp={handleDotMouseUp}
          />
          </Group>
      </svg>

      {displayTooltip !== false && segment && <DebugTooltip segment={segment} drawerData={data} scale={scale} />}
    </ErrorBoundary>
  );
}

export interface SvgProps {
  data: AnimationJSON;
  flat?: boolean;
  displayTooltip?: boolean;
  debugElements?: string[];
  scale?: number;

  // animation
  playing?: boolean;
  onPlayingChange?: (playing: boolean) => void;
  keyframe?: number;
  onKeyframeChange?: (keyframe: number) => void;
}

export const Svg = memo(SvgNaked);
