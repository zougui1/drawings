import { ObjectLiteral } from '../types';

export const min = (obj: ObjectLiteral): number => {
  const values = Object.values(obj);
  const nums = values.filter((v: any) => typeof v === 'number') as number[];
  return Math.min(...nums);
}
