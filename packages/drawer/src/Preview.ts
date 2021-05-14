import { Transform, TransformObject } from './Transform';

export class Preview {

  private _transform = new Transform();
  private _width: number = 0;
  private _height: number = 0;

  //#region transform
  getTransforms(): string {
    return this._transform.toString();
  }

  scale(x: number, y: number = x): this {
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

  //#region size
  width(width: number): this {
    this._width = width;
    return this;
  }

  height(height: number): this {
    this._height = height;
    return this;
  }

  size(width: number, height: number): this {
    this._width = width;
    this._height = height;
    return this;
  }
  //#endregion

  //#region parsing
  toObject(): PreviewObject {
    return {
      transform: this._transform.toObject(),
      width: this._width,
      height: this._height,
    };
  }

  static fromObject(data: PreviewObject): Preview {
    const preview = new Preview();
    preview._transform = Transform.fromObject(data.transform);
    preview._width = data.width;
    preview._height = data.height;

    return preview;
  }
  //#endregion
}

export interface PreviewObject {
  transform: TransformObject;
  width: number;
  height: number;
}
