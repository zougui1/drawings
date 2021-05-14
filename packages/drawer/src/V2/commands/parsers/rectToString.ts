import { moveToString } from './moveToString';
import { lineToString } from './lineToString';
import { closeToString } from './closeToString';
import { RectJSON } from '../Rect';

export const rectToString = (rect: RectData): string => {
  const { position, point, size } = rect;

  const startX = point.x;
  const startY = point.y;
  const endX = point.x + size.x;
  const endY = point.y + size.y;

  const start = moveToString({ point, position });
  const topLine = lineToString({ x: endX, y: startY, position });
  const rightLine = lineToString({ x: endX, y: endY, position });
  const bottomLine = lineToString({ x: startX, y: endY, position });
  const close = closeToString();

  return [start, topLine, rightLine, bottomLine, close].join('\n');
}

type RectData = Pick<RectJSON, 'point' | 'size' | 'position'>;
