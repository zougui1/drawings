import { trimText } from '../../../../utils';

const MAX_ATTR_VALUE_LENGTH = 100;

export const trimAttributeValue = (value: React.ReactText): string => {
  return trimText(value, MAX_ATTR_VALUE_LENGTH);
}

export const isMultilineAttributeValue = (value: React.ReactText): boolean => {
  return trimAttributeValue(value).includes('\n');
}
