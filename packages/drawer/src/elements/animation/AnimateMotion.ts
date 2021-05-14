import { Animation, AnimationJSON } from './Animation';
import { Keyframes } from '../Keyframes';
import { PathData, PathDataArray } from '../../PathData';

export class AnimateMotion extends Animation {
  public static readonly type: 'animateMotion' = 'animateMotion';

  protected pathData: PathData = new PathData();

  constructor(name: string) {
    super(name);
  }

  //#region commands
  move(x: number, y: number): this {
    this.pathData.move(x, y);
    return this;
  }

  line(x?: number, y?: number): this {
    this.pathData.line(x, y);
    return this;
  }

  curve(...numbers: number[]): this {
    this.pathData.curve(...numbers);
    return this;
  }

  arc(x: number, y: number): this {
    this.pathData.arc(x, y);
    return this;
  }

  circle(rx: number, ry: number = rx): this {
    this.pathData.circle(rx, ry);
    return this;
  }

  close(): this {
    this.pathData.close();
    return this;
  }

  rect(x: number, y: number, width: number, height: number): this {
    this.pathData.rect(x, y, width, height);
    return this;
  }
  //#endregion

  //#region edit last command
  absolute(): this {
    this.pathData.absolute();
    return this;
  }

  relative(): this {
    this.pathData.relative();
    return this;
  }

  x(x: number): this {
    this.pathData.x(x);
    return this;
  }

  y(y: number): this {
    this.pathData.y(y);
    return this;
  }

  radius(x: number, y: number): this {
    this.pathData.radius(x, y);
    return this;
  }

  rotation(rotation: number): this {
    this.pathData.rotation(rotation);
    return this;
  }

  sweep(sweep: boolean = true): this {
    this.pathData.sweep(sweep);
    return this;
  }

  large(large: boolean = true): this {
    this.pathData.large(large);
    return this;
  }

  offsetY(offsetY: number): this {
    this.pathData.offsetY(offsetY);
    return this;
  }

  offsetX(offsetX: number): this {
    this.pathData.offsetX(offsetX);
    return this;
  }

  offset(x: number, y: number): this {
    this.pathData.offset(x, y);
    return this;
  }

  catmullRom(): this {
    this.pathData.catmullRom();
    return this;
  }
  //#endregion

  //#region parsing
  // @ts-ignore
  toObject(): AnimateMotionJSON {
    return {
      _type: AnimateMotion.type,
      name: this._name,
      from: this._from,
      to: this._to,
      by: this._by,
      calcMode: this._calcMode,
      keyframes: this._keyframes.toJSON(),
      keySplines: this._keySplines,
      additive: this._additive,
      accumulate: this._accumulate,
      dur: this._duration,
      begin: this._begin,
      end: this._end,
      min: this._min,
      max: this._max,
      restart: this._restart,
      fill: this._fill,
      repeatDur: this._repeatDur,
      repeatCount: this._repeatCount,
      pathData: this.pathData.toArray(),
    };
  }

  static fromObject(data: AnimateMotionJSON): AnimateMotion {
    const animate = new AnimateMotion(data.name);
    animate._from = data.from;
    animate._to = data.to;
    animate._by = data.by;
    animate._calcMode = data.calcMode;
    animate._keyframes = Keyframes.from(data.keyframes);
    animate._keySplines = data.keySplines;
    animate._additive = data.additive;
    animate._accumulate = data.accumulate;
    animate._duration = data.dur;
    animate._begin = data.begin;
    animate._end = data.end;
    animate._min = data.min;
    animate._max = data.max;
    animate._restart = data.restart;
    animate._fill = data.fill;
    animate._repeatDur = data.repeatDur;
    animate._repeatCount = data.repeatCount;
    animate.pathData = PathData.fromArray(data.pathData);

    return animate;
  }
}

export interface AnimateMotionJSON extends AnimationJSON {
  _type: typeof AnimateMotion.type;

  pathData: PathDataArray;
}
