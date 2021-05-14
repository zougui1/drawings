import { Group } from '../elements';

export const getDrawnDataNames = (group: Group): string[] => {
  const elementNames: string[] = [];

  for (const element of group.elements) {
    elementNames.push(element.getName());

    if (element instanceof Group) {
      elementNames.push(...getDrawnDataNames(element));
    }
  }

  return elementNames;
}
