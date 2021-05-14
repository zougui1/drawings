export const isNullish = (value: any): value is null | undefined | '' => {
  return value === null || value === undefined || value === '';
}
