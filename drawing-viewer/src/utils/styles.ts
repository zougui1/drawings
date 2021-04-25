export const matrixScale = (scale: number, translateX: number, translateY: number): string => {
  return `matrix(${scale}, 0, 0, ${scale}, ${translateX}, ${translateY})`;
}
