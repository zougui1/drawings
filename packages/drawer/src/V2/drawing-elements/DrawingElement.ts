import { DrawingElementType } from './DrawingElementType';
import { Transform, TransformJSON } from '../Transform';

export abstract class DrawingElement {

  public abstract readonly elementType: DrawingElementType;
  protected _name: string = '';
  protected _namespace: string = '';
  protected _zIndex: number = 0;
  public transform: Transform = new Transform();
  public isAnimated: boolean = false;
  /**
   * indexes of the keyframes where it is animated
   */
  protected _animatedOnKeyframes: number[] = [];

  //#region accessors
  public getName(): string {
    return this._name;
  }

  public setName(name: string): this {
    this._name = name;
    return this;
  }

  public getNamespace(): string {
    return this._namespace;
  }

  public setNamespace(namespace: string): this {
    this._namespace = namespace;
    return this;
  }

  public getZIndex(): number {
    return this._zIndex;
  }

  public setZIndex(zIndex: number): this {
    this._zIndex = zIndex;
    return this;
  }
  //#endregion

  //#region public API
  buildName(): string {
    return this._namespace.trim()
      ? `${this._namespace} > ${this._name}`
      : this._name;
  }

  public animateOnKeyframe(keyframeIndex: number): this {
    this.isAnimated = true;
    this._animatedOnKeyframes.push(keyframeIndex);
    return this;
  }
  //#endregion

  //#region parsing
  abstract toJSON(): DrawingElementJSON;
  //#endregion
}

export interface DrawingElementJSON {
  type: DrawingElementType;
  name: string;
  namespace: string;
  fullName: string;
  zIndex: number;
  transform: TransformJSON;
  isAnimated: boolean;
  animatedOnKeyframes: number[];
}
