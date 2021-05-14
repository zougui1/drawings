import { TransformJSON } from '../Transform';
import { pointToString } from '../point';

export const transformToString = (transform: TransformJSON): string => {
  const transformations: string[] = [];

  if (transform.scale.x || transform.scale.y) {
    transformations.push(`scale(${pointToString(transform.scale)})`);
  }

  if (transform.translate.x || transform.translate.y) {
    transformations.push(`translate(${pointToString(transform.translate)})`);
  }

  if (transform.matrix.length) {
    transformations.push(`matrix(${transform.matrix.join(', ')})`);
  }

  return transformations.join(' ');
}
