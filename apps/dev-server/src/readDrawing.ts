import { uncachedRequire } from './uncachedRequire';

export const readDrawing = (dir: string): any => {
  const { drawing } = uncachedRequire(dir);

  if (typeof drawing !== 'function') {
    throw new Error(`"${dir}" must return a 'drawing' function. Got "${drawing}"`);
  }

  const drawingData = drawing();

  if (typeof drawingData !== 'object') {
    throw new Error(`"drawing" must return an object. Got "${drawingData}"`);
  }

  return drawingData;
};
