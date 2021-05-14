import { FlatDrawingData } from '../types';

export const flattenDrawingData = (object: Record<string, any>, path?: string): FlatDrawingData[] => {
  const flatData: FlatDrawingData[] = [];

  for (const [key, value] of Object.entries(object)) {
    if (value && typeof value === 'object') {
      const newPath = path ? `${path}.${key}` : key;

      if (value.name) {
        flatData.push({
          ...value,
          path: newPath,
        });
      } else {
        flatData.push(...flattenDrawingData(value, newPath));
      }
    }
  }

  return flatData;
}
