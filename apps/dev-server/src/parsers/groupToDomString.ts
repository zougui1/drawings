import { GroupJSON, transformToString } from 'drawer';

const indent = (text: string): string => {
  return text.split('\n').map(l => `  ${l}`).join('\n');
}

export const groupToDomString = (group: GroupJSON, children: string): string => {
  return `<g transform="${transformToString(group.transform)}">
${indent(children)}
</g>`;
}
