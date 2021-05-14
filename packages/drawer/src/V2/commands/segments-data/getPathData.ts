import { PathJSON } from '../../drawing-elements';
import { SegmentData } from '../../types';

export const getPathData = (path: PathJSON, pathData: string): SegmentData['path'] => {
  return {
    name: path.name,
    zIndex: path.zIndex,
    stroke: path.stroke,
    fill: path.fill,
    strokeWidth: path.strokeWidth,
    pathData: path.pathData,
    path: pathData,
    isAnimated: path.isAnimated,
  };
}
