import { DrawingElement, DrawingElementJSON } from './DrawingElement';
import { DrawingElementType } from './DrawingElementType';
import { PathData, CommandJSON } from '../commands';
import { AnimationElement, AnimationElementJSON, AnimatePath } from '../animation-elements';
import { IStackFrame } from '../types';
import { getDrawingStackFrame } from '../utils';

export class Path extends DrawingElement {

  public pathData: PathData = new PathData();
  protected _stroke: string = 'none';
  protected _fill: string = 'none';
  protected _strokeWidth: number = 1;
  protected _animationElements: AnimationElement[] = [];
  protected _stackFrame: IStackFrame | undefined;
  public readonly elementType: DrawingElementType.path = DrawingElementType.path;

  //#region edit element
  public stroke(stroke?: string): this {
    if (!stroke) {
      return this.setFill('none');
    }

    return this.setStroke(stroke);
  }

  public fill(fill?: string): this {
    if (!fill) {
      return this.setStroke('none');
    }

    return this.setFill(fill);
  }

  public strokeWidth(strokeWidth: number): this {
    return this.setStrokeWidth(strokeWidth);
  }

  public zIndex(zIndex: number): this {
    this._zIndex = zIndex;
    return this;
  }
  //#endregion

  //#region accessors
  public getStrokeWidth(): number {
    return this._strokeWidth;
  }

  public setStrokeWidth(strokeWidth: number): this {
    this._strokeWidth = strokeWidth;
    return this;
  }

  public getStroke(): string {
    return this._stroke;
  }

  public setStroke(stroke: string): this {
    this._stroke = stroke;
    return this;
  }

  public getFill(): string {
    return this._fill;
  }

  public setFill(fill: string): this {
    this._fill = fill;
    return this;
  }

  public getStackFrame(): IStackFrame | undefined {
    return this._stackFrame;
  }
  //#endregion

  //#region animations
  public animatePath(name: string): AnimatePath {
    const animatePath = new AnimatePath();
    animatePath.setName(name);
    this.addAnimationElement(animatePath);

    return animatePath;
  }
  //#endregion

  //#region commands
  public move(x: number, y: number): this {
    this.pathData.move(x, y);
    return this;
  }

  public line(x?: number, y?: number): this {
    this.pathData.line(x, y);
    return this;
  }

  public curve(x: number, y: number): this;
  public curve(x1: number, y1: number, x: number, y: number): this;
  public curve(x1: number, y1: number, x2: number, y2: number, x: number, y: number): this;
  public curve(...numbers: number[]): this {
    this.pathData.curve(...numbers as [number, number, number, number, number, number]);
    return this;
  }

  public arc(x: number, y: number): this {
    this.pathData.arc(x, y);
    return this;
  }

  public circle(rx: number, ry: number = rx): this {
    this.pathData.circle(rx, ry);
    return this;
  }

  public close(): this {
    this.pathData.close();
    return this;
  }

  public rect(x: number, y: number, width: number, height: number): this {
    this.pathData.rect(x, y, width, height);
    return this;
  }
  //#endregion

  //#region edit last command
  public absolute(): this {
    this.pathData.absolute();
    return this;
  }

  public name(name: string): this {
    this.pathData.name(name);
    return this;
  }

  public radius(x: number, y: number = x): this {
    this.pathData.radius(x, y);
    return this;
  }

  public rotation(rotation: number): this {
    this.pathData.rotation(rotation);
    return this;
  }

  public sweep(sweep: boolean = true): this {
    this.pathData.sweep(sweep);
    return this;
  }

  public large(large: boolean = true): this {
    this.pathData.large(large);
    return this;
  }

  public offset(x: number, y: number = 0): this {
    this.pathData.offset(x, y);
    return this;
  }
  //#endregion

  //#region public API
  public doStroke(): boolean {
    return this._stroke !== 'none';
  }

  public doFill(): boolean {
    return this._fill !== 'none';
  }

  public init(): this {
    this._stackFrame = getDrawingStackFrame();
    return this;
  }

  public getFileLocation(): string | undefined {
    if (!this._stackFrame) {
      return;
    }

    return `${this._stackFrame.fileName}:${this._stackFrame.lineNumber}:${this._stackFrame.columnNumber}`;
  }
  //#endregion

  //#region helpers
  protected addAnimationElement(animation: AnimationElement): this {
    this._animationElements.push(animation);
    return this;
  }
  //#endregion

  //#region parsing
  public buildNeutralName(): string {
    return super.buildName();
  }

  public buildName(): string {
    const actionTypes: string[] = [];

    if (!this.doStroke()) {
      actionTypes.push('stroke');
    }

    if (!this.doFill()) {
      actionTypes.push('fill');
    }

    return `${this.buildNeutralName()} (${actionTypes.join(', ')})`;
  }

  public toJSON(): PathJSON {
    const zIndex = this.doStroke() && !this.doFill()
      ? this._zIndex + 1
      : this._zIndex;

    return {
      type: DrawingElementType.path,
      name: this._name,
      fullName: this.buildName(),
      namespace: this._namespace,
      zIndex,
      stroke: this._stroke,
      fill: this._fill,
      strokeWidth: this._strokeWidth,
      transform: this.transform.toJSON(),
      pathData: this.pathData.toJSON(),
      stackFrame: this._stackFrame,
      animations: this._animationElements.map(a => a.toJSON()),
      isAnimated: this.isAnimated,
      animatedOnKeyframes: this._animatedOnKeyframes,
    };
  }
  //#endregion
}

export interface PathJSON extends DrawingElementJSON {
  type: DrawingElementType.path;
  stroke: string;
  fill: string;
  strokeWidth: number;
  pathData: CommandJSON[];
  stackFrame: IStackFrame | undefined;
  animations: AnimationElementJSON[];
}
