import { DrawerJSON, AnimatorJSON, transformToString } from 'drawer';

import { groupToDomString } from './groupToDomString';
import { pathToDomString } from './pathToDomString';
import { animatePath, animatedPathToDomString, AnimatedPathJSON } from './animatePath';

const indent = (text: string): string => {
  return text.split('\n').map(l => `  ${l}`).join('\n');
}

export const drawerToDomString = (drawer: DrawerJSON | AnimatorJSON): string => {
  const scale = 1;

  const paths = drawer.root.paths
    .sort((a, b) => a.zIndex - b.zIndex)
    .map(path => pathToDomString(path))
    .join('\n')

  return `<svg
  width="${drawer.width * scale}"
  height="${drawer.height * scale}"
  viewBox="0 0 ${drawer.width * scale} ${drawer.height * scale}"
  xmlns="http://www.w3.org/2000/svg"
  style="background-color: #ccc;"
>
${indent('<path fill="#ccc" d="M 0,0 L 0,3000 L 3000,3000 L 3000,0 Z" />')}
${indent(groupToDomString(drawer.root, paths))}
</svg>
`;
}

export const animatorToDomString = (animator: AnimatorJSON): string[] => {
  const keyframes = animator.keyframes.slice(0, -1).map((kf, i) => {
    return {
      from: kf,
      to: animator.keyframes[i + 1],
    };
  });

  const frames = keyframes.map(kf => {
    return animatePath(kf.from, kf.to);
  }).flat();

  const svgs = frames.map(frame => currentFrameToDomString(frame, animator));

  //return []
  return svgs;
}

const currentFrameToDomString = (frame: AnimatedPathJSON[], animator: AnimatorJSON): string => {
  const scale = 0.3;

  const paths = frame
    .sort((a, b) => a.zIndex - b.zIndex)
    .map(path => animatedPathToDomString(path))
    .join('\n')

  return `<svg
  width="${animator.width * scale}"
  height="${animator.height * scale}"
  viewBox="0 0 ${animator.width * scale} ${animator.height * scale}"
  xmlns="http://www.w3.org/2000/svg"
  style="background-color: #ccc;"
  transform="scale(${scale})"
>
${indent('<path fill="#ccc" d="M 0,0 L 0,3000 L 3000,3000 L 3000,0 Z" />')}
${indent(groupToDomString(animator.root, paths))}
</svg>
`;
}
