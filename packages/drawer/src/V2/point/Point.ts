export class Point {

  public x: number = 0;
  public y: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public set(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  //#region parsing
  public toString(jointure: string = ','): string {
    return `${this.x}${jointure}${this.y}`;
  }

  public toJSON(): PointJSON {
    return {
      x: this.x,
      y: this.y,
    };
  }

  public static fromJSON(data: PointJSON): Point {
    return new Point(data.x, data.y);
  }
  //#endregion
}

export interface PointJSON {
  x: number;
  y: number;
}
