import { Point, PointObject } from './point';

export class Transform {
  private _scale = new Point(0, 0);
  private _translate = new Point(0, 0);
  private _matrix: number[] = [];

  //#region transform
  getScale(): PointObject {
    return this._scale.toObject();
  }

  scale(x: number, y: number = x): this {
    this._scale.set(x, y);
    return this;
  }

  translate(x: number, y: number): this {
    this._translate.set(x, y);
    return this;
  }

  matrix(...numbers: number[]): this {
    this._matrix = numbers;
    return this;
  }
  //#endregion

  //#region parsing
  toString(): string {
    const transformations: string[] = [];

    if (this._scale.x || this._scale.y) {
      transformations.push(`scale(${this._scale.toString()})`);
    }

    if (this._translate.x || this._translate.y) {
      transformations.push(`translate(${this._translate.toString()})`);
    }

    if (this._matrix.length) {
      transformations.push(`matrix(${this._matrix.join(', ')})`);
    }

    return transformations.join(' ');
  }

  toObject(): TransformObject {
    return {
      scale: this._scale.toObject(),
      translate: this._translate.toObject(),
      matrix: this._matrix,
    };
  }

  static fromObject(data: TransformObject): Transform {
    const transform = new Transform();
    transform._scale.set(data.scale.x, data.scale.y);
    transform._translate.set(data.translate.x, data.translate.y);
    transform._matrix = data.matrix;

    return transform;
  }
  //#endregion
}

export interface TransformObject {
  scale: PointObject,
  translate: PointObject,
  matrix: number[],
}
