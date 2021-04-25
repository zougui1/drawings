import React from 'react';
import { Typography } from '@material-ui/core';
import { SegmentData, AnimationJSON, DrawerObject, labelToType, Arc, Circle, Rect } from 'drawer';

import { TooltipDivider } from './TooltipDivider';

export const DebugTooltip: React.FC<DebugTooltipProps> = ({ drawerData, segment, scale }) => {
  const getTransform = (): string => {
    const { translate } = drawerData.root.transform;
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
      style={{
        position: 'absolute',
        left: segment.marker.position.x,
        top: segment.marker.position.y,
        zIndex: 9999999,
        transform: getTransform(),
      }}
      className="debug-tooltip"
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
          Fill: {segment.path.stroke}
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
      <TooltipDivider />
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

      {Rect.isCommand(segment.segment.data) && (
        <div>
          Size: {segment.segment.data.size.x}px, {segment.segment.data.size.y}px
        </div>
      )}
      {Circle.isCommand(segment.segment.data) && (
        <div>
          Radius: {segment.segment.data.radius.x}px, {segment.segment.data.radius.y}px
        </div>
      )}
      {(Arc.isCommand(segment.segment.data) || Circle.isCommand(segment.segment.data)) && (
        <div>
          Rotation: {segment.segment.data.rotation.toString()}deg
        </div>
      )}
      {Arc.isCommand(segment.segment.data) && (
        <div>
          Large: {segment.segment.data.large.toString()}
        </div>
      )}
      {Arc.isCommand(segment.segment.data) && (
        <div>
          Sweep: {segment.segment.data.sweep.toString()}
        </div>
      )}
      <TooltipDivider />
      <Typography variant="h6">Command</Typography>
      <div>
        Type: {segment.segment.data.type} ({labelToType[segment.command]})
      </div>
      <div>
        Position: {segment.segment.data.position.toLowerCase()}
      </div>
      <div>
        Command: {segment.segment.original.data.join(', ')}
      </div>
    </div>
  );
}

export interface DebugTooltipProps {
  segment: SegmentData;
  drawerData: DrawerObject | AnimationJSON;
  scale?: number;
}
