export const keyframeValuesToString = (keyframes: { value: string }[], areMultilineValues?: boolean): string => {
  const separator = areMultilineValues ? ';\n\n' : ';\n';
  return keyframes.map(kf => kf.value).join(separator);
}
