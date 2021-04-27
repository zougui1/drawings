import stackTrace from 'stack-trace';

import { DrawingElement, DrawingElementObject } from './DrawingElement';
import { Animate, AnimatePath, AnimateMotion, AnimationJSON, AnimateJSON, AnimateMotionJSON } from './animation';
import { PathData, PathDataArray } from '../PathData';
import { getSegmentsData } from '../getSegmentsData';
import { Transform } from '../Transform';
import { ObjectLiteral, SegmentData } from '../types';
import { PROJECT_DIR } from '../constants';

export class Path extends DrawingElement {

  static readonly type: 'path' = 'path';
  private static count = 0;

  id = `path-${Path.count}`;
  pathData = new PathData();
  private _stroke: string = 'none';
  private _strokeWidth: number = 1;
  private _fill: string = 'none';
  protected _parsed: PathObject | undefined;

  constructor(data: ObjectLiteral) {
    super(data);

    Path.count++;
  }

  //#region edit element
  stroke(stroke?: string): this {
    if (!stroke) {
      this._fill = 'none';
      return this;
    }

    this._stroke = stroke;
    return this;
  }

  fill(fill?: string): this {
    if (!fill) {
      this._stroke = 'none';
      return this;
    }

    this._fill = fill;
    return this;
  }

  strokeWidth(strokeWidth: number): this {
    this._strokeWidth = strokeWidth;
    return this;
  }

  zIndex(zIndex: number): this {
    this._zIndex =zIndex;
    return this;
  }
  //#endregion

  //#region animation elements
  public animatePath(name: string, addPath?: boolean): AnimatePath {
    const animatePath = new AnimatePath(name);

    if (addPath) {
      animatePath.addPath(0, (path) => {
        path.commands = this.pathData.commands;
      });
    }

    this.addAnimationElement(animatePath);
    return animatePath;
  }
  //#endregion

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

  name(name: string): this {
    this.pathData.name(name);
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
  //#endregion

  //#region public API
  getStroke(): string {
    return this._stroke;
  }

  getFill(): string {
    return this._fill;
  }

  getStrokeWidth(): number {
    return this._strokeWidth;
  }

  doStroke(): boolean {
    return !!(this._stroke && this._stroke !== 'none');
  }

  doFill(): boolean {
    return !!(this._fill && this._fill !== 'none');
  }
  //#endregion

  //#region parsing
  buildName(): string {
    const actionTypes: string[] = [];

    if (!this.doStroke()) {
      actionTypes.push('stroke');
    }

    if (!this.doFill()) {
      actionTypes.push('fill');
    }

    return `${super.buildName()} (${actionTypes.join(', ')})`;
  }

  toObject(): PathObject {
    if (this._parsed) {
      return this._parsed;
    }

    const zIndex = this.doStroke() && !this.doFill()
      ? this._zIndex + 1
      : this._zIndex;

    return this._parsed ??= {
      type: Path.type,
      id: this.id,
      name: this.buildName(),
      zIndex,
      stroke: this._stroke,
      fill: this._fill,
      strokeWidth: this._strokeWidth,
      transform: this._transform.toObject(),
      pathData: this.pathData.toArray(),
      animationElements: this._animationElements.map(e => e.toObject()),
    };
  }

  static fromObject(data: PathObject): Path {
    const path = new Path({});
    path.id = data.id;
    path._transform = Transform.fromObject(data.transform);
    path._name = data.name;
    path._zIndex = data.zIndex;
    path.pathData = PathData.fromArray(data.pathData);
    path._stroke = data.stroke;
    path._strokeWidth = data.strokeWidth;
    path._fill = data.fill;

    path._animationElements = data.animationElements.map(e => {
      switch (e._type) {
        case Animate.type:
          return Animate.fromObject(e as AnimateJSON);
        case AnimateMotion.type:
          return AnimateMotion.fromObject(e as AnimateMotionJSON);

        default:
          throw new Error(`Invalid animation type "${e._type}".`);
      }
    });

    return path;
  }

  fromString(segment: string): this {
    this.pathData.fromString(segment);
    return this;
  }
  //#endregion
}

export interface PathObject extends DrawingElementObject {
  type: 'path';
  id: string;
  pathData: PathDataArray;
  stroke: string;
  strokeWidth: number;
  fill: string;
  animationElements: AnimationJSON[];
}
