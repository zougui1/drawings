import {
  Animate, AnimateJSON,
  AnimateMotion, AnimateMotionJSON,
  Animation, AnimationJSON,
} from './animation';
import { Transform, TransformObject } from '../Transform';
import { ObjectLiteral } from '../types';

export abstract class DrawingElement {

  abstract id: string;
  protected data: ObjectLiteral;
  protected _name: string = '';
  protected _namespace: string = '';
  public _zIndex: number = 0;
  _transform = new Transform();
  _animationElements: Animation[] = [];

  constructor(data: ObjectLiteral) {
    this.data = data;
  }

  //#region animation elements
  public animate(name: string, attributeName: string): Animate {
    const animate = new Animate(name, attributeName);
    this.addAnimationElement(animate);
    return animate;
  }

  public newAnimation(animation: (path: this) => Animation): this {
    this.addAnimationElement(animation(this));
    return this;
  }

  public animateMotion(name: string): AnimateMotion {
    const animateMotion = new AnimateMotion(name);
    this.addAnimationElement(animateMotion);
    return animateMotion;
  }

  protected addAnimationElement(element: any): void {
    this._animationElements.push(element);
  }
  //#endregion

  //#region transform
  getTransform(): string {
    return this._transform.toString();
  }

  scale(x: number, y: number): this {
    this._transform.scale(x, y);
    return this;
  }

  translate(x: number, y: number): this {
    this._transform.translate(x, y);
    return this;
  }

  matrix(...numbers: number[]): this {
    this._transform.matrix(...numbers);
    return this;
  }
  //#endregion

  //#region namespace
  namespace(namespace: string): this {
    this._namespace = namespace;
    return this;
  }

  getNamespace(): string {
    return this._namespace;
  }
  //#endregion

  //#region name
  name(name: string): this {
    return this.setName(name);
  }

  setName(name: string): this {
    this._name = name;
    return this;
  }

  getName(): string {
    return this._name;
  }
  //#endregion

  //#region zIndex
  setZIndex(zIndex: number): this {
    this._zIndex = zIndex;
    return this;
  }

  getZIndex(): number {
    return this._zIndex;
  }
  //#endregion

  //#region parsing
  abstract toObject(): DrawingElementObject;

  buildName(): string {
    if (!this._namespace) {
      return this._name;
    }

    return `${this._namespace} > ${this._name}`;
  }
  //#endregion
}

export interface DrawingElementObject {
  id: string;
  type: string;
  name: string;
  zIndex: number;
  transform: TransformObject;
}
