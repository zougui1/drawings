import { Point, PointJSON } from '../point';
import { last } from '../utils';
import { Command, CommandJSON } from './Command';
import { Move } from './Move';
import { Line } from './Line';
import { Arc } from './Arc';
import { Curve } from './Curve';
import { Close } from './Close';
import { Rect } from './Rect';
import { Circle } from './Circle';
import { CommandType } from './commandTypes';
import { exposedMethods, checkCommandMethod } from './commands';

export class PathData {
  public commands: Command[] = [];

  //#region commands
  public move(x: number, y: number): this {
    return this.addCommand(new Move(x, y));
  }

  public line(x?: number, y?: number): this {
    return this.addCommand(new Line(x, y));
  }

  public curve(x: number, y: number): this;
  public curve(x1: number, y1: number, x: number, y: number): this;
  public curve(x1: number, y1: number, x2: number, y2: number, x: number, y: number): this;
  public curve(...numbers: number[]): this {
    return this.addCommand(new Curve(...numbers));
  }

  public arc(x: number, y: number): this {
    return this.addCommand(new Arc(x, y));
  }

  public circle(rx: number, ry: number = rx): this {
    const { x, y } = this.getLastPoint();
    const circle = new Circle(x, y, rx, ry);
    return this.addCommand(circle);
  }

  public close(): this {
    return this.addCommand(new Close());
  }

  public rect(x: number, y: number, width: number, height: number): this {
    return this.addCommand(new Rect(x, y, width, height));
  }
  //#endregion

  //#region edit last command
  public absolute(): this {
    return this.executeMethod('absolute');
  }

  public name(name: string): this {
    return this.executeMethod('name', [name]);
  }

  public radius(x: number, y: number): this {
    return this.executeMethod('radius', [x, y]);
  }

  public rotation(rotation: number): this {
    return this.executeMethod('rotation', [rotation]);
  }

  public sweep(sweep: boolean = true): this {
    return this.executeMethod('sweep', [sweep]);
  }

  public large(large: boolean = true): this {
    return this.executeMethod('large', [large]);
  }

  public offset(x: number, y: number): this {
    return this.executeMethod('offset', [x, y]);
  }
  //#endregion

  //#region helpers
  protected executeMethod(methodName: keyof typeof exposedMethods, args: any[] = []): this {
    const command = this.lastCommand();

    if (checkCommandMethod(command, methodName, exposedMethods[methodName]) && command) {
      const method = command[methodName as keyof Command] as (...args: any[]) => any;

      if (typeof method !== 'function') {
        throw new Error(`The method '${methodName}' is not a function on '${command.constructor.name}'`);
      }

      method.call(command, ...args);
    }

    return this;
  }
  //#endregion

  //#region public API
  public addCommand(command: Command): this {
    if (!this.commands.length) {
      if (!(command instanceof Move)) {
        throw new Error(`The path must start with a move command. Started with "${command.commandType}".`);
      }

      command.absolute();
    }

    command.init();
    this.commands.push(command);
    return this;
  }

  public lastCommand(): Command | undefined {
    return last(this.commands);
  }

  public getLastPoint(): Point {
    const point: Partial<PointJSON> = {};
    const commands = this.commands
      .slice()
      .reverse()
      .filter(command => !(command instanceof Close));

    for (const command of commands) {
      point.x ??= command.x;
      point.y ??= command.y;

      if (point.x !== undefined && point.y !== undefined) {
        break;
      }
    }

    return new Point(point.x ?? 0, point.y ?? 0);
  }

  public isEmpty(): boolean {
    return this.commands.length === 0;
  }
  //#endregion

  //#region parsing
  public toJSON(): CommandJSON[] {
    return this.commands.map(command => command.toJSON());
  }

  public toString(): string {
    return this.commands.map(p => p.toString()).join('\n');
  }
  //#endregion
}
