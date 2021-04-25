import { DrawingElement, DrawingElementObject, Group, GroupObject, PathObject } from 'drawer';

import { buildKeyframes } from './groupKeyframesByPath';
import { PathKeyframes } from '../types';

const getZIndex = (element: DrawingElement | DrawingElementObject): number => {
  return element instanceof DrawingElement
    ? element.getZIndex()
    : element.zIndex;
}

export function sortElementsByZIndex(a: DrawingElement, b: DrawingElement): number;
export function sortElementsByZIndex(a: DrawingElementObject, b: DrawingElementObject): number;
export function sortElementsByZIndex(a: DrawingElement | DrawingElementObject, b: DrawingElement | DrawingElementObject): number {
  return getZIndex(a) - getZIndex(b);
}

export const flattenElements = (elements: DrawingElementObject[]): DrawingElementObject[] => {
  const flattenedElements: DrawingElementObject[] = [];

  for (const element of elements) {
    if (element.type === Group.type) {
      flattenedElements.push(...flattenElements((element as any as GroupObject).children));
    } else {
      flattenedElements.push(element);
    }
  }

  return flattenedElements;
}

export const createKeyframeElements = (keyframes: { time: number, path: GroupObject }[]): PathKeyframes[] => {
  const keyframesPaths = keyframes.map((kf, i) => {
    const nextKf = keyframes[i + 1];
    const paths = flattenElements([kf.path]);
    const sortedPaths = paths.sort(sortElementsByZIndex);

    return {
      duration: nextKf ? (nextKf.time - kf.time) * 1000 : 0,
      paths: sortedPaths as PathObject[],
    };
  });

  return buildKeyframes(keyframesPaths);
}
