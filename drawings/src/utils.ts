export const min = (obj: any): number => {
  // @ts-ignore
  const values = Object.values(obj);
  const nums = values.filter((v: any) => typeof v === 'number') as number[];
  return Math.min(...nums);
}
