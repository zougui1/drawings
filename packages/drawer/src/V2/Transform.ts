import { Point, PointJSON } from './point';

export class Transform {
  private _scale = new Point(0, 0);
  private _translate = new Point(0, 0);
  private _matrix: number[] = [];

  //#region transform
  getScale(): PointJSON {
    return this._scale.toJSON();
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

  toJSON(): TransformJSON {
    return {
      scale: this._scale.toJSON(),
      translate: this._translate.toJSON(),
      matrix: this._matrix,
    };
  }

  static fromJSON(data: TransformJSON): Transform {
    const transform = new Transform();
    transform._scale.set(data.scale.x, data.scale.y);
    transform._translate.set(data.translate.x, data.translate.y);
    transform._matrix = data.matrix;

    return transform;
  }
  //#endregion
}

export interface TransformJSON {
  scale: PointJSON,
  translate: PointJSON,
  matrix: number[],
}
