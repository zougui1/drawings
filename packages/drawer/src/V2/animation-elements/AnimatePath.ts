import { Animate } from './Animate';
import { PathData } from '../commands';

export class AnimatePath extends Animate {

  protected _attributeName: string = 'd';

  //#region edit element
  public paths(keyframes: Record<number, (pathData: PathData) => void>): this {
    let _keyframes: Record<number, string> | string[];

    if (Array.isArray(keyframes)) {
      _keyframes = keyframes.map(kf => this.buildPath(kf));
    } else {
      _keyframes = Object.entries(keyframes).reduce((acc, [time, builder]) => {
        acc[time] = this.buildPath(builder);
        return acc;
      }, {} as Record<string, string>);
    }

    return this.keyframes(_keyframes);
  }
  //#endregion

  //#region helpers
  protected buildPath(builder: (pathData: PathData) => void): string {
    const pathData = new PathData();
    builder(pathData);
    return pathData.toString();
  }
  //#endregion
}
