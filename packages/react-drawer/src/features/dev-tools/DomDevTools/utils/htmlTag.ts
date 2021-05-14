import { isMultilineAttributeValue } from './attribute';
import { isNullish } from '../../../../utils';
import { HtmlAttribute } from '../../../../types';

export const parseHtmlAttributes = (attributes: Record<string, React.ReactText | undefined | null>, attributesIgnores: Record<string, React.ReactText>): HtmlAttribute[] => {
  return Object
    .entries(attributes ?? {})
    .filter(([name, value]) => !isNullish(value) && value !== attributesIgnores[name])
    .map(([name, value]) => ({ name, value: value as React.ReactText }));
}

export const getIsMultilineHtmlTag = (attributes: HtmlAttribute[]): boolean => {
  return attributes.some(({ value }) => isMultilineAttributeValue(value));
}
