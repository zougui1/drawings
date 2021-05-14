import { Point, PointJSON } from './Point';
import { normalizePoints } from './normalizePoints';

export class PointArray {

  public points: Point[] = [];

  public constructor(coords: (number | Point)[] = []) {
    this.points = normalizePoints(coords).map(({ x, y }) => new Point(x, y));
  }

  //#region public API
  public get length(): number {
    return this.points.length;
  }

  public toCoords(): number[] {
    const coords: number[] = [];

    for (const point of this.points) {
      coords.push(point.x, point.y);
    }

    return coords;
  }

  public last(): Point | undefined {
    return this.points[this.points.length - 1];
  }

  public forEach(iteratee: (point: Point, index: number, source: this) => any): this {
    this.points.forEach((point, index) => iteratee(point, index, this));
    return this;
  }

  public map<T>(iteratee: (point: Point, index: number, source: this) => T): T[] {
    return this.points.map((point, index) => iteratee(point, index, this));
  }

  public filter(predicate: (point: Point, index: number, source: this) => any): PointArray {
    this.points = this.points.filter((point, index) => predicate(point, index, this));
    return this;
  }

  public offsetAll(offsetX: number, offsetY: number): PointArray;
  public offsetAll(offset: Point): PointArray;
  public offsetAll(offsetX: Point | number, offsetY?: number): PointArray {
    const _offsetX = typeof offsetX === 'number' ? offsetX : offsetX.x;
    const _offsetY = typeof offsetX === 'number' ? offsetY as number : offsetX.y;

    const points = this.points.map(point => {
      return new Point(point.x + _offsetX, point.y + _offsetY);
    });

    return new PointArray(points);
  }

  public get(index: number): Point | undefined {
    return this.points[index];
  }
  //#endregion

  //#region parsing
  public toString(): string {
    return this.points.map(p => p.toString()).join(' ');
  }

  public toJSON(): PointJSON[] {
    return this.points.map(p => p.toJSON());
  }

  public static fromJSON(points: PointJSON[]): PointArray {
    return new PointArray(points.map(p => Point.fromJSON(p)));
  }
  //#endregion
}
