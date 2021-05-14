export const getSegmentPoints = (segment: any[], prevSeg?: any[]): { start: Point; end: Point; } => {
  const [startX, startY] = prevSeg?.slice(-2) ?? [0, 0];
  const [endX, endY] = segment.slice(-2);

  return {
    start: { x: startX, y: startY },
    end: { x: endX, y: endY },
  };
}

type Point = { x: number; y: number; };
