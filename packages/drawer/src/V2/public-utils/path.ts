import { PathJSON } from '../drawing-elements';
import { unflatten } from 'flat';

export const unflattenPaths = (elements: PathJSON[]): Record<string, any> => {
  const map: Record<string, PathJSON[]> = {};

  for (const element of elements) {
    const parts = element.fullName.split('>').map(part => part.trim());
    const namespaces = parts.slice(0, -1);

    const namespace = namespaces.join('.');

    map[namespace] = map[namespace] ?? [];
    map[namespace].push(element);
  }

  return unflatten(map) as Record<string, any>;
}
