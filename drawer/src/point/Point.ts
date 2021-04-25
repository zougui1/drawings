export class Point {

  static type: 'Point' = 'Point';
  x: number = 0;
  y: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  set(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  //#region parsing
  toString(jointure: string = ','): string {
    return `${this.x}${jointure}${this.y}`;
  }

  toObject(): PointObject {
    return {
      type: Point.type,
      x: this.x,
      y: this.y,
    };
  }

  static fromObject(data: any): Point {
    const point = new Point(data.x, data.y);
    return point;
  }
  //#endregion
}

export interface PointObject {
  type: 'Point';
  x: number;
  y: number;
}
