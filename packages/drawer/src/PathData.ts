import { Point, PointObject } from './point';
import { last } from './utils';
import {
  Command,
  Move,
  Line,
  Curve,
  Arc,
  Close,
  Rect,
  Circle,
  exposedMethods,
} from './commands';
import { TypedCommandObject, ObjectLiteral } from './types';

export class PathData {
  public static readonly id: number = 0;

  public readonly id: string = `path-data-${PathData.id}`;
  public commands: Command[] = [];

  //#region commands
  move(x: number, y: number): this {
    return this.addCommand(new Move(x, y));
  }

  line(x?: number, y?: number): this {
    return this.addCommand(new Line(x, y));
  }

  curve(...numbers: number[]): this {
    return this.addCommand(new Curve(...numbers));
  }

  arc(x: number, y: number): this {
    return this.addCommand(new Arc(x, y));
  }

  circle(rx: number, ry: number = rx): this {
    const { x, y } = this.getLastPoint();
    const circle = new Circle(x, y + 1, rx, ry);
    return this.addCommand(circle);
  }

  close(): this {
    return this.addCommand(new Close());
  }

  rect(x: number, y: number, width: number, height: number): this {
    return this.addCommand(new Rect(x, y, width, height));
  }
  //#endregion

  //#region edit last command
  absolute(): this {
    return this.executeMethod('absolute');
  }

  relative(): this {
    return this.executeMethod('relative');
  }

  name(name: string): this {
    return this.executeMethod('name', [name]);
  }

  x(x: number): this {
    return this.executeMethod('setX', [x]);
  }

  y(y: number): this {
    return this.executeMethod('setY', [y]);
  }

  radius(x: number, y: number): this {
    return this.executeMethod('radius', [x, y]);
  }

  rotation(rotation: number): this {
    return this.executeMethod('rotation', [rotation]);
  }

  sweep(sweep: boolean = true): this {
    return this.executeMethod('sweep', [sweep]);
  }

  large(large: boolean = true): this {
    return this.executeMethod('large', [large]);
  }

  offsetY(offsetY: number): this {
    return this.executeMethod('offsetY', [offsetY]);
  }

  offsetX(offsetX: number): this {
    return this.executeMethod('offsetX', [offsetX]);
  }

  offset(x: number, y: number): this {
    return this.executeMethod('offset', [x, y]);
  }

  catmullRom(): this {
    return this.executeMethod('catmullRom');
  }
  //#endregion

  //#region helpers
  protected executeMethod(methodName: keyof typeof exposedMethods, args: any[] = []): this {
    const command = this.lastCommand();

    if (this.checkCommand(command, methodName, exposedMethods[methodName]) && command) {
      const method = command[methodName as keyof Command] as (...args: any[]) => any;

      if (typeof method !== 'function') {
        throw new Error(`The method '${methodName}' is not a function on '${command.constructor.name}'`);
      }

      method.call(command, ...args);
    }

    return this;
  }

  protected checkCommand<T extends typeof Command>(command: any, methodName: string, commands: (T)[]): command is InstanceType<T> {
    if (!command) {
      throw new Error('The command is undefined');
    }

    if (commands.some(constraint => command instanceof constraint)) {
      return true;
    }

    let commandsName = commands.length === 1
      ? commands[0].name
      : commands.slice(0, -1).map(c => c.name).join(', ');

    if (commands.length > 1) {
      commandsName += ` and ${commands[commands.length - 1].name}`;
    }

    throw new Error(`The method '${methodName}' can only be used on ${commandsName} commands.`);
  }
  //#endregion

  //#region public API
  public addCommand(command: Command): this {
    if (!this.commands.length) {
      if (!Move.is(command)) {
        throw new Error(`The path must start with a move command. Started with "${command.getCommandName()}".`);
      }

      command.absolute();
    }

    this.commands.push(command);
    return this;
  }

  public lastCommand(): Command | undefined {
    return last(this.commands);
  }

  public getLastPoint(): Point {
    const commands = this.commands
      .slice()
      .reverse()
      .filter(command => !Close.is(command));
    const point: Partial<PointObject> = {};

    for (const command of commands) {
      // eslint-disable-next-line no-unused-expressions
      point.x ??= command.x;
      // eslint-disable-next-line no-unused-expressions
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
  public toArray(): PathDataArray {
    return this.commands.map(command => command.toObject());
  }

  public toString(): string {
    return this.commands.map(p => p.toString()).join('\n');
  }

  public fromString(segment: string): this {
    const commandName = segment[0];
    let command: Command;

    switch (commandName.toLowerCase()) {
      case 'm':
        command = Move.fromString(segment);
        break;
      case 'l':
      case 'h':
      case 'v':
        command = Line.fromString(segment);
        break;
      case 'q':
      case 'c':
        command = Curve.fromString(segment);
        break;
      case 'a':
        command = Arc.fromString(segment);
        break;
      case 'z':
        command = Close.fromString(segment);
        break;

      default:
        throw new Error(`No command of type "${commandName}"`);
    }

    this.addCommand(command);
    return this;
  }

  public static fromArray(commands: PathDataArray): PathData {
    const pathData = new PathData();

    pathData.commands = commands.map((command) => {
      switch (command.type) {
        case Move.type:
          return Move.fromObject(command);
        case Line.type:
          return Line.fromObject(command);
        case Curve.type:
          return Curve.fromObject(command);
        case Arc.type:
          return Arc.fromObject(command);
        case Close.type:
          return Close.fromObject(command);
        case Circle.type:
          return Circle.fromObject(command);
        case Rect.type:
          return Rect.fromObject(command);

        default:
          throw new Error(`No command of type "${(command as ObjectLiteral).type}"`);
      }
    });

    return pathData;
  }
  //#endregion
}


export type PathDataArray = TypedCommandObject[];
