import { Point, PointObject } from './Point';

export class PointArray {

  points: Point[];

  constructor(coords: (number | Point)[] = []) {
    this.points = this.unflattenPoints(coords);
  }

  //#region public API
  get length(): number {
    return this.points.length;
  }

  toCoords(): number[] {
    const coords: number[] = [];

    for (const point of this.points) {
      coords.push(point.x, point.y);
    }

    return coords;
  }

  last(): Point | undefined {
    return this.points[this.points.length - 1];
  }

  forEach(iteratee: (point: Point, index: number, source: this) => any): this {
    this.points.forEach((point, index) => iteratee(point, index, this));
    return this;
  }

  map<T>(iteratee: (point: Point, index: number, source: this) => T): T[] {
    return this.points.map((point, index) => iteratee(point, index, this));
  }

  filter(predicate: (point: Point, index: number, source: this) => any): PointArray {
    this.points = this.points.filter((point, index) => predicate(point, index, this));
    return this;
  }

  offsetAll(offsetX: number, offsetY: number): PointArray;
  offsetAll(offset: Point): PointArray;
  offsetAll(offsetX: Point | number, offsetY?: number): PointArray {
    const _offsetX = typeof offsetX === 'number' ? offsetX : offsetX.x;
    const _offsetY = typeof offsetX === 'number' ? offsetY as number : offsetX.y;

    const points = this.points.map(point => {
      return new Point(point.x + _offsetX, point.y + _offsetY);
    });

    return new PointArray(points);
  }

  get(index: number): Point | undefined {
    return this.points[index];
  }
  //#endregion

  //#region helpers
  private unflattenPoints(coords: (number | Point)[]): Point[] {
    const points: Point[] = [];

    for (let i = 0; i < coords.length; i++) {
      const coord = coords[i];
      const nextCoord = coords[i + 1];

      if (typeof coord === 'number') {
        if (typeof nextCoord !== 'number') {
          throw new Error(`Invalid coordinates. Expect either two numbers or a point. Got only a number.`);
        }

        points.push(new Point(coord, nextCoord));
        i++;
      } else {
        points.push(coord);
      }
    }

    return points;
  }
  //#endregion

  //#region parsing
  toString(): string {
    return this.points.map(p => p.toString()).join(' ');
  }

  toArray(): PointObject[] {
    return this.points.map(p => p.toObject());
  }

  static fromArray(points: any[]): PointArray {
    return new PointArray(points.map(p => Point.fromObject(p)));
  }
  //#endregion
}
