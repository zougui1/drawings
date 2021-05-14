import { DrawingElementType, DrawingElement, DrawingElementJSON, Group, GroupJSON, PathJSON } from 'drawer';

import { buildKeyframes } from './groupKeyframesByPath';
import { PathKeyframes } from '../types';

const getZIndex = (element: DrawingElement | DrawingElementJSON): number => {
  return element instanceof DrawingElement
    ? element.getZIndex()
    : element.zIndex;
}

export function sortElementsByZIndex(a: DrawingElement, b: DrawingElement): number;
export function sortElementsByZIndex(a: DrawingElementJSON, b: DrawingElementJSON): number;
export function sortElementsByZIndex(a: DrawingElement | DrawingElementJSON, b: DrawingElement | DrawingElementJSON): number {
  return getZIndex(a) - getZIndex(b);
}

export const flattenElements = (elements: DrawingElementJSON[]): DrawingElementJSON[] => {
  const flattenedElements: DrawingElementJSON[] = [];

  for (const element of elements) {
    if (element.type === DrawingElementType.group) {
      flattenedElements.push(...flattenElements((element as any as GroupJSON).paths));
    } else {
      flattenedElements.push(element);
    }
  }

  return flattenedElements;
}

export const createKeyframeElements = (keyframes: { time: number, path: GroupJSON }[]): PathKeyframes[] => {
  const keyframesPaths = keyframes.map((kf, i) => {
    const nextKf = keyframes[i + 1];
    const paths = flattenElements([kf.path]);
    const sortedPaths = paths.sort(sortElementsByZIndex);

    return {
      duration: nextKf ? (nextKf.time - kf.time) * 1000 : 0,
      paths: sortedPaths as PathJSON[],
    };
  });

  return buildKeyframes(keyframesPaths);
}
