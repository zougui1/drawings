import { Animate } from './Animate';
import { PathData } from '../../PathData';

export class AnimatePath extends Animate {

  constructor(name: string) {
    super(name, 'd');
  }

  addPath(time: number, builder: (builder: PathData) => void): this {
    const pathBuilder = new PathData();
    builder(pathBuilder);
    super.addFrame(time, pathBuilder.toString());

    return this;
  }
}
