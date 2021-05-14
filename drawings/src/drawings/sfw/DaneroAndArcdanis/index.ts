import { Animator } from 'drawer';

import { keyframe01 } from './keyframes/keyframe-01';
import { keyframe02 } from './keyframes/keyframe-02';
import { keyframe03 } from './keyframes/keyframe-03';
import { data } from './data';

export const drawing = () => {
  const animation = new Animator('Danero and Arcdanis', data);

  animation.size(3000, 3000);

  animation.root.transform
    .translate(600, 800)

  animation.previews.small
    .size(250, 180)
    .scale(0.1)
    .translate(600, 750);

  animation.previews.halfScreen
    .size(1500, 3000)
    .scale(0.23)
    .translate(530, 1500);

  animation.previews.fullscreen
    .size(3000, 3000)
    .scale(0.45)
    .translate(550, 800);

  animation.keyframes({
    0: keyframe01,
    1: keyframe02,
    1.5: keyframe03,
  });

  return animation.toJSON();

  /*const drawer = new Drawer(data, 'Danero and Arcdanis');
  drawer.setSize(3000, 3000);

  drawer.root
    .name('root')
    .translate(600, 800)

  drawer.previews.small
    .size(250, 180)
    .scale(0.1)
    .translate(600, 750);

  drawer.previews.halfScreen
    .size(1500, 3000)
    .scale(0.23)
    .translate(530, 1500);

  drawer.previews.fullscreen
    .size(3000, 3000)
    .scale(0.45)
    .translate(550, 800);

  drawer.root.exec(keyframe01);

  return drawer;*/
}
