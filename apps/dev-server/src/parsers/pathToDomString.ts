import { PathJSON, pathDataToString, AnimationElementJSON, AnimationElementType, AnimateJSON } from 'drawer';

const indent = (text: string): string => {
  return text.split('\n').map(l => `  ${l}`).join('\n');
}

export const pathToDomString = (path: PathJSON): string => {
  const pathData = pathDataToString(path.pathData).replace(/\n/g, ' ');
  const animations = path.animations.map(animation => animationToDomString(animation)).join('\n');

  return `<path
  d="${pathData}"
  stroke="${path.stroke}"
  fill="${path.fill}"
  stroke-width="${path.strokeWidth}"
>
${indent(animations)}
</path>`;
}

const animationToDomString = (animation: AnimationElementJSON): string => {
  switch (animation.type) {
    case AnimationElementType.animate:
      return animateToDomString(animation as AnimateJSON);

    default:
      throw new Error(`Invalid animation type "${animation.type}".`);
  }
}

const animateToDomString = (animate: AnimateJSON): string => {
  return `<animate
  attributeName="${animate.attributeName}"
  ${animate.attributeType ? `attributeType="${animate.attributeType}"` : ''}
  values="${animate.keyframes.map(kf => kf.value).join('; ')}"
  keyTimes="${animate.keyframes.map(kf => kf.time).join('; ')}"
  dur="${animate.duration}s"
/>`;
}
