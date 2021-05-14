import React, { useContext } from 'react';
import clsx from 'clsx';
import { Typography, Divider } from '@material-ui/core';
import { SegmentData, labelToType, Arc, Circle, Rect, RectJSON, ArcJSON, CircleJSON } from 'drawer';

import { useStyles } from './DebugTooltip.styles';
import { DisplayRequiredData } from './DisplayRequiredData';
import { DrawingContext } from '../../../context';

export const DebugTooltip: React.FC<DebugTooltipProps> = ({ segment, scale }) => {
  const classes = useStyles();
  const [drawingContext] = useContext(DrawingContext);
  const { drawingData } = drawingContext;

  const getTransform = (): string => {
    const { translate } = drawingData.root.transform;
    const { radius, strokeWidth } = segment.marker;

    const _scale = scale ?? 1;

    const translateX = `calc(-${50 + (_scale - 1)}% + ${translate.x * _scale}px)`;
    const translateY = `${(translate.y + radius + (strokeWidth / 2)) * _scale + 0.5}px`;

    return `scale(${1 / _scale}) translate(${translateX}, ${translateY})`;
  }

  const pointToString = (point: { x: number, y: number }): string => {
    return `${point.x}, ${point.y}`;
  }

  return (
    <div
      className={clsx('debug-tooltip', classes.root)}
      style={{
        left: segment.marker.position.x,
        top: segment.marker.position.y,
        transform: getTransform(),
      }}
    >
      <Typography variant="h6">Path</Typography>
      <div>
        Name: {segment.path.name}
      </div>
      <div>
        Z-index: {segment.path.zIndex}
      </div>
      {segment.path.stroke.toLowerCase() !== 'none' && (
        <div>
          Stroke: {segment.path.stroke}
        </div>
      )}
      {segment.path.fill.toLowerCase() !== 'none' && (
        <div>
          Fill: {segment.path.fill}
        </div>
      )}
      <div>
        Stroke width: {segment.path.strokeWidth}px
      </div>
      <Divider className={classes.divider} />
      <Typography variant="h6">Segment</Typography>
      <div>
        Start at: {pointToString(segment.segment.absolute.start)}
      </div>
      <div>
        End at: {pointToString(segment.segment.absolute.end)}
      </div>
      {
        segment.segment.absolute.close && (
          <div>
            Close at: {pointToString(segment.segment.absolute.close)}
          </div>
        )
      }

      <div style={{ height: 5 }}></div>

      {/* FIXME sometimes the data is undefined */}
      <DisplayRequiredData
        data={segment.segment.data}
        fallback="No segment data found"
        render={() => (
          <>
            {Rect.isRectJSON(segment.segment.data) && (
              <div>
                Size: {(segment.segment.data as RectJSON).size.x}px, {(segment.segment.data as RectJSON).size.y}px
              </div>
            )}
            {Circle.isCircleJSON(segment.segment.data) && (
              <div>
                Radius: {(segment.segment.data as CircleJSON).radius.x}px, {(segment.segment.data as CircleJSON).radius.y}px
              </div>
            )}
            {(Arc.isArcJSON(segment.segment.data) || Circle.isCircleJSON(segment.segment.data)) && (
              <div>
                Rotation: {(segment.segment.data as (ArcJSON | CircleJSON)).rotation.toString()}deg
              </div>
            )}
            {Arc.isArcJSON(segment.segment.data) && (
              <div>
                Large: {(segment.segment.data as ArcJSON).large.toString()}
              </div>
            )}
            {Arc.isArcJSON(segment.segment.data) && (
              <div>
                Sweep: {(segment.segment.data as ArcJSON).sweep.toString()}
              </div>
            )}
          </>
        )}
      />

      <Divider className={classes.divider} />
      <Typography variant="h6">Command</Typography>
      {/* FIXME sometimes the data is undefined */}
      <DisplayRequiredData
        data={segment.segment.data}
        fallback="No segment data found"
        render={() => (
          <>
            <div>
              Type: {segment.segment.data.type} ({labelToType[segment.command]})
            </div>
            <div>
              Position: {segment.segment.data.position.toLowerCase()}
            </div>
          </>
        )}
      />

      <div>
        Animated: {segment.path.isAnimated ? 'yes' : 'no'}
      </div>
      <div>
        Command: {segment.segment.original.data.join(', ')}
      </div>
    </div>
  );
}

export interface DebugTooltipProps {
  segment: SegmentData;
  scale?: number;
}
